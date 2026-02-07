Blockly.Blocks['ec_read_ms_pro'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("อ่านค่า EC (mS/cm) ขา");
    this.appendValueInput("temp")
        .setCheck("Number")
        .appendField("ที่อุณหภูมิ (°C)");
    this.setOutput(true, "Number");
    this.setColour("#27AE60"); // สีเขียวเกษตร
    this.setTooltip("อ่านค่า EC แบบแม่นยำสูง (ชดเชยอุณหภูมิอัตโนมัติ)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ec_read_tds_pro'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("อ่านค่า TDS (ppm) ขา");
    this.appendValueInput("temp")
        .setCheck("Number")
        .appendField("ที่อุณหภูมิ (°C)");
    this.setOutput(true, "Number");
    this.setColour("#2980B9"); // สีฟ้าน้ำ
    this.setTooltip("อ่านค่า TDS แบบแม่นยำสูง (ชดเชยอุณหภูมิอัตโนมัติ)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['ec_set_k_pro'] = {
  init: function() {
    this.appendValueInput("k")
        .setCheck("Number")
        .appendField("ตั้งค่าจูน Sensor (K-Value)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#D35400"); // สีส้มสำหรับตั้งค่า
    this.setTooltip("ใส่ค่าตัวคูณเพื่อ Calibrate ให้ตรงกับเครื่อง AR8011 (เช่น 1.2)");
    this.setHelpUrl("");
  }
};