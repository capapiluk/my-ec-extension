// =======================
// EC Sensor Blocks
// =======================
Blockly.defineBlocksWithJsonArray([
    {
        "type": "ec_read_value",
        "message0": "อ่านค่า EC (mS/cm) ขา A %1",
        "args0": [
            {
                "type": "input_value",
                "name": "pin",
                "check": "Number"
            }
        ],
        "output": "Number",
        "colour": "#2ecc71",
        "tooltip": "อ่านค่า EC จาก Gravity EC / TDS Sensor",
        "helpUrl": ""
    },
    {
        "type": "ec_read_voltage",
        "message0": "อ่านค่าแรงดัน EC (ขา A %1)",
        "args0": [
            {
                "type": "input_value",
                "name": "pin",
                "check": "Number"
            }
        ],
        "output": "Number",
        "colour": "#2ecc71",
        "tooltip": "อ่านแรงดันจาก EC Sensor",
        "helpUrl": ""
    },
    {
        "type": "ec_set_offset",
        "message0": "ตั้งค่า EC Offset %1",
        "args0": [
            {
                "type": "input_value",
                "name": "offset",
                "check": "Number"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#2ecc71",
        "tooltip": "ปรับค่า Offset สำหรับคาลิเบรท EC",
        "helpUrl": ""
    }
]);
