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
