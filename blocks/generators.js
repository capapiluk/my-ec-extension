Blockly.Python['ec_read_value'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    
    var code = 'ec_sensor.read_value(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ec_read_voltage'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    
    var code = 'ec_sensor.read_voltage(' + pin + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['ec_set_offset'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    
    var offset = Blockly.Python.valueToCode(block, 'offset', Blockly.Python.ORDER_ATOMIC) || '0';
    
    var code = 'ec_sensor.set_offset(' + offset + ')\n';
    return code;
};// ... generators เดิม ...

Blockly.Python['ec_set_kvalue'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    
    var kvalue = Blockly.Python.valueToCode(block, 'kvalue', Blockly.Python.ORDER_ATOMIC) || '1.0';
    
    var code = 'ec_sensor.set_kvalue(' + kvalue + ')\n';
    return code;
};

Blockly.Python['ec_calibrate_kvalue'] = function(block) {
    Blockly.Python.definitions_['import_ec_sensor'] = 'import ec_sensor';
    
    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC) || '34';
    var known_value = Blockly.Python.valueToCode(block, 'known_value', Blockly.Python.ORDER_ATOMIC) || '707';
    
    var code = 'ec_sensor.calibrate_kvalue(' + pin + ', ' + known_value + ')\n';
    return code;
};