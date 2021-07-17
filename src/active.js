const vscode = require("vscode");
const { check } = require("@makenowjust-labo/recheck");

const onActiveEvent = () => {
  const editor = vscode.window.activeTextEditor;
  const document = editor.document;
  const selectedArea = editor.selection;

  const regex = document.getText(selectedArea);

  const result = check(regex, "");

  if (result.status == "vulnerable") {
    const message = vscode.window.showWarningMessage("This regex has VULNERABLE !!!", "More");
    message.then(() => {
      const string = result.attack.string;
      vscode.window.showWarningMessage("Attack string: " + string);

      const complexity = result.complexity.type;
      vscode.window.showWarningMessage("Complexity: " + complexity);
    });
  }

  if (result.status == "safe") {
    vscode.window.showInformationMessage("This regex is safe");
  }

  if (result.status == "unknown") {
    vscode.window.showInformationMessage("Unknown regex pattern");
  }
};

module.exports = {
  onActiveEvent,
};
