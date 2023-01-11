import { DefinedError } from 'ajv'
import {
  types,
  validateBaseData,
  validateBaseOne,
  validateBaseMany
} from './base'

export async function validateTestimonialData (data: Object): Promise<[Boolean, DefinedError[] | undefined]> {
  return await validateBaseData(types.testimonial, data)
}

export async function validateTestimonialOne (path: string): Promise<[Boolean, DefinedError[] | undefined]> {
  return await validateBaseOne(types.testimonial, path)
}

export async function validateTestimonialMany (paths: string[]): Promise<{
  allValid: Boolean
  files: Array<{
    path: string
    valid: Boolean
    errors: DefinedError[] | undefined
  }>
}> {
  return await validateBaseMany(types.testimonial, paths)
}
