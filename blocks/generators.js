// =======================
// EC SENSOR – MICROBLOCK (ESP32)
// =======================
Blockly.Arduino.addInclude(
  'ec_sensor',
  '#include <Arduino.h>'
);

Blockly.Arduino.addDeclaration(
  'ec_sensor_globals',
  `
float ecOffset = 0.0;

float readECVoltage(int pin) {
  long sum = 0;
  for (int i = 0; i < 10; i++) {
    sum += analogRead(pin);
    delay(2);
  }
  float adc = sum / 10.0;
  return (adc * 3.3) / 4095.0;
}

float readECValue(int pin) {
  float voltage = readECVoltage(pin);
  // sensor ไม่ได้เสียบ
  if (voltage < 0.1) {
    return -1.0;
  }
  // สูตร Gravity EC (DFRobot)
  float ec =
    (133.42 * voltage * voltage * voltage
    -255.86 * voltage * voltage
    +857.39 * voltage) * 0.001;
  ec += ecOffset;
  if (ec < 0) ec = 0;
  if (ec > 10) ec = 10;
  return ec;
}
`
);

// =======================
// EC READ VALUE
// =======================
Blockly.Arduino['ec_read_value'] = function (block) {
  var pin = Blockly.Arduino.valueToCode(
    block,
    'pin',
    Blockly.Arduino.ORDER_ATOMIC
  ) || '34';
  return [`readECValue(${pin})`, Blockly.Arduino.ORDER_ATOMIC];
};

// =======================
// EC READ VOLTAGE
// =======================
Blockly.Arduino['ec_read_voltage'] = function (block) {
  var pin = Blockly.Arduino.valueToCode(
    block,
    'pin',
    Blockly.Arduino.ORDER_ATOMIC
  ) || '34';
  return [`readECVoltage(${pin})`, Blockly.Arduino.ORDER_ATOMIC];
};

// =======================
// EC SET OFFSET
// =======================
Blockly.Arduino['ec_set_offset'] = function (block) {
  var offset = Blockly.Arduino.valueToCode(
    block,
    'offset',
    Blockly.Arduino.ORDER_ATOMIC
  ) || '0';
  return `ecOffset = ${offset};\n`;
};