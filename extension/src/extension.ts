import type { ExtensionContext } from 'vscode'
import registerCommands from './command'
import { initConfig } from './config'
import { initOptions } from './option'
import registerView from './view'

export function activate(context: ExtensionContext) {
  const conf = initConfig()
  initOptions(conf)
  registerView(context, conf)
  registerCommands(context)
}

export function deactivate() {}
