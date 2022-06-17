import * as vscode from 'vscode'
import type { Config } from './config'

const $VIEW_NAME = 'mcdDeployHelper'

let tree: Record<string, any> = {}
const NODES: Record<string, any> = {}

export class McdDeployHelper {
  config: Config
  constructor(context: vscode.ExtensionContext, config: Config) {
    this.config = config
    tree = config.ENV.reduce((acc, cur) => {
      acc[cur] = {}
      return acc
    }, {} as Record<string, {}>)

    const view = vscode.window.createTreeView(
      $VIEW_NAME,
      {
        treeDataProvider: nodeWithIdTreeDataProvider(),
        showCollapseAll: true,
      },
    )
    context.subscriptions.push(view)
  }
}

interface Element { key: string }

function nodeWithIdTreeDataProvider(): vscode.TreeDataProvider<{ key: string }> {
  return {
    getChildren: (element: Element): { key: string }[] => {
      return getChildren(element ? element.key : '').map(key => getNode(key))
    },
    getTreeItem: (element: { key: string }): vscode.TreeItem => {
      const treeItem = getTreeItem(element.key)
      treeItem.id = element.key
      return treeItem
    },
    getParent: ({ key }: { key: string }): Element | undefined => {
      const parentKey = key.substring(0, key.length - 1)
      return parentKey ? new Key(parentKey) : undefined
    },
  }
}

function getChildren(key: string): string[] {
  if (!key)
    return Object.keys(tree)

  const treeElement = getTreeElement(key)
  if (treeElement)
    return Object.keys(treeElement)

  return []
}

function getTreeItem(key: string): vscode.TreeItem {
  const treeElement = getTreeElement(key)
  const tooltip = new vscode.MarkdownString(`$(tag) ${key.toUpperCase()} Deployment`, true)
  const hasChildren = treeElement && (Object.keys(treeElement).length > 0)
  return {
    label: {
      label: key.toUpperCase(),
    },
    tooltip,
    collapsibleState: hasChildren
      ? vscode.TreeItemCollapsibleState.Collapsed
      : vscode.TreeItemCollapsibleState.None,
  }
}

function getTreeElement(element: string): any {
  let parent = tree
  for (let i = 0; i < element.length; i++) {
    parent = parent[element.substring(0, i + 1)]
    if (!parent)
      return null
  }
  return parent
}

function getNode(key: string): { key: string } {
  if (!NODES[key])
    NODES[key] = new Key(key)

  return NODES[key]
}

class Key {
  constructor(readonly key: string) { }
}
