// ========================================
// TDS/EC Sensor Python Generators (FIXED)
// ========================================

// TDS (ppm)
Blockly.Python['ec_read_tds_pro'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  return ['tds_ec_sensor.get_tds_ppm()', Blockly.Python.ORDER_ATOMIC];
};

// EC (mS/cm)
Blockly.Python['ec_read_ms_pro'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  return ['tds_ec_sensor.get_ec_ms()', Blockly.Python.ORDER_ATOMIC];
};

// EC (µS/cm)
Blockly.Python['ec_read_us_pro'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  return ['tds_ec_sensor.get_ec_us()', Blockly.Python.ORDER_ATOMIC];
};

// Set K
Blockly.Python['ec_set_k_pro'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  var k = Blockly.Python.valueToCode(block, 'k', Blockly.Python.ORDER_ATOMIC) || '1.0';
  return 'tds_ec_sensor.set_k_value(' + k + ')\n';
};

// Auto Calibrate
Blockly.Python['ec_calibrate_auto'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  var standard = Blockly.Python.valueToCode(block, 'standard', Blockly.Python.ORDER_ATOMIC) || '650';
  return 'tds_ec_sensor.calibrate_with_standard(' + standard + ')\n';
};

// Get K
Blockly.Python['ec_get_k_pro'] = function(block) {
  Blockly.Python.definitions_['import_tds_ec_sensor'] = 'import tds_ec_sensor';
  return ['tds_ec_sensor.get_k_value()', Blockly.Python.ORDER_ATOMIC];
};
