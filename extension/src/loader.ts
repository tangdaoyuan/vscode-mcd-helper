import { access, readFile } from 'fs/promises'
import path from 'path'
import { window, workspace } from 'vscode'
import type { MCDConfig } from './option'
import { getDeployUrl } from './url'

export async function getProjectName(configPath: string) {
  try {
    const configFile = path.resolve(configPath)
    access(configFile)
    const content = await readFile(configFile, 'utf8')
    return content.match(/^name\:\s+(?<name>.+)\s*$/m)?.groups?.name
  }
  catch (error: any) {
    window.showErrorMessage(`MCD Parser Error: ${error.message}`)
  }
  return null
}

export async function getProjectUri(option: MCDConfig[0], environment: string) {
  if (!option)
    return ''
  const name = await getProjectName(option.config)
  if (!name)
    return ''
  return getDeployUrl(name, environment)
}

let packageJSON: Record<string, any> | null = null

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
