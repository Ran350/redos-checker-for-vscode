<div align="center">

# redos-checker-for-vscode

[![Marketplace Version](https://vsmarketplacebadge.apphb.com/version/ran350.redos-checker-for-vscode.svg)](https://marketplace.visualstudio.com/items?itemName=ran350.redos-checker-for-vscode) 
[![Installs](https://vsmarketplacebadge.apphb.com/installs/ran350.redos-checker-for-vscode.svg)](https://marketplace.visualstudio.com/items?itemName=ran350.redos-checker-for-vscode) 

</div>

VSCode extension to detect vulnerable regular expressions

![image/demo.gif](https://github.com/Ran350/redos-checker-for-vscode/blob/main/image/demo.gif?raw=true)

## Usage
With the regular expression cursor selected, do one of the following.

- Run `redos-checker-for-vscode` from the Command Palette (Ctrl+Shift+p)
- Right-click to open the context menu and select `redos-checker-for-vscode`

## Issues
Submit the [issues](https://github.com/Ran350/redos-checker-for-vscode/issues) if you find any bug or have any suggestion.

## Contribution
Fork the [repo](https://github.com/Ran350/redos-checker-for-vscode) and submit pull requests.

## Develop
### Requirements
This extension depends on vulnerability detection engine, [recheck](https://github.com/MakeNowJust-Labo/recheck).



### Publish
If vsce is not installed, run the following.
```sh
npm install -g vsce
```

To make packaged extension in a VSIX file format, run the following command.
```sh
vsce package
```

Publish from [marketplace.visualstudio.com](https://marketplace.visualstudio.com/manage/publishers/ran350).


## Author 
[Ran350](https://github.com/Ran350)