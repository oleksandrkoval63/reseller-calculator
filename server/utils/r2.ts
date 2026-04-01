import { S3Client } from '@aws-sdk/client-s3'

export const getR2Client = () => {
  const config = useRuntimeConfig()

  return new S3Client({
    region: 'auto',
    endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.r2AccessKeyId,
      secretAccessKey: config.r2SecretAccessKey,
    },
  })
}
