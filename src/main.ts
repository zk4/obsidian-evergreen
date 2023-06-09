import {OpenViewState, setActiveLeaf, Plugin, Workspace, WorkspaceLeaf} from 'obsidian'
import {around} from 'monkey-around'


let uninstallPatchOpen: () => void
// let uninstallPatchOpen2: () => void

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
					const args = [
							linktext,
							sourcePath,
							// jump in the file have no history, use new tab as a helper to keep history :(
							true,
							openViewState
						]
					return  oldOpenLinkText.apply(this, args)
				}
			},
		});
		//
		//     [
		//     {
		//         "title": "python 工程最佳实践",
		//         "icon": "lucide-file",
		//         "state": {
		//             "type": "markdown",
		//             "state": {
		//                 "file": "Fleeting Notes/10.it/0.计算机语言/python/python 工程最佳实践.md",
		//                 "mode": "source",
		//                 "backlinks": true,
		//                 "source": false
		//             }
		//         },
		//         "eState": {
		//             "cursor": {
		//                 "from": {
		//                     "line": 0,
		//                     "ch": 0
		//                 },
		//                 "to": {
		//                     "line": 0,
		//                     "ch": 0
		//                 }
		//             },
		//             "scroll": 294.7675070028011
		//         }
		//     }
		// ]
		// uninstallPatchOpen2 = around(Workspace.prototype, {
		//     // Monkey-patch the OpenLinkText function
		//     setActiveLeaf(oldSetActiveLeaf) {
		//         return function (
		//             leaf: WorkspaceLeaf, pushHistory: boolean, focus: boolean
		//         ) {
		//             console.log(leaf, pushHistory, focus)
		//             oldSetActiveLeaf.apply(this, [
		//                 leaf, pushHistory, focus
		//             ])
		//         }
		//     },
		// })
	}

	onunload(): void {
		uninstallPatchOpen()
		// uninstallPatchOpen2()
	}
}

