import { DefinedError } from 'ajv'
import {
  types,
  validateBaseData,
  validateBaseOne,
  validateBaseMany
} from './base'

export async function validateEventData (data: Object): Promise<[Boolean, DefinedError[] | undefined]> {
  return await validateBaseData(types.event, data)
}

export async function validateEventOne (path: string): Promise<[Boolean, DefinedError[] | undefined]> {
  return await validateBaseOne(types.event, path)
}

export async function validateEventMany (paths: string[]): Promise<{
  allValid: Boolean
  files: Array<{
    path: string
    valid: Boolean
    errors: DefinedError[] | undefined
  }>
}> {
  return await validateBaseMany(types.event, paths)
}
