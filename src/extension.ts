import * as vscode from "vscode";
import { onActiveEvent } from "./active";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "redos-checker-for-vscode" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "redos-checker-for-vscode.check",
    onActiveEvent
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
