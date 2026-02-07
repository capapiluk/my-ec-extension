// =======================
// EC READ VALUE
// =======================
Blockly.JavaScript['ec_read_value'] = function(block) {
    Blockly.JavaScript.definitions_['include_ec_sensor'] =
        '#include <Arduino.h>';

    if (!Blockly.JavaScript.definitions_['var_ec_offset']) {
        Blockly.JavaScript.definitions_['var_ec_offset'] =
            'float ecOffset = 0.0;';
    }

    var pin = Blockly.JavaScript.valueToCode(
        block, 'pin', Blockly.JavaScript.ORDER_ATOMIC
    );

    var code = `([]() {
        long sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += analogRead(${pin});
            delay(2);
        }

        float adc = sum / 10.0;
        float voltage = (adc * 3.3) / 4095.0;

        // ❌ sensor ไม่ได้เสียบ
        if (voltage < 0.1) {
            return -1.0;
        }

        // สูตร EC (Gravity / DFRobot)
        float ecValue =
            (133.42 * voltage * voltage * voltage
            -255.86 * voltage * voltage
            +857.39 * voltage) * 0.001;

        ecValue += ecOffset;

        if (ecValue < 0) ecValue = 0;
        if (ecValue > 10) ecValue = 10;

        return ecValue;
    })()`;

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// =======================
// EC READ VOLTAGE
// =======================
Blockly.JavaScript['ec_read_voltage'] = function(block) {
    Blockly.JavaScript.definitions_['include_ec_sensor'] =
        '#include <Arduino.h>';

    var pin = Blockly.JavaScript.valueToCode(
        block, 'pin', Blockly.JavaScript.ORDER_ATOMIC
    );

    var code = `([]() {
        long sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += analogRead(${pin});
            delay(2);
        }

        float adc = sum / 10.0;
        return (adc * 3.3) / 4095.0;
    })()`;

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// =======================
// EC SET OFFSET
// =======================
Blockly.JavaScript['ec_set_offset'] = function(block) {
    if (!Blockly.JavaScript.definitions_['var_ec_offset']) {
        Blockly.JavaScript.definitions_['var_ec_offset'] =
            'float ecOffset = 0.0;';
    }

    var offset = Blockly.JavaScript.valueToCode(
        block, 'offset', Blockly.JavaScript.ORDER_ATOMIC
    );

    return `ecOffset = ${offset};\n`;
};
