import type { ExtensionContext } from 'vscode'
import registerCommands from './command'
import { initConfig } from './config'
import { initOptions } from './option'
import registerView from './view'

export async function activate(context: ExtensionContext) {
  const conf = initConfig()
  await initOptions(conf)
  registerView(context, conf)
  registerCommands(context)
}

export function deactivate() {}
