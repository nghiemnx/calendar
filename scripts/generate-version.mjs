import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
const versionFile = resolve(root, 'public/version.json')

writeFileSync(versionFile, `${JSON.stringify({ version: packageJson.version }, null, 2)}\n`)
