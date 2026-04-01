import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getR2Client } from '~~/server/utils/r2'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ keys?: string[] }>(event)
  const keys = Array.isArray(body?.keys) ? body.keys : []

  if (!keys.length) {
    return { success: true }
  }

  const config = useRuntimeConfig()
  const r2 = getR2Client()

  await Promise.all(
    keys.map((key) =>
      r2.send(
        new DeleteObjectCommand({
          Bucket: config.r2BucketName,
          Key: key,
        }),
      ),
    ),
  )

  return { success: true }
})
