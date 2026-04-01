import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getR2Client } from '~~/server/utils/r2'

export const deleteR2Object = async (key: string) => {
  const config = useRuntimeConfig()
  const r2 = getR2Client()

  await r2.send(
    new DeleteObjectCommand({
      Bucket: config.r2BucketName,
      Key: key,
    }),
  )
}

export const deleteR2Objects = async (keys: string[]) => {
  await Promise.all(keys.map(deleteR2Object))
}
