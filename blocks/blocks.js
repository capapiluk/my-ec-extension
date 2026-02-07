Blockly.Blocks['ec_read_value'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("read EC value (mS/cm) pin");
    this.setOutput(true, "Number");
    this.setColour("#2C97DE");
    this.setTooltip("อ่านค่า EC จาก sensor (mS/cm)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ec_read_voltage'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("read EC voltage (V) pin");
    this.setOutput(true, "Number");
    this.setColour("#2C97DE");
    this.setTooltip("อ่านค่าแรงดัน (Voltage) จาก EC sensor");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ec_set_offset'] = {
  init: function() {
    this.appendValueInput("offset")
        .setCheck("Number")
        .appendField("set EC offset");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#2C97DE");
    this.setTooltip("ตั้งค่า offset สำหรับ calibrate EC sensor");
    this.setHelpUrl("");
  }
};