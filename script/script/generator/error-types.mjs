/* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'fs'
import { parse } from 'yaml'
import path from 'path'

const [from, to] = process.argv.slice(2)

const source = path.join(from, 'config', 'errors.yml')
const target = path.join(to, 'utils', 'api', 'error_codes.ts')

const { errors } = parse(readFileSync(source).toString())

const allKeys = (node, parents = []) => {
  let keys = []
  for (const k of Reflect.ownKeys(node)) {
    const current = node[k]
    if (current.status && current.message) {
      keys.push(parents.concat(k).join('.'))
    } else {
      keys = keys.concat(allKeys(current, parents.concat(k)))
    }
  }

  return keys
}

const document = [
  '// Code generated by script/gen-error-types. DO NOT EDIT',
  '// Changes WILL BE OVERWRITTEN when the script is run again.',
  '',
  'enum ErrorCode {',
  `  UnknownError = 'UNKNOWN_ERROR',`
]

for (const k of  allKeys(errors)) {
  const name = `${k.substring(0, 1).toUpperCase()}${k.slice(1).replace(/[_.](.)/g, (m) => m.slice(1).toUpperCase())}`
  document.push(`  ${name} = '${k}',`)
}

document.push('}',
  '',
  'const errorFromString = (path: string): ErrorCode => {',
  '  return (Object.values(ErrorCode) as string[]).includes(path)',
  '    ? (path as ErrorCode)',
  '    : ErrorCode.UnknownError',
  '}',
  '',
  'export default ErrorCode',
  'export { errorFromString }',
  '')
writeFileSync(target, document.join('\n'))