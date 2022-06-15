import { access, readFile } from 'fs/promises'
import path from 'path'
import { window } from 'vscode'
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
