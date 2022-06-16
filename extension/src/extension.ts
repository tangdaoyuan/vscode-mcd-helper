import type { ExtensionContext } from 'vscode'
import registerCommands from './command'
import { initConfig } from './config'

export function activate(context: ExtensionContext) {
  initConfig()
  registerCommands(context)
}

export function deactivate() {}
