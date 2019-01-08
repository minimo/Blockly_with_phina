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
