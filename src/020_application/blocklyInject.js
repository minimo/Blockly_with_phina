const blocklyArea = document.getElementById('blocklyArea');
const blocklyDiv = document.getElementById('blocklyDiv');
const workspace = Blockly.inject(blocklyDiv ,{
  toolbox: document.getElementById('toolbox'),
  horizontalLayout: true,
  allowUndoRedo: true,
  scrollbar: true,
  trashcan: true,
});
const toolbox = workspace.toolbox_;

//生成コードをテキストエリアに表示
workspace.addChangeListener(e => {
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById("outputArea").value = code;
  // console.log(e);
});

//Undo/Redoを許可
Blockly.mainWorkspace.undo(true);
function undoAction() {
  //undo
  Blockly.mainWorkspace.undo(false);
}
function redoAction() {
  //redo
  Blockly.mainWorkspace.undo(true);
}
  
//localStorageにworkspaceのセーブデータが置いてあったらそれを用いる
if(localStorage.workspace != null) {
  Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(localStorage.workspace), workspace);
} else {
  //初めからstartblockがworkspaceに置いてあるようにする
  Blockly.Xml.domToWorkspace(document.getElementById('startBlock'), workspace);
}

//PLAYERに繋がってないブロックは透明にする
workspace.addChangeListener(e => {
  const all_blocks = workspace.getAllBlocks();
  all_blocks.forEach(b => b.setDisabled(true));

  const blk = workspace.getBlockById("PLAYER");

  //PLAYERに繋がっているブロックを走査するgenerator
  function* blkgen(block){
    while(block != null){
      yield block;
      let children = block.getChildren();
      for(let child of children) {
        let itr = blkgen(child);
        for(let son of itr) {
            yield son;
        }
      };
      block = block.getNextBlock();
    }
  };
  let gen = blkgen(blk);
  for (let v of gen) {
    v.setDisabled(false);
  }

});


//現在のworkspaceをlocalStorageに保存
const saveWorkspace = () => localStorage.workspace = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));

//Blocklyエリアをいい感じに配置
const onresize = e => {
  //blocklyAreaの位置を計算する
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);

  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

  const div_w = blocklyArea.offsetWidth;
 };

const initsvg = function(){
  onresize();
  Blockly.svgResize(workspace);
  let scrollbarDoms = [];
  scrollbarDoms.push.apply(scrollbarDoms, document.getElementsByClassName('blocklyScrollbarVertical'));
  scrollbarDoms.push.apply(scrollbarDoms, document.getElementsByClassName('blocklyScrollbarHorizontal'));
  scrollbarDoms.forEach(dom => dom.setAttribute('display', 'none'));
  scrollbarDoms.forEach(dom => dom.setAttribute('display', 'block'));
  Blockly.svgResize(workspace);
};

//resize時に呼ばれるように
// window.addEventListener('resize', onresize, false);
// setTimeout(initsvg, 300);

