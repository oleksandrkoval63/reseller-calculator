<script setup lang="ts">
import type { InputFileModel, PreviewItem } from '~~/shared/types'

const model = defineModel<InputFileModel>()

const props = withDefaults(
  defineProps<{
    multiple?: boolean
    accept?: string
    label?: string
    hint?: string
    maxFiles?: number
  }>(),
  {
    multiple: true,
    accept: 'image/*',
    label: 'Завантажте фото',
    hint: 'Перенесіть файли сюди або натисніть для вибіру',
    maxFiles: 10,
  },
)

const inputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const previewItems = ref<PreviewItem[]>([])

const filesCount = computed(() => previewItems.value.length)

function openFileDialog() {
  inputRef.value?.click()
}

function revokeAllUrls() {
  previewItems.value.forEach((item) => {
    URL.revokeObjectURL(item.url)
  })
}

function syncFromModel() {
  revokeAllUrls()

  if (!model.value) {
    previewItems.value = []
    return
  }

  const items = model.value || []
  previewItems.value = createPreviewItems(items)
}

watch(
  () => model.value,
  () => {
    syncFromModel()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  revokeAllUrls()
})

function normalizeFiles(fileList: FileList | null): File[] {
  if (!fileList) return []
  return Array.from(fileList).filter((file) => file.type.startsWith('image/'))
}

function updateModel(items: InputFileModel) {
  model.value = items?.length ? items : null
}

function mergeFiles(newFiles: File[]) {
  const currentItems = model.value ?? []

  const currentFiles = currentItems.filter((item): item is File => item instanceof File)
  const currentPaths = currentItems.filter((item): item is string => typeof item === 'string')

  const mergedFiles = [...currentFiles, ...newFiles].filter(
    (file, index, arr) =>
      index ===
      arr.findIndex(
        (f) => f.name === file.name && f.size === file.size && f.lastModified === file.lastModified,
      ),
  )

  const merged = [...currentPaths, ...mergedFiles].slice(0, props.maxFiles)
  updateModel(merged)
}

function replaceFiles(newFiles: File[]) {
  const limited = newFiles.slice(0, props.maxFiles)
  updateModel(limited)
}

function onInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = normalizeFiles(target.files)

  if (!files.length) return

  if (props.multiple) {
    mergeFiles(files)
  } else {
    replaceFiles(files)
  }

  target.value = ''
}

function onDragOver(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function onDragLeave(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false

  const files = normalizeFiles(event.dataTransfer?.files ?? null)
  if (!files.length) return

  if (props.multiple) {
    mergeFiles(files)
  } else {
    replaceFiles(files)
  }
}

function removeFile(id: string) {
  const nextItems = previewItems.value
    .filter((item) => item.id !== id)
    .map((item) => (item.kind === 'file' ? item.file! : item.url))

  model.value = nextItems
}
</script>

<template>
  <div class="file-upload">
    <input
      ref="inputRef"
      class="file-upload__native"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="onInputChange"
    />

    <ABadge
      class="file-upload__dropzone"
      :class="{ 'is-dragging': isDragging }"
      role="button"
      tabindex="0"
      @click="openFileDialog"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      @keydown.enter.prevent="openFileDialog"
      @keydown.space.prevent="openFileDialog"
    >
      <div class="file-upload__content">
        <div class="file-upload__icon">📷</div>
        <AText class="file-upload__label" size="18px">{{ label }}</AText>
        <AText class="file-upload__hint" size="14px">{{ hint }}</AText>
        <AText class="file-upload__meta">{{ filesCount }} / {{ maxFiles }}</AText>
      </div>
    </ABadge>

    <div v-if="previewItems.length" class="file-upload__grid">
      <div v-for="item in previewItems" :key="item.id" class="file-upload__card">
        <img class="file-upload__image" :src="item.url" :alt="item.name" />

        <AButton class="file-upload__remove" styled="danger" @click="removeFile(item.id)">
          ×
        </AButton>

        <div class="file-upload__footer">
          <AText class="file-upload__name" size="12px">
            {{ item.name }}
          </AText>

          <AText v-if="item.size" class="file-upload__size" size="12px">
            {{ (item.size / 1024 / 1024).toFixed(2) }} MB
          </AText>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-upload {
  display: grid;
  gap: 8px;
  margin-bottom: 4px;
}

.file-upload__native {
  display: none;
}

.a-badge {
  &.file-upload__dropzone {
    background: var(--color-button-background);
    border: 2px dashed #cbd5e1;
    border-radius: 20px;
    padding: 10px 10px;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
}

.file-upload__dropzone:hover {
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

.file-upload__dropzone.is-dragging {
  border-color: var(--color-primary);
  background: #eff6ff;
  transform: scale(1.01);

  .file-upload__label {
    color: var(--color-black);
  }
}

.file-upload__content {
  display: grid;
  gap: 4px;
  justify-items: center;
  text-align: center;
}

.file-upload__icon {
  font-size: 24px;
  line-height: 1;
}

.file-upload__label {
  font-weight: 600;
  color: var(--color-white);
}

.file-upload__hint {
  color: var(--color-text-muted);
}

.file-upload__meta {
  color: var(--color-text-muted);
}

.file-upload__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.file-upload__card {
  position: relative;
  overflow: hidden;
  border: 2px solid var(--color-primary);
  border-radius: 16px;
  background: var(--color-button-background);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}

.file-upload__image {
  display: block;
  width: 100%;
  height: 120px;
  object-fit: cover;
  background: var(--color-badge-background);
}

.file-upload__remove {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border: 0;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.file-upload__remove:hover {
  background: var(--color-primary-hover);
  transform: scale(1.05);
}

.file-upload__footer {
  display: grid;
  gap: 4px;
  padding: 8px 12px;
}

.file-upload__name {
  font-weight: 600;
  color: var(--color-white);
  word-break: break-word;
}

.file-upload__size {
  color: var(--color-text-muted);
}
</style>
