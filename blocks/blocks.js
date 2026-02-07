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
// ... blocks เดิม ...

Blockly.Blocks['ec_set_kvalue'] = {
  init: function() {
    this.appendValueInput("kvalue")
        .setCheck("Number")
        .appendField("set TDS K value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#2C97DE");
    this.setTooltip("ตั้งค่า K value สำหรับ TDS sensor (0.5-1.5, default: 1.0)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ec_calibrate_kvalue'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("calibrate K value pin");
    this.appendValueInput("known_value")
        .setCheck("Number")
        .appendField("with solution (ppm)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#2C97DE");
    this.setTooltip("Calibrate K value ด้วยสารละลายที่ทราบค่า TDS");
    this.setHelpUrl("");
  }
};