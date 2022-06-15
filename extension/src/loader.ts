import { access, readFile } from 'fs/promises'
import path from 'path'
import { window, workspace } from 'vscode'
import { createOptions } from './option'

let packageJSON: Record<string, any> | null = null

export async function getDefaultProjectName() {
  if (!packageJSON)
    packageJSON = await getPackageJson()

  return packageJSON?.name
}

export async function getProjectName(env: string) {
  if (!packageJSON)
    packageJSON = await getPackageJson()

  if (!packageJSON)
    return null

  const options = createOptions(packageJSON?.mcd)
  let configFile = options[env].config
  try {
    configFile = path.resolve(configFile)
    access(configFile)
    const content = await readFile(configFile, 'utf8')
    return content.match(/^name\:\s+(?<name>.+)\s*$/m)?.groups?.name
  }
  catch (error: any) {
    window.showErrorMessage(`MCD Parser Error: ${error.message}`)
  }
  return getDefaultProjectName()
}

async function getPackageJson() {
  const results = await workspace.findFiles('**/package.json', '**/node_modules/**;**/.vscode/**', 1)
  if (!results?.length)
    return null

  try {
    const content = await readFile(results[0].path, 'utf8')
    const packageJSON = JSON.parse(content)
    return packageJSON
  }
  catch (error: any) {
    window.showErrorMessage(`MCD Parser Error: ${error.message}`)
  }
  return null
}
