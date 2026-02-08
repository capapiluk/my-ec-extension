// ========================================
// TDS/EC Sensor Python Generators
// Version 4.0.0 - Without Temperature Compensation
// ========================================

// Generator 1: อ่านค่า TDS (ppm)
Blockly.Python['ec_read_tds_pro'] = function(block) {
    Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    
    var code = 'tds_ec_sensor.get_tds_ppm(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// Generator 2: อ่านค่า EC (mS/cm)
Blockly.Python['ec_read_ms_pro'] = function(block) {
    Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    
    var code = 'tds_ec_sensor.get_ec_mspcm(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// Generator 3: อ่านค่า EC (µS/cm)
Blockly.Python['ec_read_us_pro'] = function(block) {
    Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    
    var code = 'tds_ec_sensor.get_ec_uspcm(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// Generator 4: ตั้งค่า K-Value
Blockly.Python['ec_set_k_pro'] = function(block) {
    Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
    var k = Blockly.Python.valueToCode(block, 'k', Blockly.Python.ORDER_ATOMIC) || '1.0';
    
    var code = 'tds_ec_sensor.set_kvalue(' + k + ')\n';
    return code;
};

// Generator 5: Calibrate อัตโนมัติ
Blockly.Python['ec_calibrate_auto'] = function(block) {
    Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    var standard = Blockly.Python.valueToCode(block, 'standard', Blockly.Python.ORDER_ATOMIC) || '650';
    
    var code = 'tds_ec_sensor.calibrate_sensor(' + pin + ', ' + standard + ')\n';
    return code;
};

// Generator 6: ดูค่า K-Value ปัจจุบัน
Blockly.Python['ec_get_k_pro'] = function(block) {
    Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
    
    var code = 'tds_ec_sensor.get_kvalue()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// Generator 7: อ่านค่าทั้งหมด (Dictionary)
Blockly.Python['ec_read_all_values'] = function(block) {
    Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    
    var code = 'tds_ec_sensor.read_all_values(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

// Generator 8: แสดงค่าพร้อมหน่วย
Blockly.Python['ec_print_readings'] = function(block) {
    Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    
    var code = 'tds_ec_sensor.print_readings(' + pin + ')\n';
    return code;
};