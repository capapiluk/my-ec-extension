# TDS/EC Pro Sensor Extension v4.0.0

## 📁 โครงสร้างไฟล์

```
tds-ec-pro-sensor/
├── extension.js                    # ไฟล์หลักของ Extension
├── blocks.js                       # Blockly Block Definitions
├── generators.js                   # Python Code Generators
├── modules/
│   └── tds_ec_sensor.py           # Python Module สำหรับ ESP32
├── static/
│   └── icon.png                   # ไอคอนของ Extension
└── README.md                      # เอกสารนี้
```

## 🚀 การติดตั้ง

### สำหรับ MicroBlock IDE:

1. **Copy โฟลเดอร์ทั้งหมด** ไปยัง:
   ```
   /path/to/microblock/extensions/tds-ec-pro-sensor/
   ```

2. **โครงสร้างที่ถูกต้อง**:
   ```
   extensions/
   └── tds-ec-pro-sensor/
       ├── extension.js
       ├── blocks.js
       ├── generators.js
       ├── modules/
       │   └── tds_ec_sensor.py
       └── static/
           └── icon.png
   ```

3. **รีสตาร์ท IDE** หรือกด Refresh Extensions

4. **เลือก Extension** จากเมนู Extensions

## 📋 Blocks ทั้งหมด (8 Blocks)

### 📊 การอ่านค่า:
1. **อ่านค่า TDS (ppm) ขา [pin]**
2. **อ่านค่า EC (mS/cm) ขา [pin]**
3. **อ่านค่า EC (µS/cm) ขา [pin]**
4. **อ่านค่าทั้งหมด (Dict) ขา [pin]**
5. **แสดงค่าเซ็นเซอร์ ขา [pin]**

### 🔧 การปรับแต่ง:
6. **ตั้งค่า K-Value [k]**
7. **Calibrate Sensor ขา [pin] ค่ามาตรฐาน (ppm) [standard]**
8. **ดูค่า K-Value ปัจจุบัน**

## 🔌 Hardware Connection

```
TDS/EC Sensor → ESP32
─────────────────────
VCC    → 3.3V
GND    → GND
Signal → GPIO 34 (ADC Pin)
```

## 💡 ตัวอย่างการใช้งาน

### ตัวอย่างที่ 1: อ่านค่า TDS พื้นฐาน
```python
import tds_ec_sensor

# อ่านค่า TDS
tds = tds_ec_sensor.get_tds_ppm(34)
print(f"TDS: {tds} ppm")
```

### ตัวอย่างที่ 2: Calibrate Sensor
```python
import tds_ec_sensor

# 1. จุ่มเซ็นเซอร์และเครื่องมาตรฐานในน้ำเดียวกัน
# 2. อ่านค่าจากเครื่องมาตรฐาน (สมมติได้ 650 ppm)
# 3. Calibrate
tds_ec_sensor.calibrate_sensor(34, 650)

# 4. ทดสอบอ่านค่าใหม่
tds_ec_sensor.print_readings(34)
```

### ตัวอย่างที่ 3: ระบบไฮโดรโปนิกส์
```python
import tds_ec_sensor
import time

# ตั้งค่า K-value ที่ได้จาก Calibrate
tds_ec_sensor.set_kvalue(1.1207)

while True:
    # อ่านค่า EC
    ec = tds_ec_sensor.get_ec_mspcm(34)
    
    # ควบคุมตามค่า EC
    if ec < 1.2:
        print("⚠️ EC ต่ำเกินไป - เพิ่มปุ๋ย")
    elif ec > 2.0:
        print("⚠️ EC สูงเกินไป - เติมน้ำ")
    else:
        print(f"✅ EC เหมาะสม: {ec} mS/cm")
    
    time.sleep(1800)  # ตรวจสอบทุก 30 นาที
```

## 📊 ค่ามาตรฐาน

### TDS (ppm):
- น้ำกลั่น: 0-50 ppm
- น้ำดื่ม: 50-500 ppm
- น้ำประปา: 100-300 ppm

### EC สำหรับไฮโดรโปนิกส์ (mS/cm):
- กล้าไม้: 0.5-1.0
- ผักสลัด: 1.2-2.0
- มะเขือเทศ: 2.0-3.5
- พริก: 2.5-4.0

### EC สำหรับน้ำดื่ม (µS/cm):
- น้ำบริสุทธิ์: 0-50
- น้ำดื่มคุณภาพดี: 50-500
- น้ำประปา: 200-800

## 🔄 Changelog

### Version 4.0.0 (Current)
- ✅ ลบการชดเชยอุณหภูมิ (Temperature Compensation)
- ✅ เพิ่ม Block EC (µS/cm)
- ✅ เพิ่ม Block Calibrate อัตโนมัติ
- ✅ เพิ่ม Block อ่านค่าทั้งหมด (Dictionary)
- ✅ เพิ่ม Block แสดงค่าพร้อมหน่วย
- ✅ เพิ่ม Block ดูค่า K-Value
- ✅ ปรับปรุง Median Filter
- ✅ เปลี่ยนชื่อ module เป็น `tds_ec_sensor`
- ✅ Default pin เป็น GPIO 34

### Version 3.5.0 (Old)
- Temperature Compensation
- 3 Blocks (TDS, EC mS/cm, Set K)
- Module name: `ec_sensor`

## 💡 Tips & Best Practices

1. **Calibrate ทุก 1-2 เดือน** หรือเมื่อเปลี่ยนเซ็นเซอร์
2. **ทำความสะอาด** เซ็นเซอร์ด้วยน้ำกลั่นหลังใช้งาน
3. **เก็บในน้ำกลั่น** อย่าปล่อยให้เซ็นเซอร์แห้ง
4. **ใช้ EC สำหรับไฮโดร** แม่นยำกว่า TDS
5. **รอให้ค่าคงที่** ประมาณ 30 วินาทีหลังจุ่ม
6. **ใช้ ADC Pin** (GPIO 32-39 สำหรับ ESP32)

## ⚠️ ข้อควรระวัง

1. Pin ที่ใช้ต้องเป็น ADC Pin
2. ต้อง Import module `tds_ec_sensor` ก่อนใช้งาน
3. Calibrate ที่ช่วงค่าที่จะใช้งานจริง
4. อย่าใช้ในน้ำที่มีอุณหภูมิสูงเกิน 60°C
5. อย่าปล่อยให้เซ็นเซอร์แห้ง

## 📞 Support

- Author: Cap_Apiluk
- Version: 4.0.0
- Category: Sensor
- License: MIT

## 🔗 ความสัมพันธ์ระหว่างหน่วย

```
1 mS/cm = 1000 µS/cm
1 mS/cm ≈ 500 ppm (conversion factor 0.5)

ตัวอย่าง:
EC = 1.30 mS/cm = 1300 µS/cm ≈ 650 ppm
```