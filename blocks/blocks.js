// ========================================
// TDS/EC Sensor Blocks Definition
// Version 4.0.0 - Without Temperature Compensation
// ========================================

// Block 1: อ่านค่า TDS (ppm)
Blockly.Blocks['ec_read_tds_pro'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("อ่านค่า TDS (ppm) ขา");
    this.setOutput(true, "Number");
    this.setColour("#2980B9"); // สีฟ้าน้ำ
    this.setTooltip("อ่านค่า TDS (Total Dissolved Solids) ในหน่วย ppm");
    this.setHelpUrl("");
  }
};

// Block 2: อ่านค่า EC (mS/cm)
Blockly.Blocks['ec_read_ms_pro'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("อ่านค่า EC (mS/cm) ขา");
    this.setOutput(true, "Number");
    this.setColour("#27AE60"); // สีเขียวเกษตร
    this.setTooltip("อ่านค่า EC (Electrical Conductivity) ในหน่วย mS/cm สำหรับไฮโดรโปนิกส์");
    this.setHelpUrl("");
  }
};

// Block 3: อ่านค่า EC (µS/cm)
Blockly.Blocks['ec_read_us_pro'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("อ่านค่า EC (µS/cm) ขา");
    this.setOutput(true, "Number");
    this.setColour("#16A085"); // สีเขียวน้ำทะเล
    this.setTooltip("อ่านค่า EC (Electrical Conductivity) ในหน่วย µS/cm สำหรับน้ำดื่ม/น้ำบริสุทธิ์");
    this.setHelpUrl("");
  }
};

// Block 4: ตั้งค่า K-Value
Blockly.Blocks['ec_set_k_pro'] = {
  init: function() {
    this.appendValueInput("k")
        .setCheck("Number")
        .appendField("ตั้งค่า K-Value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#D35400"); // สีส้มสำหรับตั้งค่า
    this.setTooltip("ตั้งค่าตัวคูณเพื่อ Calibrate (K = ค่ามาตรฐาน / ค่าที่อ่านได้)");
    this.setHelpUrl("");
  }
};

// Block 5: Calibrate อัตโนมัติ
Blockly.Blocks['ec_calibrate_auto'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("Calibrate Sensor ขา");
    this.appendValueInput("standard")
        .setCheck("Number")
        .appendField("ค่ามาตรฐาน (ppm)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E67E22"); // สีส้มสด
    this.setTooltip("Calibrate อัตโนมัติโดยเทียบกับเครื่องสำเร็จรูป");
    this.setHelpUrl("");
  }
};

// Block 6: ดูค่า K-Value ปัจจุบัน
Blockly.Blocks['ec_get_k_pro'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ดูค่า K-Value ปัจจุบัน");
    this.setOutput(true, "Number");
    this.setColour("#95A5A6"); // สีเทา
    this.setTooltip("แสดงค่า K-Value ที่ตั้งไว้");
    this.setHelpUrl("");
  }
};

// Block 7: อ่านค่าทั้งหมด (Dictionary)
Blockly.Blocks['ec_read_all_values'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("อ่านค่าทั้งหมด (Dict) ขา");
    this.setOutput(true, "Dictionary");
    this.setColour("#8E44AD"); // สีม่วง
    this.setTooltip("อ่านค่า TDS, EC (mS/cm, µS/cm), Voltage และ K-value พร้อมกัน");
    this.setHelpUrl("");
  }
};

// Block 8: แสดงค่าพร้อมหน่วย
Blockly.Blocks['ec_print_readings'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("แสดงค่าเซ็นเซอร์ ขา");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#34495E"); // สีน้ำเงินเข้ม
    this.setTooltip("แสดงค่าทั้งหมดพร้อมหน่วยแบบสวยงาม");
    this.setHelpUrl("");
  }
};