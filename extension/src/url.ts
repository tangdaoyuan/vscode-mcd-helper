import { Uri } from 'vscode'

const DOMAIN = 'mcd.mcd.megvii-inc.com'

export function getDeployUrl(projectName: string, environment: string, production = 'galaxy') {
  return Uri.parse(`https://${DOMAIN}/apps/${projectName}-${production}-${segmentFromEnv(environment)}/deploy`)
}

function segmentFromEnv(env: string) {
  const _env = env.toLowerCase()
  if (_env === 'production')
    return 'prod'
  if (_env === 'release')
    return 'staging'

  return _env
}
