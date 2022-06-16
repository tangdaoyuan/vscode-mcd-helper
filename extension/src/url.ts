import { Uri } from 'vscode'
import { config } from './config'

const DOMAIN = 'mcd.mcd.megvii-inc.com'

export function getDeployUrl(projectName: string, environment: string, production = 'galaxy') {
  return Uri.parse(`https://${DOMAIN}/apps/${projectName}-${production}-${segmentFromEnv(environment)}/deploy`)
}

export function segmentFromEnv(env: string) {
  return config.mcd!.ENV_2_DEPLOY[env] || 'unknown'
}
