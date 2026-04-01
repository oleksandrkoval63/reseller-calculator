import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getR2Client } from '~~/server/utils/r2'

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key')

  if (!key) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Image key is required',
    })
  }

  const config = useRuntimeConfig()
  const r2 = getR2Client()

  try {
    const response = await r2.send(
      new GetObjectCommand({
        Bucket: config.r2BucketName,
        Key: key,
      }),
    )

    if (!response.Body) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Image not found',
      })
    }

    if (response.ContentType) {
      event.node.res.setHeader('Content-Type', response.ContentType)
    }

    if (typeof response.ContentLength === 'number') {
      event.node.res.setHeader('Content-Length', String(response.ContentLength))
    }

    event.node.res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')

    return response.Body
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Image not found',
    })
  }
})
