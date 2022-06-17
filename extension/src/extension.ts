import type { ExtensionContext } from 'vscode'
import registerCommands from './command'
import { initConfig } from './config'
import { McdDeployHelper } from './view'

export function activate(context: ExtensionContext) {
  const config = initConfig()
  registerCommands(context)
  // eslint-disable-next-line no-new
  new McdDeployHelper(context, config)
}

export function deactivate() {}
