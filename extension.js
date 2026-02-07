({
    name: "TDS/EC Sensor Pro",
    description: "TDS/EC Sensor for Hydroponics (Compatible with SmartSensor AR8011)",
    author: "Your Name",
    category: "Sensor",
    version: "2.1.0",
    icon: "/static/icon.png",
    color: "#2C97DE",
    blocks: [
        // --- กลุ่มบล็อกอ่านค่า ---
        {
            xml: `<block type="ec_read_ms"><value name="pin"><shadow type="math_number"><field name="NUM">34</field></shadow></value></block>`
        },
        {
            xml: `<block type="ec_read_tds"><value name="pin"><shadow type="math_number"><field name="NUM">34</field></shadow></value></block>`
        },
        {
            xml: `<block type="ec_read_voltage"><value name="pin"><shadow type="math_number"><field name="NUM">34</field></shadow></value></block>`
        },
        "---", // เส้นคั่น
        // --- กลุ่มบล็อกปรับจูน ---
        {
            xml: `<block type="ec_set_kvalue"><value name="kvalue"><shadow type="math_number"><field name="NUM">1.0</field></shadow></value></block>`
        },
        {
            xml: `<block type="ec_set_temperature"><value name="temp"><shadow type="math_number"><field name="NUM">25</field></shadow></value></block>`
        },
        {
            xml: `<block type="ec_calibrate_kvalue"><value name="pin"><shadow type="math_number"><field name="NUM">34</field></shadow></value><value name="known_value"><shadow type="math_number"><field name="NUM">707</field></shadow></value></block>`
        }
    ],
    modules: [
        {
            name: "ec_sensor",
            path: "/modules/ec_sensor.py"
        }
    ]
});

// ==========================================
// Python Code Generators
// ==========================================

Blockly.Python['ec_read_ms'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    return ['ec_sensor.read_ec_ms(' + pin + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ec_read_tds'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    return ['ec_sensor.read_tds_ppm(' + pin + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ec_read_voltage'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    return ['ec_sensor.read_voltage(' + pin + ')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ec_set_kvalue'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var kvalue = Blockly.Python.valueToCode(block, 'kvalue', Blockly.Python.ORDER_ATOMIC) || '1.0';
    return 'ec_sensor.set_kvalue(' + kvalue + ')\n';
};

Blockly.Python['ec_set_temperature'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var temp = Blockly.Python.valueToCode(block, 'temp', Blockly.Python.ORDER_ATOMIC) || '25';
    return 'ec_sensor.set_temperature(' + temp + ')\n';
};

Blockly.Python['ec_calibrate_kvalue'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    var known = Blockly.Python.valueToCode(block, 'known_value', Blockly.Python.ORDER_ATOMIC) || '707';
    return 'ec_sensor.calibrate_kvalue(' + pin + ', ' + known + ')\n';
};

// ==========================================
// Block Definitions (UI)
// ==========================================

Blockly.Blocks['ec_read_ms'] = {
  init: function() {
    this.appendValueInput("pin").setCheck("Number").appendField("อ่านค่าปุ๋ย EC (mS/cm) ขา");
    this.setOutput(true, "Number");
    this.setColour("#2C97DE");
    this.setTooltip("อ่านค่าความนำไฟฟ้าหน่วย mS/cm (นิยมใช้ในไฮโดรโปนิกส์)");
  }
};

Blockly.Blocks['ec_read_tds'] = {
  init: function() {
    this.appendValueInput("pin").setCheck("Number").appendField("อ่านค่า TDS (ppm) ขา");
    this.setOutput(true, "Number");
    this.setColour("#2C97DE");
    this.setTooltip("อ่านค่าสารละลายรวมในน้ำหน่วย ppm");
  }
};

Blockly.Blocks['ec_read_voltage'] = {
  init: function() {
    this.appendValueInput("pin").setCheck("Number").appendField("อ่านแรงดันเซนเซอร์ (V) ขา");
    this.setOutput(true, "Number");
    this.setColour("#95A5A6");
    this.setTooltip("อ่านค่าแรงดันดิบจาก ADC");
  }
};

Blockly.Blocks['ec_set_kvalue'] = {
  init: function() {
    this.appendValueInput("kvalue").setCheck("Number").appendField("ตั้งค่าปรับจูน K Value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E67E22");
    this.setTooltip("ปรับค่าตัวคูณความแม่นยำ (ปกติคือ 1.0)");
  }
};

Blockly.Blocks['ec_set_temperature'] = {
  init: function() {
    this.appendValueInput("temp").setCheck("Number").appendField("ตั้งอุณหภูมิน้ำ (°C)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E67E22");
  }
};

Blockly.Blocks['ec_calibrate_kvalue'] = {
  init: function() {
    this.appendValueInput("pin").setCheck("Number").appendField("Calibrate K ขา");
    this.appendValueInput("known_value").setCheck("Number").appendField("ด้วยค่ามาตรฐาน (ppm)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#D35400");
  }
};