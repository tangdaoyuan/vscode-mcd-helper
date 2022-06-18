import type { ExtensionContext, TreeDataProvider, TreeItem } from 'vscode'
import { MarkdownString, TreeItemCollapsibleState, window } from 'vscode'
import type { Config } from './config'

const $VIEW_NAME = 'mcdDeployHelperView'

let tree: Record<string, any> = {}

export default function registerView(context: ExtensionContext, config: Config) {
  tree = config.ENV.reduce((acc, cur) => {
    acc[cur] = {}
    return acc
  }, {} as Record<string, {}>)

  const view = window.createTreeView(
    $VIEW_NAME,
    {
      treeDataProvider: new DeploymentDataProvider(),
      showCollapseAll: true,
    },
  )

  context.subscriptions.push(view)
}

class DeploymentDataProvider implements TreeDataProvider<Key> {
  NODES: Record<string, any> = {}

  getChildren(element: Key) {
    return getChildren(element ? element.key : '')
      .map((key) => {
        if (!this.NODES[key])
          this.NODES[key] = new Key(key)

        return this.NODES[key]
      })
  }

  getTreeItem(element: Key) {
    const treeItem = renderTreeItem(element.key)
    treeItem.id = element.key
    return treeItem
  }
}

class Key {
  constructor(readonly key: string) { }
}

function getChildren(key: string): string[] {
  if (!key)
    return Object.keys(tree)

  const treeElement = getTreeElement(key)
  if (treeElement)
    return Object.keys(treeElement)

  return []
}

function renderTreeItem(key: string): TreeItem {
  const treeElement = getTreeElement(key)
  const tooltip = new MarkdownString(`$(tag) ${key.toUpperCase()} Deployment`, true)
  const hasChildren = treeElement && (Object.keys(treeElement).length > 0)
  return {
    label: {
      label: key.toUpperCase(),
    },
    tooltip,
    command: {
      title: key,
      command: `mcd.${key}`,
    },
    collapsibleState: hasChildren
      ? TreeItemCollapsibleState.Collapsed
      : TreeItemCollapsibleState.None,
  }
}

function getTreeElement(key: string): any {
  let parent = tree
  for (let i = 0; i < key.length; i++) {
    parent = parent[key.substring(0, i + 1)]
    if (!parent)
      return null
  }
  return parent
}
