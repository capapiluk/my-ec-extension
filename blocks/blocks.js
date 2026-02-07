Blockly.Blocks['ec_read_value'] = {
  init: function () {
    this.appendValueInput("pin")
      .setCheck("Number")
      .appendField("อ่านค่า EC ขา");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("อ่านค่า EC (mS/cm) ถ้าไม่ได้เสียบ sensor จะได้ -1");
  }
};

Blockly.Blocks['ec_read_voltage'] = {
  init: function () {
    this.appendValueInput("pin")
      .setCheck("Number")
      .appendField("อ่านค่าแรงดัน EC ขา");
    this.setOutput(true, "Number");
    this.setColour(200);
    this.setTooltip("อ่านค่าแรงดันจาก EC sensor (V)");
  }
};

Blockly.Blocks['ec_set_offset'] = {
  init: function () {
    this.appendValueInput("offset")
      .setCheck("Number")
      .appendField("ตั้งค่า EC offset");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
    this.setTooltip("ตั้งค่า offset สำหรับคาลิเบรท EC");
  }
};
