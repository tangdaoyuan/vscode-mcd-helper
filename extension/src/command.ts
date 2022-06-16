import type { ExtensionContext } from 'vscode'
import { commands, env, extensions, window } from 'vscode'
import { BRANCH_2_ENV, OPENER_COMMAND } from './constant'
import { getProjectUri } from './loader'
import { getOption } from './option'

export default function registerCommands(context: ExtensionContext) {
  registerExAuthoreCommand(context)
  registerMcdCommand(context)
}

function registerExAuthoreCommand(context: ExtensionContext) {
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

  const disposable = commands.registerCommand('mcd', async() => {
    const gitExtension = extensions.getExtension('vscode.git')?.exports
    if (!gitExtension)
      return

    const api = gitExtension.getAPI(1)
    const branchName = api?.repositories[0]?.state.HEAD?.name
    if (!branchName)
      return
    if (!(branchName in BRANCH_2_ENV))
      return

    const env = BRANCH_2_ENV[branchName]
    if (env in OPENER_COMMAND)
      commands.executeCommand(OPENER_COMMAND[env])
  })
  context.subscriptions.push(disposable)
}
