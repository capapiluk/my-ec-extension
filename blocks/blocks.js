// --- ส่วนแสดงผลบล็อก (Blocks Definition) ---

// 1. บล็อกอ่านค่า EC (mS/cm) - สำหรับวัดปุ๋ยผัก
Blockly.Blocks['ec_read_ms'] = {
  init: function() {
    this.appendValueInput("pin").setCheck("Number").appendField("อ่านค่าปุ๋ย EC (mS/cm) ขา");
    this.setOutput(true, "Number");
    this.setColour("#2C97DE");
    this.setTooltip("อ่านค่าความเข้มข้นปุ๋ยหน่วย mS/cm (เทียบเครื่อง AR8011)");
  }
};

// 2. บล็อกอ่านค่า TDS (ppm) - สำหรับวัดคุณภาพน้ำทั่วไป
Blockly.Blocks['ec_read_tds'] = {
  init: function() {
    this.appendValueInput("pin").setCheck("Number").appendField("อ่านค่า TDS (ppm) ขา");
    this.setOutput(true, "Number");
    this.setColour("#2C97DE");
    this.setTooltip("อ่านค่าสารละลายในน้ำหน่วย ppm");
  }
};

// 3. บล็อกปรับจูน (Calibration) - หัวใจความแม่นยำ
Blockly.Blocks['ec_set_kvalue'] = {
  init: function() {
    this.appendValueInput("kvalue").setCheck("Number").appendField("ปรับค่าความแม่นยำ (K Value)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E67E22"); // สีส้มสำหรับการตั้งค่า
    this.setTooltip("ถ้าค่าที่ได้น้อยไปให้เพิ่มเลข (>1.0) ถ้าค่ามากไปให้ลดเลข (<1.0)");
  }
};

// 4. บล็อกอ่านแรงดัน (Voltage) - ไว้เช็คว่าเซนเซอร์พังไหม
Blockly.Blocks['ec_read_voltage'] = {
  init: function() {
    this.appendValueInput("pin").setCheck("Number").appendField("เช็คแรงดันเซนเซอร์ (V) ขา");
    this.setOutput(true, "Number");
    this.setColour("#95A5A6"); // สีเทาสำหรับ Debug
    this.setTooltip("ใช้เช็คว่าเซนเซอร์ส่งสัญญาณปกติไหม (ควรอยู่ระหว่าง 0-2.5V)");
  }
};