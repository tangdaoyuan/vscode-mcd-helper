export const $PREFIX = 'mcd'
export const ENV = ['debug', 'test', 'release', 'production']

export const OPENER_COMMAND = ENV.reduce((acc, cur) => {
  acc[cur] = `${$PREFIX}.${cur}`
  return acc
}, {} as Record<string, string>)

export const BRANCH_2_ENV = {
  debug: 'debug',
  dev: 'test',
  test: 'test',
  release: 'release',
  master: 'production',
  main: 'production',
} as Record<string, string>

export const ENV_2_YAML = {
  debug: 'debug',
  test: 'test',
  release: 'staging',
  production: 'pro',
} as Record<string, string>

export const ENV_2_DEPLOY = {
  debug: 'debug',
  dev: 'test',
  test: 'test',
  release: 'staging',
  staging: 'staging',
  prod: 'prod',
  pro: 'prod',
  production: 'prod',
} as Record<string, string>
