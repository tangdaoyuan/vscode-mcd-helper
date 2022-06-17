import { defu } from 'defu'
import type { Config } from './config'
import { config } from './config'
import { loadPackageJson, loadYamlConfig } from './loader'

export type MCDConfig = Record<string, {
  config: string
}>

export async function getOption(environment: string) {
  const packageJSON = await loadPackageJson()

  if (!packageJSON)
    return null

  return createOptions(packageJSON?.mcd)[environment]
}

export function createOptions(options: MCDConfig) {
  const defaultConfig = config.mcd!.ENV.reduce((acc, cur) => {
    const _config = `appci/app-${config.mcd!.ENV_2_YAML[cur] || cur}.yaml`
    acc[cur.toLowerCase()] = {
      config: _config,
    }

    return acc
  }, {} as MCDConfig)

  Object.values(defaultConfig).forEach(async(c) => {
    await loadYamlConfig(c.config)
  })

  return defu(options, defaultConfig)
}

export async function initOptions(config: Config) {
  const environments = config.ENV
  const promises = environments.map(async env => await getOption(env))
  return await Promise.all(promises)
}
