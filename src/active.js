const vscode = require("vscode");
const { check } = require("@makenowjust-labo/recheck");

const onActiveEvent = () => {
  const editor = vscode.window.activeTextEditor;
  const document = editor.document;
  const selectedArea = editor.selection;

  const regex = document.getText(selectedArea);

  const result = check(regex, "");
  const output = JSON.stringify(result);

  if (result.status == "vulnerable") {
    const message = vscode.window.showWarningMessage("This regex has vulnerable.", "More");
    message.then(() => {
      console.log(output);
    });
  } else {
    const message = vscode.window.showInformationMessage("This regex is safe.", "More");
    message.then(() => {
      console.log(output);
    });
  }
};

module.exports = {
  onActiveEvent,
};
