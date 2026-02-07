// บล็อกอ่านค่า EC (mS/cm) - สำหรับวัดปุ๋ย
Blockly.Python['ec_read_ms'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    var code = 'ec_sensor.get_ms(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// บล็อกอ่านค่า TDS (ppm) - สำหรับวัดคุณภาพน้ำ
Blockly.Python['ec_read_tds'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    var code = 'ec_sensor.get_tds(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// บล็อกอ่านแรงดัน (V) - สำหรับตรวจสอบเซนเซอร์ (Debug)
Blockly.Python['ec_read_voltage'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    var code = 'ec_sensor.read_voltage(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// บล็อกตั้งค่า K Value (ใช้ปรับจูนให้ตรงกับ AR8011)
Blockly.Python['ec_set_kvalue'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var kvalue = Blockly.Python.valueToCode(block, 'kvalue', Blockly.Python.ORDER_ATOMIC) || '1.0';
    var code = 'ec_sensor.set_kvalue(' + kvalue + ')\n';
    return code;
};

// บล็อกตั้งค่า Offset (ถ้าค่าเริ่มต้นไม่เป็น 0)
Blockly.Python['ec_set_offset'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var offset = Blockly.Python.valueToCode(block, 'offset', Blockly.Python.ORDER_ATOMIC) || '0';
    var code = 'ec_sensor.set_offset(' + offset + ')\n';
    return code;
};