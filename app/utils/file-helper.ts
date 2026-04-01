export const isFile = (value: File | string): value is File => {
  return value instanceof File
}
