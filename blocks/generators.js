Blockly.Python['ec_read_ms_pro'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    var temp = Blockly.Python.valueToCode(block, 'temp', Blockly.Python.ORDER_ATOMIC) || '25';
    
    var code = 'ec_sensor.get_ec_ms(' + pin + ', ' + temp + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ec_read_tds_pro'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    var temp = Blockly.Python.valueToCode(block, 'temp', Blockly.Python.ORDER_ATOMIC) || '25';
    
    var code = 'ec_sensor.get_tds_ppm(' + pin + ', ' + temp + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ec_set_k_pro'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    var k = Blockly.Python.valueToCode(block, 'k', Blockly.Python.ORDER_ATOMIC) || '1.0';
    
    var code = 'ec_sensor.set_kvalue(' + k + ')\n';
    return code;
};