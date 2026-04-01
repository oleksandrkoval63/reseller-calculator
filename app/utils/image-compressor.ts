import imageCompression from 'browser-image-compression'

const canEncodeType = async (type: string) => {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((result) => resolve(result), type, 0.9)
  })

  return !!blob && blob.type === type
}

export const compressImageSmart = async (file: File) => {
  const avifSupported = await canEncodeType('image/avif')
  const targetType = avifSupported ? 'image/avif' : 'image/webp'

  const compressed = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    initialQuality: 0.75,
    fileType: targetType,
  })

  return compressed
}
