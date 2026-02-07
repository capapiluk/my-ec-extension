Blockly.defineBlocksWithJsonArray([
{
  "type": "ec_read_value",
  "message0": "read EC value (mS/cm) pin %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pin",
      "check": "Number"
    }
  ],
  "output": "Number",
  "colour": "#2C97DE",
  "tooltip": "อ่านค่า EC จาก sensor (mS/cm)",
  "helpUrl": ""
},
{
  "type": "ec_read_voltage",
  "message0": "read EC voltage (V) pin %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pin",
      "check": "Number"
    }
  ],
  "output": "Number",
  "colour": "#2C97DE",
  "tooltip": "อ่านค่าแรงดัน (Voltage) จาก EC sensor",
  "helpUrl": ""
},
{
  "type": "ec_set_offset",
  "message0": "set EC offset %1",
  "args0": [
    {
      "type": "input_value",
      "name": "offset",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2C97DE",
  "tooltip": "ตั้งค่า offset สำหรับ calibrate EC sensor",
  "helpUrl": ""
}
]);