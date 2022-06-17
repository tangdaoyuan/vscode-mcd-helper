import type { ExtensionContext } from 'vscode'
import registerCommands from './command'
import { initConfig } from './config'
import { initOptions } from './option'
import { McdDeployHelper } from './view'

export function activate(context: ExtensionContext) {
  const conf = initConfig()
  initOptions(conf)
  registerCommands(context)
  // eslint-disable-next-line no-new
  new McdDeployHelper(context, conf)
}

export function deactivate() {}
