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
