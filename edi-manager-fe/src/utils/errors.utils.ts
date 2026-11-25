import type { CustomError, Exception } from '@backend/shared/types'
import { AxiosError, isAxiosError } from 'axios'

export const isCustomError = (err: unknown, slug: Exception): err is AxiosError<CustomError> => {
  return isAxiosError<CustomError>(err) && err.response?.data.slug === slug
}

export const handleCustomError = ({
  err,
  slug,
  cb,
}: {
  err: unknown
  slug: Exception
  cb: (error: CustomError) => void
}) => {
  if (isCustomError(err, slug) && err.response?.data.slug === slug) {
    cb(err.response.data)
  }
}
