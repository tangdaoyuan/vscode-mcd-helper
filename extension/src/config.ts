import { workspace } from 'vscode'
import { $PREFIX, ENV as _ENV } from './constant'

export const config: Record<'mcd', ReturnType<typeof initConfig> | null> = {
  mcd: null,
}

export function initConfig() {
  const configuration = workspace.getConfiguration()
  const ENV = configuration.get('mcd.env', _ENV)

  const OPENER_COMMAND = ENV.reduce((acc, cur) => {
    acc[cur] = `${$PREFIX}.${cur}`
    return acc
  }, {} as Record<string, string>)

  const BRANCH_2_ENV = {
    debug: ENV[0],
    dev: ENV[1],
    test: ENV[1],
    release: ENV[2],
    master: ENV[3],
    main: ENV[3],
  } as Record<string, string>

  const ENV_2_YAML = {
    [ENV[0]]: 'debug',
    [ENV[1]]: 'test',
    [ENV[2]]: 'staging',
    [ENV[3]]: 'pro',
  } as Record<string, string>

  const ENV_2_DEPLOY = {
    [ENV[0]]: 'debug',
    [ENV[1]]: 'test',
    [ENV[1]]: 'test',
    [ENV[2]]: 'staging',
    [ENV[3]]: 'prod',
  } as Record<string, string>

  const mcd = {
    ENV,
    OPENER_COMMAND,
    BRANCH_2_ENV,
    ENV_2_YAML,
    ENV_2_DEPLOY,
  }

  config.mcd = mcd

  return mcd
}
