import { checkSync } from "recheck";
import * as vscode from "vscode";

export const onActiveEvent = () => {
  const editor = vscode.window.activeTextEditor;
  const document = editor?.document;
  if (document === undefined || editor === undefined) {
    vscode.window.showErrorMessage("Please open file");
    return;
  }

  const selectedArea = editor.selection;
  const regex = document.getText(selectedArea);
  if (regex === "") {
    vscode.window.showErrorMessage("Please select regex pattern");
    return;
  }

  const result = checkSync(regex, "");

  if (result.status === "vulnerable") {
    const message = vscode.window.showWarningMessage(
      "This regex has VULNERABLE !!!",
      "More"
    );
    message.then(() => {
      const string = result.attack.string;
      vscode.window.showWarningMessage("Attack string: " + string);

      const complexity = result.complexity.type;
      vscode.window.showWarningMessage("Complexity: " + complexity);
    });
  }

  if (result.status === "safe") {
    vscode.window.showInformationMessage("This regex is safe");
  }

  if (result.status === "unknown") {
    vscode.window.showInformationMessage("Unknown regex pattern");
  }
};
