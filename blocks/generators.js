// ========================================
// TDS/EC Sensor Python Generators สำหรับ ป.6
// Version 4.2.0 - เหมาะสำหรับนักเรียน ป.6
// อ่านได้ทุกหน่วย: TDS (ppm), EC (µS/cm, mS/cm)
// ========================================

// TDS (ppm)
Blockly.Python['ec_read_tds_simple'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
  return ['tds_ec_sensor.get_tds_ppm(' + pin + ')', Blockly.Python.ORDER_ATOMIC];
};
 
// EC (µS/cm)
Blockly.Python['ec_read_us_simple'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
  return ['tds_ec_sensor.get_ec_us(' + pin + ')', Blockly.Python.ORDER_ATOMIC];
};

// EC (mS/cm)
Blockly.Python['ec_read_ms_simple'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
  return ['tds_ec_sensor.get_ec_ms(' + pin + ')', Blockly.Python.ORDER_ATOMIC];
};

// Calibrate Simplified
Blockly.Python['ec_calibrate_simple'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
  var standard_ec = Blockly.Python.valueToCode(block, 'standard_ec', Blockly.Python.ORDER_ATOMIC) || '1300';
  return 'tds_ec_sensor.calibrate_with_ec_us(' + pin + ', ' + standard_ec + ')\n';
};

// Show Result 
Blockly.Python['ec_show_result'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
  return 'tds_ec_sensor.print_readings(' + pin + ')\n';
};
