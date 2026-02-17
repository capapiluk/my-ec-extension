// ========================================
// TDS/EC Sensor Blocks สำหรับ ป.6 (Simplified)
// Version 4.2.0 - ใช้งานง่าย เหมาะกับเด็ก
// อ่านได้ทุกหน่วย: TDS (ppm), EC (µS/cm, mS/cm)
// ========================================

// Block 1: อ่านค่า TDS (ppm)
Blockly.Blocks['ec_read_tds_simple'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("💧 TDS (ความเค็ม) ขา");
    this.setOutput(true, "Number");
    this.setColour("#3498DB"); // สีฟ้าน้ำ
    this.setTooltip("อ่านค่า TDS (ความเค็ม) ในหน่วย ppm");
    this.setHelpUrl("");
  }
};

// Block 2: อ่านค่า EC (µS/cm)
Blockly.Blocks['ec_read_us_simple'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("⚡ EC (ไฟฟ้า) ขา");
    this.setOutput(true, "Number");
    this.setColour("#16A085"); // สีเขียวน้ำทะเล
    this.setTooltip("อ่านค่า EC ในหน่วย µS/cm (ใช้กับปากกาวัด)");
    this.setHelpUrl("");
  }
};

// Block 3: อ่านค่า EC (mS/cm)
Blockly.Blocks['ec_read_ms_simple'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("⚡ EC (mS/cm) ขา");
    this.setOutput(true, "Number");
    this.setColour("#1ABC9C"); // สีเขียวเข้ม
    this.setTooltip("อ่านค่า EC ในหน่วย mS/cm");
    this.setHelpUrl("");
  }
};

// Block 4: Calibrate ง่าย ๆ
Blockly.Blocks['ec_calibrate_simple'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("🎯 ปรับแก้เซนเซอร์ ขา");
    this.appendValueInput("standard_ec")
        .setCheck("Number")
        .appendField("เทียบกับปากกาครู (µS/cm)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#F39C12"); // สีส้มทอง
    this.setTooltip("เทียบค่าจากเซนเซอร์กับปากกาวัดของครู");
    this.setHelpUrl("");
  }
};

// Block 5: แสดงผลแบบสวยงาม
Blockly.Blocks['ec_show_result'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("📊 แสดงผลการวัด ขา");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9B59B6"); // สีม่วง
    this.setTooltip("แสดงผลการวัดแบบสวยงาม");
    this.setHelpUrl("");
  }
};