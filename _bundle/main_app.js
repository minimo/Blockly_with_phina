
riot.tag2('saveload', '<button onclick="{save}">保存</button> <button onclick="{load}">読み込み</button> <button onclick="{init}">初期化</button> <button onclick="{run}">実行</button>', 'saveload h1,[data-is="saveload"] h1{ color: blue; }', '', function(opts) {
    this.text = 'hoge';

    this.save = () => {
      saveWorkspace();
      alert('localstorageに保存しました');
    }
    this.load = () => {
      alert('読み込みしました');
    }
    this.init = () => {
    }
});

Blockly.Blocks['go'] = {
    init: function() {
        this.jsonInit({
            "message0": 'すすむ',
            "colour": 210,
            "type": "Action",
            "previousStatement": "Action",
            "nextStatement": "Action",
            "tooltip": "ユニットが前に進みます"
        });
    }
};

Blockly.JavaScript['go'] = function(block){
    //active jump flg
    var code = 'player.is_walk = true;\n';
    return code;
};

Blockly.Blocks['stop'] = {
    init: function() {
        this.jsonInit({
            "message0": 'とまる',
            "colour": 210,
            "type": "Action",
            "previousStatement": "Action",
            "nextStatement": "Action",
            "tooltip": "ユニットが止まります"
        });
    }
};

Blockly.JavaScript['stop'] = function(block){
    //active jump flg
    var code = 'player.is_walk = false;\n';
    return code;
};


Blockly.Blocks['go_or_stop'] = {
    init: function() {
        this.jsonInit({
            "type": "Action",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "FLAGS",
                    "options": [
                        [
                            "すすむ",
                            "GO"
                        ],
                        [
                            "とまる",
                            "STOP"
                        ]
                    ]
                }
            ],
            "previousStatement": "Action",
            "nextStatement": "Action",
            "colour": 210,
            "tooltip": "ユニットが進むか止まります",
            "helpUrl": ""
        });
    }
};

Blockly.JavaScript['go_or_stop'] = function(block){
    var flag = block.getFieldValue('FLAGS') == 'GO' ? true : false;
    var code = 'player.is_walk = ' + flag + ';\n';
    return code;
};

Blockly.Blocks['player_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Player");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['player_block'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code = 'function player_run() {\n' + statements_name + '};';
  return code;
};

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


riot.mount('*');
phina.globalize();

let SC_W, SC_H;

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var scenes =[{
    label: 'main',
    className: 'MainScene',
  }];

  const canvasDiv = document.getElementById('canvasDiv');
  const width = canvasDiv.getBoundingClientRect().width;
  const height = canvasDiv.getBoundingClientRect().height;

  SC_W = width;
  SC_H = height;

  let app = GameApp({
    startLabel: 'main',
    // assets: ASSETS,
    domElement: document.getElementById("phinaCanvas"),
    width: width,
    height: height,
    scenes: scenes,
    fit: false,
    lie: true //loadingが出るようになる
  });
  
  //appをinitした時点でwidthとheightが決まってしまうので書き換える
  let s = app.canvas.domElement.style;
  s.width = width;
  s.height = height;
  
  // アプリケーション実行
  app.run();
});

phina.define("MainScene", {
  superClass: "DisplayScene",
  init: function(options) {
    this.superInit();

    console.log("main scene")

    this.player = CircleShape()
      .addChildTo(this)
      .setPosition(SC_W * 0.5, SC_H * 0.5);
  },

  update: function(app) {
  },
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCIwMDBfdGFncy9zYXZlbG9hZC5qcyIsIjAxMF9ibG9ja2x5L2dvX3N0b3AuanMiLCIwMTBfYmxvY2tseS9wbGF5ZXJfYmxvY2suanMiLCIwMjBfYXBwbGljYXRpb24vYmxvY2tseUluamVjdC5qcyIsIjAyMF9hcHBsaWNhdGlvbi9yaW90TW91bnQuanMiLCIwMzBfcGhpbmEvMDIwX2FwcGxpY2F0aW9uL3BoaW5hX21haW4uanMiLCIwMzBfcGhpbmEvMDMwX3NjZW5lL01haW5TY2VuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekdBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW5fYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIiwicmlvdC50YWcyKCdzYXZlbG9hZCcsICc8YnV0dG9uIG9uY2xpY2s9XCJ7c2F2ZX1cIj7kv53lrZg8L2J1dHRvbj4gPGJ1dHRvbiBvbmNsaWNrPVwie2xvYWR9XCI+6Kqt44G/6L6844G/PC9idXR0b24+IDxidXR0b24gb25jbGljaz1cIntpbml0fVwiPuWIneacn+WMljwvYnV0dG9uPiA8YnV0dG9uIG9uY2xpY2s9XCJ7cnVufVwiPuWun+ihjDwvYnV0dG9uPicsICdzYXZlbG9hZCBoMSxbZGF0YS1pcz1cInNhdmVsb2FkXCJdIGgxeyBjb2xvcjogYmx1ZTsgfScsICcnLCBmdW5jdGlvbihvcHRzKSB7XG4gICAgdGhpcy50ZXh0ID0gJ2hvZ2UnO1xuXG4gICAgdGhpcy5zYXZlID0gKCkgPT4ge1xuICAgICAgc2F2ZVdvcmtzcGFjZSgpO1xuICAgICAgYWxlcnQoJ2xvY2Fsc3RvcmFnZeOBq+S/neWtmOOBl+OBvuOBl+OBnycpO1xuICAgIH1cbiAgICB0aGlzLmxvYWQgPSAoKSA9PiB7XG4gICAgICBhbGVydCgn6Kqt44G/6L6844G/44GX44G+44GX44GfJyk7XG4gICAgfVxuICAgIHRoaXMuaW5pdCA9ICgpID0+IHtcbiAgICB9XG59KTtcbiIsIkJsb2NrbHkuQmxvY2tzWydnbyddID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmpzb25Jbml0KHtcbiAgICAgICAgICAgIFwibWVzc2FnZTBcIjogJ+OBmeOBmeOCgCcsXG4gICAgICAgICAgICBcImNvbG91clwiOiAyMTAsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJBY3Rpb25cIixcbiAgICAgICAgICAgIFwicHJldmlvdXNTdGF0ZW1lbnRcIjogXCJBY3Rpb25cIixcbiAgICAgICAgICAgIFwibmV4dFN0YXRlbWVudFwiOiBcIkFjdGlvblwiLFxuICAgICAgICAgICAgXCJ0b29sdGlwXCI6IFwi44Om44OL44OD44OI44GM5YmN44Gr6YCy44G/44G+44GZXCJcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuQmxvY2tseS5KYXZhU2NyaXB0WydnbyddID0gZnVuY3Rpb24oYmxvY2spe1xuICAgIC8vYWN0aXZlIGp1bXAgZmxnXG4gICAgdmFyIGNvZGUgPSAncGxheWVyLmlzX3dhbGsgPSB0cnVlO1xcbic7XG4gICAgcmV0dXJuIGNvZGU7XG59O1xuXG5CbG9ja2x5LkJsb2Nrc1snc3RvcCddID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmpzb25Jbml0KHtcbiAgICAgICAgICAgIFwibWVzc2FnZTBcIjogJ+OBqOOBvuOCiycsXG4gICAgICAgICAgICBcImNvbG91clwiOiAyMTAsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJBY3Rpb25cIixcbiAgICAgICAgICAgIFwicHJldmlvdXNTdGF0ZW1lbnRcIjogXCJBY3Rpb25cIixcbiAgICAgICAgICAgIFwibmV4dFN0YXRlbWVudFwiOiBcIkFjdGlvblwiLFxuICAgICAgICAgICAgXCJ0b29sdGlwXCI6IFwi44Om44OL44OD44OI44GM5q2i44G+44KK44G+44GZXCJcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuQmxvY2tseS5KYXZhU2NyaXB0WydzdG9wJ10gPSBmdW5jdGlvbihibG9jayl7XG4gICAgLy9hY3RpdmUganVtcCBmbGdcbiAgICB2YXIgY29kZSA9ICdwbGF5ZXIuaXNfd2FsayA9IGZhbHNlO1xcbic7XG4gICAgcmV0dXJuIGNvZGU7XG59O1xuXG5cbkJsb2NrbHkuQmxvY2tzWydnb19vcl9zdG9wJ10gPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuanNvbkluaXQoe1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiQWN0aW9uXCIsXG4gICAgICAgICAgICBcIm1lc3NhZ2UwXCI6IFwiJTFcIixcbiAgICAgICAgICAgIFwiYXJnczBcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZmllbGRfZHJvcGRvd25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiRkxBR1NcIixcbiAgICAgICAgICAgICAgICAgICAgXCJvcHRpb25zXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIuOBmeOBmeOCgFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR09cIlxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIuOBqOOBvuOCi1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU1RPUFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJwcmV2aW91c1N0YXRlbWVudFwiOiBcIkFjdGlvblwiLFxuICAgICAgICAgICAgXCJuZXh0U3RhdGVtZW50XCI6IFwiQWN0aW9uXCIsXG4gICAgICAgICAgICBcImNvbG91clwiOiAyMTAsXG4gICAgICAgICAgICBcInRvb2x0aXBcIjogXCLjg6bjg4vjg4Pjg4jjgYzpgLLjgoDjgYvmraLjgb7jgorjgb7jgZlcIixcbiAgICAgICAgICAgIFwiaGVscFVybFwiOiBcIlwiXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbkJsb2NrbHkuSmF2YVNjcmlwdFsnZ29fb3Jfc3RvcCddID0gZnVuY3Rpb24oYmxvY2spe1xuICAgIHZhciBmbGFnID0gYmxvY2suZ2V0RmllbGRWYWx1ZSgnRkxBR1MnKSA9PSAnR08nID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHZhciBjb2RlID0gJ3BsYXllci5pc193YWxrID0gJyArIGZsYWcgKyAnO1xcbic7XG4gICAgcmV0dXJuIGNvZGU7XG59O1xuIiwiQmxvY2tseS5CbG9ja3NbJ3BsYXllcl9ibG9jayddID0ge1xuICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFwcGVuZER1bW15SW5wdXQoKVxuICAgICAgICAuYXBwZW5kRmllbGQoXCJQbGF5ZXJcIik7XG4gICAgdGhpcy5hcHBlbmRTdGF0ZW1lbnRJbnB1dChcIk5BTUVcIilcbiAgICAgICAgLnNldENoZWNrKG51bGwpO1xuICAgIHRoaXMuc2V0Q29sb3VyKDEyMCk7XG4gdGhpcy5zZXRUb29sdGlwKFwiXCIpO1xuIHRoaXMuc2V0SGVscFVybChcIlwiKTtcbiAgfVxufTtcblxuQmxvY2tseS5KYXZhU2NyaXB0WydwbGF5ZXJfYmxvY2snXSA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gIHZhciBzdGF0ZW1lbnRzX25hbWUgPSBCbG9ja2x5LkphdmFTY3JpcHQuc3RhdGVtZW50VG9Db2RlKGJsb2NrLCAnTkFNRScpO1xuICB2YXIgY29kZSA9ICdmdW5jdGlvbiBwbGF5ZXJfcnVuKCkge1xcbicgKyBzdGF0ZW1lbnRzX25hbWUgKyAnfTsnO1xuICByZXR1cm4gY29kZTtcbn07XG4iLCJjb25zdCBibG9ja2x5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdibG9ja2x5QXJlYScpO1xuY29uc3QgYmxvY2tseURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdibG9ja2x5RGl2Jyk7XG5jb25zdCB3b3Jrc3BhY2UgPSBCbG9ja2x5LmluamVjdChibG9ja2x5RGl2ICx7XG4gIHRvb2xib3g6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b29sYm94JyksXG4gIGhvcml6b250YWxMYXlvdXQ6IHRydWUsXG4gIGFsbG93VW5kb1JlZG86IHRydWUsXG4gIHNjcm9sbGJhcjogdHJ1ZSxcbiAgdHJhc2hjYW46IHRydWUsXG59KTtcbmNvbnN0IHRvb2xib3ggPSB3b3Jrc3BhY2UudG9vbGJveF87XG5cbi8v55Sf5oiQ44Kz44O844OJ44KS44OG44Kt44K544OI44Ko44Oq44Ki44Gr6KGo56S6XG53b3Jrc3BhY2UuYWRkQ2hhbmdlTGlzdGVuZXIoZSA9PiB7XG4gIGNvbnN0IGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKHdvcmtzcGFjZSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0QXJlYVwiKS52YWx1ZSA9IGNvZGU7XG4gIC8vIGNvbnNvbGUubG9nKGUpO1xufSk7XG5cbi8vVW5kby9SZWRv44KS6Kix5Y+vXG5CbG9ja2x5Lm1haW5Xb3Jrc3BhY2UudW5kbyh0cnVlKTtcbmZ1bmN0aW9uIHVuZG9BY3Rpb24oKSB7XG4gIC8vdW5kb1xuICBCbG9ja2x5Lm1haW5Xb3Jrc3BhY2UudW5kbyhmYWxzZSk7XG59XG5mdW5jdGlvbiByZWRvQWN0aW9uKCkge1xuICAvL3JlZG9cbiAgQmxvY2tseS5tYWluV29ya3NwYWNlLnVuZG8odHJ1ZSk7XG59XG4gIFxuLy9sb2NhbFN0b3JhZ2Xjgat3b3Jrc3BhY2Xjga7jgrvjg7zjg5bjg4fjg7zjgr/jgYznva7jgYTjgabjgYLjgaPjgZ/jgonjgZ3jgozjgpLnlKjjgYTjgotcbmlmKGxvY2FsU3RvcmFnZS53b3Jrc3BhY2UgIT0gbnVsbCkge1xuICBCbG9ja2x5LlhtbC5kb21Ub1dvcmtzcGFjZShCbG9ja2x5LlhtbC50ZXh0VG9Eb20obG9jYWxTdG9yYWdlLndvcmtzcGFjZSksIHdvcmtzcGFjZSk7XG59IGVsc2Uge1xuICAvL+WIneOCgeOBi+OCiXN0YXJ0YmxvY2vjgYx3b3Jrc3BhY2Xjgavnva7jgYTjgabjgYLjgovjgojjgYbjgavjgZnjgotcbiAgQmxvY2tseS5YbWwuZG9tVG9Xb3Jrc3BhY2UoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0QmxvY2snKSwgd29ya3NwYWNlKTtcbn1cblxuLy9QTEFZRVLjgavnuYvjgYzjgaPjgabjgarjgYTjg5bjg63jg4Pjgq/jga/pgI/mmI7jgavjgZnjgotcbndvcmtzcGFjZS5hZGRDaGFuZ2VMaXN0ZW5lcihlID0+IHtcbiAgY29uc3QgYWxsX2Jsb2NrcyA9IHdvcmtzcGFjZS5nZXRBbGxCbG9ja3MoKTtcbiAgYWxsX2Jsb2Nrcy5mb3JFYWNoKGIgPT4gYi5zZXREaXNhYmxlZCh0cnVlKSk7XG5cbiAgY29uc3QgYmxrID0gd29ya3NwYWNlLmdldEJsb2NrQnlJZChcIlBMQVlFUlwiKTtcblxuICAvL1BMQVlFUuOBq+e5i+OBjOOBo+OBpuOBhOOCi+ODluODreODg+OCr+OCkui1sOafu+OBmeOCi2dlbmVyYXRvclxuICBmdW5jdGlvbiogYmxrZ2VuKGJsb2NrKXtcbiAgICB3aGlsZShibG9jayAhPSBudWxsKXtcbiAgICAgIHlpZWxkIGJsb2NrO1xuICAgICAgbGV0IGNoaWxkcmVuID0gYmxvY2suZ2V0Q2hpbGRyZW4oKTtcbiAgICAgIGZvcihsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgbGV0IGl0ciA9IGJsa2dlbihjaGlsZCk7XG4gICAgICAgIGZvcihsZXQgc29uIG9mIGl0cikge1xuICAgICAgICAgICAgeWllbGQgc29uO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgYmxvY2sgPSBibG9jay5nZXROZXh0QmxvY2soKTtcbiAgICB9XG4gIH07XG4gIGxldCBnZW4gPSBibGtnZW4oYmxrKTtcbiAgZm9yIChsZXQgdiBvZiBnZW4pIHtcbiAgICB2LnNldERpc2FibGVkKGZhbHNlKTtcbiAgfVxuXG59KTtcblxuXG4vL+ePvuWcqOOBrndvcmtzcGFjZeOCkmxvY2FsU3RvcmFnZeOBq+S/neWtmFxuY29uc3Qgc2F2ZVdvcmtzcGFjZSA9ICgpID0+IGxvY2FsU3RvcmFnZS53b3Jrc3BhY2UgPSBCbG9ja2x5LlhtbC5kb21Ub1RleHQoQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20od29ya3NwYWNlKSk7XG5cbi8vQmxvY2tseeOCqOODquOCouOCkuOBhOOBhOaEn+OBmOOBq+mFjee9rlxuY29uc3Qgb25yZXNpemUgPSBlID0+IHtcbiAgLy9ibG9ja2x5QXJlYeOBruS9jee9ruOCkuioiOeul+OBmeOCi1xuICB2YXIgZWxlbWVudCA9IGJsb2NrbHlBcmVhO1xuICB2YXIgeCA9IDA7XG4gIHZhciB5ID0gMDtcbiAgZG8ge1xuICAgIHggKz0gZWxlbWVudC5vZmZzZXRMZWZ0O1xuICAgIHkgKz0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICB9IHdoaWxlIChlbGVtZW50KTtcblxuICAvLyBQb3NpdGlvbiBibG9ja2x5RGl2IG92ZXIgYmxvY2tseUFyZWEuXG4gIGJsb2NrbHlEaXYuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICBibG9ja2x5RGl2LnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICBibG9ja2x5RGl2LnN0eWxlLndpZHRoID0gYmxvY2tseUFyZWEub2Zmc2V0V2lkdGggKyAncHgnO1xuICBibG9ja2x5RGl2LnN0eWxlLmhlaWdodCA9IGJsb2NrbHlBcmVhLm9mZnNldEhlaWdodCArICdweCc7XG5cbiAgY29uc3QgZGl2X3cgPSBibG9ja2x5QXJlYS5vZmZzZXRXaWR0aDtcbiB9O1xuXG5jb25zdCBpbml0c3ZnID0gZnVuY3Rpb24oKXtcbiAgb25yZXNpemUoKTtcbiAgQmxvY2tseS5zdmdSZXNpemUod29ya3NwYWNlKTtcbiAgbGV0IHNjcm9sbGJhckRvbXMgPSBbXTtcbiAgc2Nyb2xsYmFyRG9tcy5wdXNoLmFwcGx5KHNjcm9sbGJhckRvbXMsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2NrbHlTY3JvbGxiYXJWZXJ0aWNhbCcpKTtcbiAgc2Nyb2xsYmFyRG9tcy5wdXNoLmFwcGx5KHNjcm9sbGJhckRvbXMsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2NrbHlTY3JvbGxiYXJIb3Jpem9udGFsJykpO1xuICBzY3JvbGxiYXJEb21zLmZvckVhY2goZG9tID0+IGRvbS5zZXRBdHRyaWJ1dGUoJ2Rpc3BsYXknLCAnbm9uZScpKTtcbiAgc2Nyb2xsYmFyRG9tcy5mb3JFYWNoKGRvbSA9PiBkb20uc2V0QXR0cmlidXRlKCdkaXNwbGF5JywgJ2Jsb2NrJykpO1xuICBCbG9ja2x5LnN2Z1Jlc2l6ZSh3b3Jrc3BhY2UpO1xufTtcblxuLy9yZXNpemXmmYLjgavlkbzjgbDjgozjgovjgojjgYbjgatcbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbnJlc2l6ZSwgZmFsc2UpO1xuLy8gc2V0VGltZW91dChpbml0c3ZnLCAzMDApO1xuXG4iLCJyaW90Lm1vdW50KCcqJyk7IiwicGhpbmEuZ2xvYmFsaXplKCk7XG5cbmxldCBTQ19XLCBTQ19IO1xuXG4vLyDjg6HjgqTjg7Plh6bnkIZcbnBoaW5hLm1haW4oZnVuY3Rpb24oKSB7XG4gIC8vIOOCouODl+ODquOCseODvOOCt+ODp+ODs+eUn+aIkFxuICB2YXIgc2NlbmVzID1be1xuICAgIGxhYmVsOiAnbWFpbicsXG4gICAgY2xhc3NOYW1lOiAnTWFpblNjZW5lJyxcbiAgfV07XG5cbiAgY29uc3QgY2FudmFzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhc0RpdicpO1xuICBjb25zdCB3aWR0aCA9IGNhbnZhc0Rpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgY29uc3QgaGVpZ2h0ID0gY2FudmFzRGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuICBTQ19XID0gd2lkdGg7XG4gIFNDX0ggPSBoZWlnaHQ7XG5cbiAgbGV0IGFwcCA9IEdhbWVBcHAoe1xuICAgIHN0YXJ0TGFiZWw6ICdtYWluJyxcbiAgICAvLyBhc3NldHM6IEFTU0VUUyxcbiAgICBkb21FbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBoaW5hQ2FudmFzXCIpLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICBzY2VuZXM6IHNjZW5lcyxcbiAgICBmaXQ6IGZhbHNlLFxuICAgIGxpZTogdHJ1ZSAvL2xvYWRpbmfjgYzlh7rjgovjgojjgYbjgavjgarjgotcbiAgfSk7XG4gIFxuICAvL2FwcOOCkmluaXTjgZfjgZ/mmYLngrnjgad3aWR0aOOBqGhlaWdodOOBjOaxuuOBvuOBo+OBpuOBl+OBvuOBhuOBruOBp+abuOOBjeaPm+OBiOOCi1xuICBsZXQgcyA9IGFwcC5jYW52YXMuZG9tRWxlbWVudC5zdHlsZTtcbiAgcy53aWR0aCA9IHdpZHRoO1xuICBzLmhlaWdodCA9IGhlaWdodDtcbiAgXG4gIC8vIOOCouODl+ODquOCseODvOOCt+ODp+ODs+Wun+ihjFxuICBhcHAucnVuKCk7XG59KTtcbiIsInBoaW5hLmRlZmluZShcIk1haW5TY2VuZVwiLCB7XG4gIHN1cGVyQ2xhc3M6IFwiRGlzcGxheVNjZW5lXCIsXG4gIGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLnN1cGVySW5pdCgpO1xuXG4gICAgY29uc29sZS5sb2coXCJtYWluIHNjZW5lXCIpXG5cbiAgICB0aGlzLnBsYXllciA9IENpcmNsZVNoYXBlKClcbiAgICAgIC5hZGRDaGlsZFRvKHRoaXMpXG4gICAgICAuc2V0UG9zaXRpb24oU0NfVyAqIDAuNSwgU0NfSCAqIDAuNSk7XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbihhcHApIHtcbiAgfSxcbn0pO1xuIl19
