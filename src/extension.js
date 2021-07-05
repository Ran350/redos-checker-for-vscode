const vscode = require("vscode");
const { onActiveEvent } = require("./active");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "redos-checker-for-vscode" is now active!');

  let disposable = vscode.commands.registerCommand("redos-checker-for-vscode.check", () => {
    onActiveEvent();
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
