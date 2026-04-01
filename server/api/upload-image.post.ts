import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'
import { getR2Client } from '~~/server/utils/r2'
import { getTotalUsedBytes, getUserUsedBytes } from '~~/server/utils/storage-quota'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const parts = await readMultipartFormData(event)

  if (!parts?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file uploaded',
    })
  }

  const file = parts.find((part) => part.name === 'file')
  const userIdPart = parts.find((part) => part.name === 'userId')

  if (!userIdPart?.data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User id is required',
    })
  }

  const userId = Buffer.from(userIdPart.data).toString('utf-8')

  if (!file?.data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File is missing',
    })
  }

  if (!file.type?.startsWith('image/')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Only image files are allowed',
    })
  }

  const fileSize = file.data.byteLength

  if (fileSize > config.maxR2FileBytes) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File is too large',
    })
  }

  const userUsedBytes = await getUserUsedBytes(event, userId)
  const totalUsedBytes = await getTotalUsedBytes(event)

  if (userUsedBytes + fileSize > config.maxR2UserBytes) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User storage limit exceeded',
    })
  }

  if (totalUsedBytes + fileSize > config.maxR2TotalBytes) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Service storage limit exceeded',
    })
  }

  const ext = file.filename?.split('.').pop()?.toLowerCase() || 'bin'
  const key = `users/${userId}/items/temp/${randomUUID()}.${ext}`

  const r2 = getR2Client()

  await r2.send(
    new PutObjectCommand({
      Bucket: config.r2BucketName,
      Key: key,
      Body: file.data,
      ContentType: file.type,
    }),
  )

  return {
    key,
    size: fileSize,
    contentType: file.type,
  }
})
