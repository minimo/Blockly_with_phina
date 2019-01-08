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
