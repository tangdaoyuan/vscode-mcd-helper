import { readFile } from 'fs/promises'
import { window, workspace } from 'vscode'
import { ENV } from './constant'

export type MCDConfig = Record<string, {
  config: string
}>

let packageJSON: Record<string, any> | null = null

export async function getOption(environment: string) {
  const packageJSON = await getPackageJson()

  if (!packageJSON)
    return null

  return createOptions(packageJSON?.mcd)[environment]
}

const _MAP = {
  debug: 'debug',
  test: 'test',
  release: 'staging',
  production: 'pro',
} as Record<string, string>

export function createOptions(options: MCDConfig) {
  const defaultConfig = ENV.reduce((acc, cur) => {
    acc[cur.toLowerCase()] = {
      config: `appci/app-${_MAP[cur] || cur}.yaml`,
    }
    return acc
  }, {} as MCDConfig)
  return Object.assign({}, defaultConfig, options)
}

export async function getPackageJson() {
  const results = await workspace.findFiles('**/package.json', '**/node_modules/**;**/.vscode/**', 1)
  if (!results?.length)
    return null

  try {
    const content = await readFile(results[0].path, 'utf8')
    packageJSON = JSON.parse(content)
    return packageJSON
  }
  catch (error: any) {
    window.showErrorMessage(`MCD Parser Error: ${error.message}`)
  }
  return null
}
