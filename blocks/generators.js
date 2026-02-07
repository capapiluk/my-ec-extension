// =======================
// EC SENSOR – MICROBLOCK SAFE
// ESP32 ADC 12-bit (0–4095) | 3.3V
// =======================

// ---------- GLOBAL DEFINITIONS ----------
Blockly.JavaScript.definitions_['include_ec_sensor'] =
`#include <Arduino.h>

float ecOffset = 0.0;

// อ่านค่า EC
float readECValue(int pin) {
    long sum = 0;
    for (int i = 0; i < 10; i++) {
        sum += analogRead(pin);
        delay(2);
    }

    float adc = sum / 10.0;
    float voltage = (adc * 3.3) / 4095.0;

    // Sensor ไม่ได้เสียบ
    if (voltage < 0.1) {
        return -1.0;
    }

    // สูตร EC (DFRobot / Gravity)
    float ec =
        (133.42 * voltage * voltage * voltage
        -255.86 * voltage * voltage
        +857.39 * voltage) * 0.001;

    ec += ecOffset;

    if (ec < 0) ec = 0;
    if (ec > 10) ec = 10;

    return ec;
}

// อ่านแรงดัน
float readECVoltage(int pin) {
    long sum = 0;
    for (int i = 0; i < 10; i++) {
        sum += analogRead(pin);
        delay(2);
    }

    float adc = sum / 10.0;
    return (adc * 3.3) / 4095.0;
}
`;


// =======================
// EC READ VALUE
// =======================
Blockly.JavaScript['ec_read_value'] = function(block) {
    var pin = Blockly.JavaScript.valueToCode(
        block, 'pin', Blockly.JavaScript.ORDER_ATOMIC
    ) || '34';

    var code = `readECValue(${pin})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


// =======================
// EC READ VOLTAGE
// =======================
Blockly.JavaScript['ec_read_voltage'] = function(block) {
    var pin = Blockly.JavaScript.valueToCode(
        block, 'pin', Blockly.JavaScript.ORDER_ATOMIC
    ) || '34';

    var code = `readECVoltage(${pin})`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


// =======================
// EC SET OFFSET
// =======================
Blockly.JavaScript['ec_set_offset'] = function(block) {
    var offset = Blockly.JavaScript.valueToCode(
        block, 'offset', Blockly.JavaScript.ORDER_ATOMIC
    ) || '0';

    return `ecOffset = ${offset};\n`;
};
