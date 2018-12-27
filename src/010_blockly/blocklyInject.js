
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
  horizontalLayout: true,
  allowUndoRedo: true,
});
Blockly.mainWorkspace.undo(true);

function ShowCode(e) {
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById("outputArea").value = code;
  console.log(e);
}

//workspaceのリスナーへ登録
workspace.addChangeListener(ShowCode);

function undoAction() {
  Blockly.mainWorkspace.undo(false);
}
function redoAction() {
  Blockly.mainWorkspace.undo(true);
}
