import type { ExtensionContext } from 'vscode'
import { commands, window } from 'vscode'
import { OPENER_COMMAND } from './constant'
import { getProjectName } from './loader'

export default function registerCommands(context: ExtensionContext) {
  registerNowTimeCommand(context)
  registerMcdCommand(context)
}

function registerNowTimeCommand(context: ExtensionContext) {
  const disposable = commands.registerCommand('mcd.now', () => {
    window.showWarningMessage(`Current Time: ${new Date().toLocaleString()}`)
  })
  context.subscriptions.push(disposable)
}

function registerMcdCommand(context: ExtensionContext) {
  for (const key in OPENER_COMMAND) {
    const dispose = commands.registerCommand(OPENER_COMMAND[key], async() => {
      const name = await getProjectName()
      if (!name)
        return
      window.showWarningMessage(`${key} ${name} command is executed`)
    })
    context.subscriptions.push(dispose)
  }
}
