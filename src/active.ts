import { VulnerableDiagnostics, checkSync } from "recheck";
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
    vscode.window.showErrorMessage("Please select regular expression pattern");
    return;
  }

  const diagnostics = checkSync(regex, "");

  if (diagnostics.status === "vulnerable") {
    const panel = vscode.window.createWebviewPanel(
      "ReDoS Checker",
      "ReDoS Checker",
      vscode.ViewColumn.One,
      {}
    );
    panel.webview.html = panelHtml(diagnostics);
  }

  if (diagnostics.status === "safe") {
    const message = `The regular expression \`${regex}\` is safe`;
    vscode.window.showInformationMessage(message);
  }

  if (diagnostics.status === "unknown") {
    vscode.window.showErrorMessage("Unknown regular expression pattern");
  }
};

const panelHtml = (diagnostics: VulnerableDiagnostics) => {
  // 先頭か末尾に / がある場合は削除
  const source = diagnostics.source.replace(/^\//g, "").replace(/\/$/g, "");
  return `
    <html>
      <style>
        .main-grid-container {
          margin: 3rem 0;
          display: grid;
          grid-template-columns: 10rem 1fr;
          gap: 1rem 0px;
        }
        
        .main-grid-item {
          margin: 0;
          padding: 0;
          height: 2rem;
          border-bottom: solid 1px #777;
        }
      </style>      
      <body>
        <h4 style="text-align: center;">ReDoS Checker detect vulnerability</h4>

        <main class="main-grid-container">
          <h4 class="main-grid-item">Input</h4>
          <p class="main-grid-item">/${source}/</p>

          <h4 class="main-grid-item">Status</h4>
          <p class="main-grid-item">${diagnostics.status}</p>
        
          <h4 class="main-grid-item">Complexity</h4>
          <p class="main-grid-item">${diagnostics.complexity.summary}</p>

          <h4 class="main-grid-item">Attack string</h4>
          <p class="main-grid-item">${diagnostics.attack.pattern}</p>

          <h4 class="main-grid-item">JavaScript example</h4>
          <p class="main-grid-item">/${source}/.test(${diagnostics.attack.pattern});</p>
        </main>

        <p>more information: <a ref="_blank" href="https://makenowjust-labs.github.io/recheck/playground/">recheck playground</a></p>
      </body>
    </html>
  `;
};
