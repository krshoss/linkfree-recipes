import { DefinedError } from 'ajv'
import {
  types,
  validateBaseData,
  validateBaseOne,
  validateBaseMany
} from './base'

export async function validateProfileData (data: Object): Promise<[Boolean, DefinedError[] | undefined]> {
  return await validateBaseData(types.profile, data)
}

export async function validateProfileOne (path: string): Promise<[Boolean, DefinedError[] | undefined]> {
  return await validateBaseOne(types.profile, path)
}

export async function validateProfileMany (paths: string[]): Promise<{
  allValid: Boolean
  files: Array<{
    path: string
    valid: Boolean
    errors: DefinedError[] | undefined
  }>
}> {
  return await validateBaseMany(types.profile, paths)
}
