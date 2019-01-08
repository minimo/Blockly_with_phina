
riot.tag2('test', '<h1>{text}</h1> <button onclick="{showAlert}">Alert</button>', 'test h1,[data-is="test"] h1{ color: blue; }', '', function(opts) {
    this.text = 'hoge';

    this.showAlert = function(){
      alert('You can see this alert !!')
    }
});

Blockly.Blocks['player_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Player");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['player_block'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code = 'player.run = () => {\n' + statements_name + '};';
  return code;
};

phina.globalize();

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var scenes =[{
    className: 'TitleScene',
    label: 'title',
  　nextLabel: 'select'
  },
  {
    className: 'StageSelectScene',
    label: 'select',
    nextLabel: 'main'
  },
  {
    className: 'MainScene',
    label: 'main',
    nextLabel: 'select'
  }];

  const canvasDiv = document.getElementById('canvasDiv');
  const width = canvasDiv.getBoundingClientRect().width;
  const height = canvasDiv.getBoundingClientRect().height;

  let app = GameApp({
    startLabel: 'title',
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
    Blockly.mainWorkspace.undo(false);
}
function redoAction() {
    Blockly.mainWorkspace.undo(true);
}
  
//localStorageにworkspaceのセーブデータが置いてあったらそれを用いる
if(localStorage.workspace != null) {
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(localStorage.workspace), workspace);
} else {
    //初めからstartblockがworkspaceに置いてあるようにする
    Blockly.Xml.domToWorkspace(document.getElementById('startBlock'), workspace);
}

let onchange = function(e) {
    //STARTに繋がってないブロックは透明にしたい
    let all_blocks = workspace.getAllBlocks();
    all_blocks.forEach(b => b.setDisabled(true));

    let blk = workspace.getBlockById("PLAYER");

    //PLAYERに繋がっているブロックを走査するgenerator
    function* blkgen(b){
        while(b != null){
            yield b;
            let children = b.getChildren();
            for(let child of children) {
                let itr = blkgen(child);
                for(let son of itr) {
                    yield son;
                }
            };
            b = b.getNextBlock();
        }
    };
    let gen = blkgen(blk);
    for (let v of gen) {
        v.setDisabled(false);
    }

    //現在のworkspaceをlocalStorageに保存
    // localStorage.workspace = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
}
workspace.addChangeListener(onchange);

// let onresize = function(e) {
//     //blocklyAreaの位置を計算する
//     var element = blocklyArea;
//     var x = 0;
//     var y = 0;
//     do {
//         x += element.offsetLeft;
//         y += element.offsetTop;
//         element = element.offsetParent;
//     } while (element);

//     // Position blocklyDiv over blocklyArea.
//     blocklyDiv.style.left = x + 'px';
//     blocklyDiv.style.top = y + 'px';
//     blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
//     blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

//     const div_w = blocklyArea.offsetWidth;
//  };

// let initsvg = function(){
//     onresize();
//     Blockly.svgResize(workspace);
//     let scrollbarDoms = [];
//     scrollbarDoms.push.apply(scrollbarDoms, document.getElementsByClassName('blocklyScrollbarVertical'));
//     scrollbarDoms.push.apply(scrollbarDoms, document.getElementsByClassName('blocklyScrollbarHorizontal'));
//     scrollbarDoms.forEach(dom => dom.setAttribute('display', 'none'));
//     scrollbarDoms.forEach(dom => dom.setAttribute('display', 'block'));
//     Blockly.svgResize(workspace);
// };

// //resize時に呼ばれるように
// window.addEventListener('resize', onresize, false);
// setTimeout(initsvg, 300);


riot.mount('*');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCIwMDBfdGFncy90ZXN0LmpzIiwiMDEwX2Jsb2NrbHkvcGxheWVyX2Jsb2NrLmpzIiwiMDMwX3BoaW5hL3BoaW5hX21haW4uanMiLCIwMjBfYXBwbGljYXRpb24vYmxvY2tseUluamVjdC5qcyIsIjAyMF9hcHBsaWNhdGlvbi9yaW90TW91bnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RHQSIsImZpbGUiOiJtYWluX2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiIsInJpb3QudGFnMigndGVzdCcsICc8aDE+e3RleHR9PC9oMT4gPGJ1dHRvbiBvbmNsaWNrPVwie3Nob3dBbGVydH1cIj5BbGVydDwvYnV0dG9uPicsICd0ZXN0IGgxLFtkYXRhLWlzPVwidGVzdFwiXSBoMXsgY29sb3I6IGJsdWU7IH0nLCAnJywgZnVuY3Rpb24ob3B0cykge1xuICAgIHRoaXMudGV4dCA9ICdob2dlJztcblxuICAgIHRoaXMuc2hvd0FsZXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgIGFsZXJ0KCdZb3UgY2FuIHNlZSB0aGlzIGFsZXJ0ICEhJylcbiAgICB9XG59KTtcbiIsIkJsb2NrbHkuQmxvY2tzWydwbGF5ZXJfYmxvY2snXSA9IHtcbiAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hcHBlbmREdW1teUlucHV0KClcbiAgICAgICAgLmFwcGVuZEZpZWxkKFwiUGxheWVyXCIpO1xuICAgIHRoaXMuYXBwZW5kU3RhdGVtZW50SW5wdXQoXCJOQU1FXCIpXG4gICAgICAgIC5zZXRDaGVjayhudWxsKTtcbiAgICB0aGlzLnNldENvbG91cigyMzApO1xuIHRoaXMuc2V0VG9vbHRpcChcIlwiKTtcbiB0aGlzLnNldEhlbHBVcmwoXCJcIik7XG4gIH1cbn07XG5cbkJsb2NrbHkuSmF2YVNjcmlwdFsncGxheWVyX2Jsb2NrJ10gPSBmdW5jdGlvbihibG9jaykge1xuICB2YXIgc3RhdGVtZW50c19uYW1lID0gQmxvY2tseS5KYXZhU2NyaXB0LnN0YXRlbWVudFRvQ29kZShibG9jaywgJ05BTUUnKTtcbiAgdmFyIGNvZGUgPSAncGxheWVyLnJ1biA9ICgpID0+IHtcXG4nICsgc3RhdGVtZW50c19uYW1lICsgJ307JztcbiAgcmV0dXJuIGNvZGU7XG59O1xuIiwicGhpbmEuZ2xvYmFsaXplKCk7XG5cbi8vIOODoeOCpOODs+WHpueQhlxucGhpbmEubWFpbihmdW5jdGlvbigpIHtcbiAgLy8g44Ki44OX44Oq44Kx44O844K344On44Oz55Sf5oiQXG4gIHZhciBzY2VuZXMgPVt7XG4gICAgY2xhc3NOYW1lOiAnVGl0bGVTY2VuZScsXG4gICAgbGFiZWw6ICd0aXRsZScsXG4gIOOAgG5leHRMYWJlbDogJ3NlbGVjdCdcbiAgfSxcbiAge1xuICAgIGNsYXNzTmFtZTogJ1N0YWdlU2VsZWN0U2NlbmUnLFxuICAgIGxhYmVsOiAnc2VsZWN0JyxcbiAgICBuZXh0TGFiZWw6ICdtYWluJ1xuICB9LFxuICB7XG4gICAgY2xhc3NOYW1lOiAnTWFpblNjZW5lJyxcbiAgICBsYWJlbDogJ21haW4nLFxuICAgIG5leHRMYWJlbDogJ3NlbGVjdCdcbiAgfV07XG5cbiAgY29uc3QgY2FudmFzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhc0RpdicpO1xuICBjb25zdCB3aWR0aCA9IGNhbnZhc0Rpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgY29uc3QgaGVpZ2h0ID0gY2FudmFzRGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuICBsZXQgYXBwID0gR2FtZUFwcCh7XG4gICAgc3RhcnRMYWJlbDogJ3RpdGxlJyxcbiAgICAvLyBhc3NldHM6IEFTU0VUUyxcbiAgICBkb21FbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBoaW5hQ2FudmFzXCIpLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICBzY2VuZXM6IHNjZW5lcyxcbiAgICBmaXQ6IGZhbHNlLFxuICAgIGxpZTogdHJ1ZSAvL2xvYWRpbmfjgYzlh7rjgovjgojjgYbjgavjgarjgotcbiAgfSk7XG4gIFxuICAvL2FwcOOCkmluaXTjgZfjgZ/mmYLngrnjgad3aWR0aOOBqGhlaWdodOOBjOaxuuOBvuOBo+OBpuOBl+OBvuOBhuOBruOBp+abuOOBjeaPm+OBiOOCi1xuICBsZXQgcyA9IGFwcC5jYW52YXMuZG9tRWxlbWVudC5zdHlsZTtcbiAgcy53aWR0aCA9IHdpZHRoO1xuICBzLmhlaWdodCA9IGhlaWdodDtcbiAgXG4gIC8vIOOCouODl+ODquOCseODvOOCt+ODp+ODs+Wun+ihjFxuICBhcHAucnVuKCk7XG59KTtcbiIsImNvbnN0IGJsb2NrbHlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jsb2NrbHlBcmVhJyk7XG5jb25zdCBibG9ja2x5RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jsb2NrbHlEaXYnKTtcbmNvbnN0IHdvcmtzcGFjZSA9IEJsb2NrbHkuaW5qZWN0KGJsb2NrbHlEaXYgLHtcbiAgICB0b29sYm94OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9vbGJveCcpLFxuICAgIGhvcml6b250YWxMYXlvdXQ6IHRydWUsXG4gICAgYWxsb3dVbmRvUmVkbzogdHJ1ZSxcbiAgICBzY3JvbGxiYXI6IHRydWUsXG4gICAgdHJhc2hjYW46IHRydWUsXG59KTtcbmNvbnN0IHRvb2xib3ggPSB3b3Jrc3BhY2UudG9vbGJveF87XG5cbi8v55Sf5oiQ44Kz44O844OJ44KS44OG44Kt44K544OI44Ko44Oq44Ki44Gr6KGo56S6XG53b3Jrc3BhY2UuYWRkQ2hhbmdlTGlzdGVuZXIoZSA9PiB7XG4gICAgY29uc3QgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUod29ya3NwYWNlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dEFyZWFcIikudmFsdWUgPSBjb2RlO1xuICAgIC8vIGNvbnNvbGUubG9nKGUpO1xufSk7XG5cblxuLy9VbmRvL1JlZG/jgpLoqLHlj69cbkJsb2NrbHkubWFpbldvcmtzcGFjZS51bmRvKHRydWUpO1xuZnVuY3Rpb24gdW5kb0FjdGlvbigpIHtcbiAgICBCbG9ja2x5Lm1haW5Xb3Jrc3BhY2UudW5kbyhmYWxzZSk7XG59XG5mdW5jdGlvbiByZWRvQWN0aW9uKCkge1xuICAgIEJsb2NrbHkubWFpbldvcmtzcGFjZS51bmRvKHRydWUpO1xufVxuICBcbi8vbG9jYWxTdG9yYWdl44Grd29ya3NwYWNl44Gu44K744O844OW44OH44O844K/44GM572u44GE44Gm44GC44Gj44Gf44KJ44Gd44KM44KS55So44GE44KLXG5pZihsb2NhbFN0b3JhZ2Uud29ya3NwYWNlICE9IG51bGwpIHtcbiAgICBCbG9ja2x5LlhtbC5kb21Ub1dvcmtzcGFjZShCbG9ja2x5LlhtbC50ZXh0VG9Eb20obG9jYWxTdG9yYWdlLndvcmtzcGFjZSksIHdvcmtzcGFjZSk7XG59IGVsc2Uge1xuICAgIC8v5Yid44KB44GL44KJc3RhcnRibG9ja+OBjHdvcmtzcGFjZeOBq+e9ruOBhOOBpuOBguOCi+OCiOOBhuOBq+OBmeOCi1xuICAgIEJsb2NrbHkuWG1sLmRvbVRvV29ya3NwYWNlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydEJsb2NrJyksIHdvcmtzcGFjZSk7XG59XG5cbmxldCBvbmNoYW5nZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAvL1NUQVJU44Gr57mL44GM44Gj44Gm44Gq44GE44OW44Ot44OD44Kv44Gv6YCP5piO44Gr44GX44Gf44GEXG4gICAgbGV0IGFsbF9ibG9ja3MgPSB3b3Jrc3BhY2UuZ2V0QWxsQmxvY2tzKCk7XG4gICAgYWxsX2Jsb2Nrcy5mb3JFYWNoKGIgPT4gYi5zZXREaXNhYmxlZCh0cnVlKSk7XG5cbiAgICBsZXQgYmxrID0gd29ya3NwYWNlLmdldEJsb2NrQnlJZChcIlBMQVlFUlwiKTtcblxuICAgIC8vUExBWUVS44Gr57mL44GM44Gj44Gm44GE44KL44OW44Ot44OD44Kv44KS6LWw5p+744GZ44KLZ2VuZXJhdG9yXG4gICAgZnVuY3Rpb24qIGJsa2dlbihiKXtcbiAgICAgICAgd2hpbGUoYiAhPSBudWxsKXtcbiAgICAgICAgICAgIHlpZWxkIGI7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBiLmdldENoaWxkcmVuKCk7XG4gICAgICAgICAgICBmb3IobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ciA9IGJsa2dlbihjaGlsZCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBzb24gb2YgaXRyKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHNvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYiA9IGIuZ2V0TmV4dEJsb2NrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBnZW4gPSBibGtnZW4oYmxrKTtcbiAgICBmb3IgKGxldCB2IG9mIGdlbikge1xuICAgICAgICB2LnNldERpc2FibGVkKGZhbHNlKTtcbiAgICB9XG5cbiAgICAvL+ePvuWcqOOBrndvcmtzcGFjZeOCkmxvY2FsU3RvcmFnZeOBq+S/neWtmFxuICAgIC8vIGxvY2FsU3RvcmFnZS53b3Jrc3BhY2UgPSBCbG9ja2x5LlhtbC5kb21Ub1RleHQoQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20od29ya3NwYWNlKSk7XG59XG53b3Jrc3BhY2UuYWRkQ2hhbmdlTGlzdGVuZXIob25jaGFuZ2UpO1xuXG4vLyBsZXQgb25yZXNpemUgPSBmdW5jdGlvbihlKSB7XG4vLyAgICAgLy9ibG9ja2x5QXJlYeOBruS9jee9ruOCkuioiOeul+OBmeOCi1xuLy8gICAgIHZhciBlbGVtZW50ID0gYmxvY2tseUFyZWE7XG4vLyAgICAgdmFyIHggPSAwO1xuLy8gICAgIHZhciB5ID0gMDtcbi8vICAgICBkbyB7XG4vLyAgICAgICAgIHggKz0gZWxlbWVudC5vZmZzZXRMZWZ0O1xuLy8gICAgICAgICB5ICs9IGVsZW1lbnQub2Zmc2V0VG9wO1xuLy8gICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4vLyAgICAgfSB3aGlsZSAoZWxlbWVudCk7XG5cbi8vICAgICAvLyBQb3NpdGlvbiBibG9ja2x5RGl2IG92ZXIgYmxvY2tseUFyZWEuXG4vLyAgICAgYmxvY2tseURpdi5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4vLyAgICAgYmxvY2tseURpdi5zdHlsZS50b3AgPSB5ICsgJ3B4Jztcbi8vICAgICBibG9ja2x5RGl2LnN0eWxlLndpZHRoID0gYmxvY2tseUFyZWEub2Zmc2V0V2lkdGggKyAncHgnO1xuLy8gICAgIGJsb2NrbHlEaXYuc3R5bGUuaGVpZ2h0ID0gYmxvY2tseUFyZWEub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcblxuLy8gICAgIGNvbnN0IGRpdl93ID0gYmxvY2tseUFyZWEub2Zmc2V0V2lkdGg7XG4vLyAgfTtcblxuLy8gbGV0IGluaXRzdmcgPSBmdW5jdGlvbigpe1xuLy8gICAgIG9ucmVzaXplKCk7XG4vLyAgICAgQmxvY2tseS5zdmdSZXNpemUod29ya3NwYWNlKTtcbi8vICAgICBsZXQgc2Nyb2xsYmFyRG9tcyA9IFtdO1xuLy8gICAgIHNjcm9sbGJhckRvbXMucHVzaC5hcHBseShzY3JvbGxiYXJEb21zLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibG9ja2x5U2Nyb2xsYmFyVmVydGljYWwnKSk7XG4vLyAgICAgc2Nyb2xsYmFyRG9tcy5wdXNoLmFwcGx5KHNjcm9sbGJhckRvbXMsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2NrbHlTY3JvbGxiYXJIb3Jpem9udGFsJykpO1xuLy8gICAgIHNjcm9sbGJhckRvbXMuZm9yRWFjaChkb20gPT4gZG9tLnNldEF0dHJpYnV0ZSgnZGlzcGxheScsICdub25lJykpO1xuLy8gICAgIHNjcm9sbGJhckRvbXMuZm9yRWFjaChkb20gPT4gZG9tLnNldEF0dHJpYnV0ZSgnZGlzcGxheScsICdibG9jaycpKTtcbi8vICAgICBCbG9ja2x5LnN2Z1Jlc2l6ZSh3b3Jrc3BhY2UpO1xuLy8gfTtcblxuLy8gLy9yZXNpemXmmYLjgavlkbzjgbDjgozjgovjgojjgYbjgatcbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbnJlc2l6ZSwgZmFsc2UpO1xuLy8gc2V0VGltZW91dChpbml0c3ZnLCAzMDApO1xuXG4iLCJyaW90Lm1vdW50KCcqJyk7Il19
