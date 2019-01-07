<test>
  <h1>{text}</h1>
  <button onclick="{showAlert}">Alert</button>

  <style>
    h1 {
      color: blue;
    }
  </style>

  <script>
    this.text = 'hoge';

    this.showAlert = function(){
      alert('You can see this alert !!')
    }
  </script>
</test>
