export function errorMod (arg: unknown): string {
  const error =
    (typeof arg === 'string'
      ? arg
      : typeof arg === 'number' || typeof arg === 'object' || typeof arg === 'boolean' || typeof arg === 'bigint'
        ? arg?.toString()
        : Array.isArray(arg)
          ? arg?.join('\n')
          : 'Uncaught error') ?? 'Uncaught error'

  return error
}
