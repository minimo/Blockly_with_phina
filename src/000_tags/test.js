riot.tag2('test', '<h1>{text}</h1> <button onclick="{showAlert}">Alert</button>', 'test h1,[data-is="test"] h1{ color: blue; }', '', function(opts) {
    this.text = 'hoge';

    this.showAlert = function(){
      alert('You can see this alert !!')
    }
});
