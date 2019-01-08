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
