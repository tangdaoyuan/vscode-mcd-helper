import type { ExtensionContext } from 'vscode'
import { commands, env, window } from 'vscode'
import { OPENER_COMMAND } from './constant'
import { getProjectName } from './loader'
import { getDeployUrl } from './url'

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
      const name = await getProjectName()
      if (!name)
        return
      env.openExternal(getDeployUrl(name, key))
    })
    context.subscriptions.push(dispose)
  }
}
