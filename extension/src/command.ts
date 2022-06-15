import type { ExtensionContext } from 'vscode'
import { commands, env, window } from 'vscode'
import { OPENER_COMMAND } from './constant'
import { getProjectUri } from './loader'
import { getOption } from './option'

export default function registerCommands(context: ExtensionContext) {
  registerNowTimeCommand(context)
  registerMcdCommand(context)
}

function registerNowTimeCommand(context: ExtensionContext) {
  const disposable = commands.registerCommand('mcd.author', () => {
    window.showInformationMessage('Current Maintainer: Tedy (tangdaoyuan)')
  })
  context.subscriptions.push(disposable)
}

function registerMcdCommand(context: ExtensionContext) {
  for (const key in OPENER_COMMAND) {
    const dispose = commands.registerCommand(OPENER_COMMAND[key], async() => {
      const option = await getOption(key)
      if (!option)
        return
      const uri = await getProjectUri(option, key)
      if (!uri)
        return
      env.openExternal(uri)
    })
    context.subscriptions.push(dispose)
  }
}
