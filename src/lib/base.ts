import Ajv, { DefinedError } from 'ajv'
import { errorMod } from '../util'
import Trevenant from 'trevenant'
import ProfileSchema from '../data/profile.json'
import EventSchema from '../data/event.json'
import TestimonialSchema from '../data/testimonial.json'
import { readFile } from 'fs/promises'
import { globby } from 'globby'

export enum types {
  profile = 'profile',
  event = 'event',
  testimonial = 'testimonial'
}

export const schemas = {
  [types.profile]: ProfileSchema,
  [types.event]: EventSchema,
  [types.testimonial]: TestimonialSchema
}

const trevenant = new Trevenant()

export async function validateBaseData (schema: types, data: Object): Promise<[Boolean, DefinedError[] | undefined]> {
  const ajv = new Ajv({
    allErrors: true,
    strict: true,
    logger: {
      error: (...args) => {
        args.forEach((arg) => {
          throw new Error(errorMod(arg))
        })
      },
      warn: trevenant.warn,
      log: trevenant.info
    },
    parseDate: true
  })

  const validate = ajv.compile(schemas[schema])

  const valid = validate(data)

  if (valid) {
    return [true, undefined]
  } else {
    return [false, validate.errors as DefinedError[]]
  }
}

export async function validateBaseOne (schema: types, path: string): Promise<[Boolean, DefinedError[] | undefined]> {
  const data = JSON.parse((await readFile(path)).toString())

  return await validateBaseData(data, schemas[schema])
}

export async function validateBaseMany (schema: types, paths: string[]): Promise<{
  allValid: Boolean
  files: Array<{
    path: string
    valid: Boolean
    errors: DefinedError[] | undefined
  }>
}> {
  const files = await globby(paths)

  const returns = await Promise.all(files.map(async (file) => {
    const [valid, errors] = await validateBaseOne(schema, file)

    return {
      path: file,
      valid,
      errors
    }
  }))

  const allValid = returns.every((item) => item.valid)

  return {
    allValid,
    files: returns
  }
}
