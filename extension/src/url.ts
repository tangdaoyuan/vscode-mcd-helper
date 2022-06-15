import { Uri } from 'vscode'

const DOMAIN = 'mcd.mcd.megvii-inc.com'

export function getDeployUrl(projectName: string, environment: string, production = 'galaxy') {
  return Uri.parse(`https://${DOMAIN}/apps/${projectName}-${production}-${segmentFromEnv(environment)}/deploy`)
}

const _MAP = {
  debug: 'debug',
  dev: 'test',
  test: 'test',
  release: 'staging',
  staging: 'staging',
  prod: 'prod',
  pro: 'prod',
} as Record<string, string>

export function segmentFromEnv(env: string) {
  return _MAP[env] || 'unknown'
}
