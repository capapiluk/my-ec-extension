// =======================
// EC SENSOR – MICROBLOCK (ESP32)
// =======================

Blockly.JavaScript['ec_read_value'] = function(block) {
  var pin = Blockly.JavaScript.valueToCode(
    block,
    'pin',
    Blockly.JavaScript.ORDER_ATOMIC
  ) || '34';
  
  Blockly.JavaScript.definitions_['ec_sensor_include'] = '#include <Arduino.h>';
  
  Blockly.JavaScript.definitions_['ec_sensor_functions'] = `
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
`;
  
  return [`readECValue(${pin})`, Blockly.JavaScript.ORDER_ATOMIC];
};

// =======================
// EC READ VOLTAGE
// =======================
Blockly.JavaScript['ec_read_voltage'] = function(block) {
  var pin = Blockly.JavaScript.valueToCode(
    block,
    'pin',
    Blockly.JavaScript.ORDER_ATOMIC
  ) || '34';
  
  Blockly.JavaScript.definitions_['ec_sensor_include'] = '#include <Arduino.h>';
  
  Blockly.JavaScript.definitions_['ec_sensor_functions'] = `
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
  if (voltage < 0.1) {
    return -1.0;
  }
  float ec =
    (133.42 * voltage * voltage * voltage
    -255.86 * voltage * voltage
    +857.39 * voltage) * 0.001;
  ec += ecOffset;
  if (ec < 0) ec = 0;
  if (ec > 10) ec = 10;
  return ec;
}
`;
  
  return [`readECVoltage(${pin})`, Blockly.JavaScript.ORDER_ATOMIC];
};

// =======================
// EC SET OFFSET
// =======================
Blockly.JavaScript['ec_set_offset'] = function(block) {
  var offset = Blockly.JavaScript.valueToCode(
    block,
    'offset',
    Blockly.JavaScript.ORDER_ATOMIC
  ) || '0';
  
  Blockly.JavaScript.definitions_['ec_sensor_include'] = '#include <Arduino.h>';
  
  Blockly.JavaScript.definitions_['ec_sensor_functions'] = `
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
  if (voltage < 0.1) {
    return -1.0;
  }
  float ec =
    (133.42 * voltage * voltage * voltage
    -255.86 * voltage * voltage
    +857.39 * voltage) * 0.001;
  ec += ecOffset;
  if (ec < 0) ec = 0;
  if (ec > 10) ec = 10;
  return ec;
}
`;
  
  return `ecOffset = ${offset};\n`;
};