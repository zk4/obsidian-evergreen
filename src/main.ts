import {OpenViewState, Plugin, Workspace} from 'obsidian'
import {around} from 'monkey-around'


let uninstallPatchOpen: () => void

export default class EverGreenPlugin extends Plugin {
  async onload(): Promise<void> {
    uninstallPatchOpen = around(Workspace.prototype, {
      // Monkey-patch the OpenLinkText function
      openLinkText(oldOpenLinkText) {
        return function (
          linktext: string,
          sourcePath: string,
          newLeaf?: boolean,
          openViewState?: OpenViewState,
        ) {
          // Make sure that the path ends with '.md'
          const name = linktext + (linktext.endsWith('.md') ? '' : '.md')
          let result
          let dirtyIndex = 0
          const tabs = app.workspace.getLeavesOfType('markdown')
          let found = tabs.length == 0
          console.log("trigger",tabs.length)
          for (let i = 0; i < tabs.length; i++) {
            let leaf = tabs[i]
            const viewState = leaf.getViewState()
            // console.log(viewState.type)
            if (viewState.type === 'markdown') {
              // found a corresponding pane
              if (viewState.state?.file?.endsWith(name)) {
                found = true
                app.workspace.setActiveLeaf(leaf)
              }
              // found current dirt index
              if (viewState.state?.file?.endsWith(sourcePath)) {
                dirtyIndex = i
              }
            }
          }

          // close all remaining tabs from dirtyIndex if hierarchy line changes
          if (!found) {
            for (let i = dirtyIndex + 1; i < tabs.length; i++) {
              tabs[i].detach()
            }
          }

          // If no pane matches the path, call the original function
          let ifNewTab = !found
          result =
            oldOpenLinkText &&
            oldOpenLinkText.apply(this, [
              linktext,
              sourcePath,
              ifNewTab,
              openViewState,
            ])
          return result
        }
      },
    })
  }

  onunload(): void {
    uninstallPatchOpen()
  }
}
