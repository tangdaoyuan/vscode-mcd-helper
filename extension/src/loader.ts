import fs from 'fs/promises'
import { window, workspace } from 'vscode'

export async function getProjectName() {
  const results = await workspace.findFiles('**/package.json', '**/node_modules/**;**/.vscode/**', 1)
  if (!results?.length)
    return null

  try {
    const content = await fs.readFile(results[0].path, 'utf8')
    const packageJSON = JSON.parse(content)
    return packageJSON.name as string
  }
  catch (error: any) {
    window.showErrorMessage(`MCD Parser Error: ${error.message}`)
  }
  return null
}
