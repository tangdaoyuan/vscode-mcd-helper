import path from 'path/posix'
import { defu } from 'defu'
import { workspace } from 'vscode'
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

  return createOptions(packageJSON?.mcd, environment)[environment]
}

export function createOptions(options: MCDConfig, environment?: string) {
  const defaultConfig = config.mcd!.ENV.reduce((acc, cur) => {
    const _config = `appci/app-${config.mcd!.ENV_2_YAML[cur] || cur}.yaml`
    acc[cur.toLowerCase()] = {
      config: _config,
    }

    return acc
  }, {} as MCDConfig)

  const configs = defu(options, defaultConfig)

  const root = workspace.workspaceFolders?.[0].uri.path
  if (root) {
    const keys = Object
      .keys(configs)
      .filter(c => !environment || environment === c)
    keys.forEach(async(key) => {
      const c = configs[key]
      if (!path.isAbsolute(c.config))
        c.config = path.resolve(root, c.config)

      await loadYamlConfig(c.config)
    })
  }

  return configs
}

export async function initOptions(config: Config) {
  const environments = config.ENV
  const promises = environments.map(async env => await getOption(env))
  return await Promise.all(promises)
}
