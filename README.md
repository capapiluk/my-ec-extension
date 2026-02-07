# EC Sensor Extension for MicroBlock

EC (Electrical Conductivity) Sensor extension for water quality measurement.

## Installation

Load this extension in MicroBlock IDE.

## Blocks

- **read EC value (mS/cm) pin** - Read EC value from sensor
- **read EC voltage (V) pin** - Read voltage from sensor
- **set EC offset** - Calibrate sensor with offset value

## Hardware

- DFRobot Gravity EC Sensor
- ESP32
- Connect sensor to any ADC pin (default: GPIO 34)
```

---

## ✅ สรุปไฟล์ทั้งหมด
```
ec-sensor-extension/
├── blocks.js              ← block definitions
├── generators.js          ← code generators (ใหม่!)
├── extension.js           ← main extension file
├── package.json           ← metadata
├── ec_sensor.py          ← MicroPython library
├── static/
│   └── icon.png          ← 64x64 icon
└── README.md             ← documentation