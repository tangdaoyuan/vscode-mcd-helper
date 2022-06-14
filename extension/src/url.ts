import { Uri } from 'vscode'

const DOMAIN = 'mcd.mcd.megvii-inc.com'

export function getDeployUrl(projectName: string, environment: string, production = 'galaxy') {
  return Uri.parse(`https://${DOMAIN}/apps/${projectName}-${production}-${environment.toLowerCase()}/deploy`)
}
