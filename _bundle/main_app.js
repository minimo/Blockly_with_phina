
riot.tag2('test', '<h1>{text}</h1> <button onclick="{showAlert}">Alert</button>', 'test h1,[data-is="test"] h1{ color: blue; }', '', function(opts) {
    this.text = 'hoge';

    this.showAlert = function(){
      alert('You can see this alert !!')
    }
});

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

riot.mount('*');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCIwMDBfdGFncy90ZXN0LmpzIiwiMDEwX21haW4vYmxvY2tseUluamVjdC5qcyIsIjAxMF9tYWluL3Jpb3RNb3VudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBIiwiZmlsZSI6Im1haW5fYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIiwicmlvdC50YWcyKCd0ZXN0JywgJzxoMT57dGV4dH08L2gxPiA8YnV0dG9uIG9uY2xpY2s9XCJ7c2hvd0FsZXJ0fVwiPkFsZXJ0PC9idXR0b24+JywgJ3Rlc3QgaDEsW2RhdGEtaXM9XCJ0ZXN0XCJdIGgxeyBjb2xvcjogYmx1ZTsgfScsICcnLCBmdW5jdGlvbihvcHRzKSB7XG4gICAgdGhpcy50ZXh0ID0gJ2hvZ2UnO1xuXG4gICAgdGhpcy5zaG93QWxlcnQgPSBmdW5jdGlvbigpe1xuICAgICAgYWxlcnQoJ1lvdSBjYW4gc2VlIHRoaXMgYWxlcnQgISEnKVxuICAgIH1cbn0pO1xuIiwiY29uc3Qgd29ya3NwYWNlID0gQmxvY2tseS5pbmplY3QoJ2Jsb2NrbHlEaXYnLCB7XG4gIHRvb2xib3g6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b29sYm94JyksXG4gIGhvcml6b250YWxMYXlvdXQ6IHRydWUsXG4gIGFsbG93VW5kb1JlZG86IHRydWUsXG59KTtcbkJsb2NrbHkubWFpbldvcmtzcGFjZS51bmRvKHRydWUpO1xuXG5mdW5jdGlvbiBTaG93Q29kZShlKSB7XG4gIGNvbnN0IGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKHdvcmtzcGFjZSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0QXJlYVwiKS52YWx1ZSA9IGNvZGU7XG4gIGNvbnNvbGUubG9nKGUpO1xufVxuXG4vL3dvcmtzcGFjZeOBruODquOCueODiuODvOOBuOeZu+mMslxud29ya3NwYWNlLmFkZENoYW5nZUxpc3RlbmVyKFNob3dDb2RlKTtcblxuZnVuY3Rpb24gdW5kb0FjdGlvbigpIHtcbiAgQmxvY2tseS5tYWluV29ya3NwYWNlLnVuZG8oZmFsc2UpO1xufVxuZnVuY3Rpb24gcmVkb0FjdGlvbigpIHtcbiAgQmxvY2tseS5tYWluV29ya3NwYWNlLnVuZG8odHJ1ZSk7XG59XG4iLCJyaW90Lm1vdW50KCcqJyk7Il19
