<saveload>
  <button onclick="{save}">保存</button>
  <button onclick="{load}">読み込み</button>
  <button onclick="{init}">初期化</button>
  <button onclick="{run}">実行</button>

  <style>
    h1 {
      color: blue;
    }
  </style>

  <script>
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
  </script>
</saveload>
