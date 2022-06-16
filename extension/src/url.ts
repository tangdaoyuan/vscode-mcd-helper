import { Uri } from 'vscode'
import { ENV_2_DEPLOY } from './constant'

const DOMAIN = 'mcd.mcd.megvii-inc.com'

export function getDeployUrl(projectName: string, environment: string, production = 'galaxy') {
  return Uri.parse(`https://${DOMAIN}/apps/${projectName}-${production}-${segmentFromEnv(environment)}/deploy`)
}

export function segmentFromEnv(env: string) {
  return ENV_2_DEPLOY[env] || 'unknown'
}
