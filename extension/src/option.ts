import { defu } from 'defu'
import { config } from './config'
import { getPackageJson } from './loader'

export type MCDConfig = Record<string, {
  config: string
}>

export async function getOption(environment: string) {
  const packageJSON = await getPackageJson()

  if (!packageJSON)
    return null

  return createOptions(packageJSON?.mcd)[environment]
}

export function createOptions(options: MCDConfig) {
  const defaultConfig = config.mcd!.ENV.reduce((acc, cur) => {
    acc[cur.toLowerCase()] = {
      config: `appci/app-${config.mcd!.ENV_2_YAML[cur] || cur}.yaml`,
    }
    return acc
  }, {} as MCDConfig)

  return defu(options, defaultConfig)
}
