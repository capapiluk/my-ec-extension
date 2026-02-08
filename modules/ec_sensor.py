import machine
import time

# --- Global Config ---
_k_value = 1.0       # ค่า Calibration Factor
_adc_pin = None
_adc_res = 4095.0    # ESP32 12-bit ADC Resolution
_v_ref = 3.3         # Reference Voltage (V)

def _init_pin(pin_num):
    """Initialize ADC pin with proper configuration"""
    global _adc_pin
    if _adc_pin is None:
        _adc_pin = machine.ADC(machine.Pin(pin_num))
        _adc_pin.atten(machine.ADC.ATTN_11DB)  # 0-3.3V range
        _adc_pin.width(machine.ADC.WIDTH_12BIT)

def set_kvalue(k):
    """Set calibration K-value
    
    Args:
        k: Calibration factor (ค่าที่ได้จากการ calibrate กับสารละลายมาตรฐาน)
    """
    global _k_value
    _k_value = float(k)

def get_kvalue():
    """Get current K-value
    
    Returns:
        float: Current calibration factor
    """
    return _k_value

def read_stable_voltage(pin_num):
    """Read stable voltage using median filtering
    
    Method: Multi-sampling + Sorting + Median filter
    - อ่านค่า 30 ครั้ง
    - เรียงลำดับและตัดค่าสุดขั้ว (noise) ทิ้ง
    - หาค่าเฉลี่ยจากค่ากลาง
    
    Returns:
        float: Filtered voltage (V)
    """
    _init_pin(pin_num)
    
    samples = []
    # Sampling: อ่านค่า 30 ครั้ง
    for _ in range(30):
        samples.append(_adc_pin.read())
        time.sleep_ms(2)
    
    # Sorting & Filtering: เรียงลำดับและตัดค่าขอบ 20 ค่า (10 ต่ำสุด, 10 สูงสุด)
    samples.sort()
    valid_samples = samples[10:-10]  # เอาเฉพาะ 10 ค่าตรงกลาง
    
    if not valid_samples:
        return 0.0
    
    # Calculate average and convert to voltage
    avg_raw = sum(valid_samples) / len(valid_samples)
    return (avg_raw / _adc_res) * _v_ref

def get_tds_ppm(pin):
    """Calculate TDS (Total Dissolved Solids) without temperature compensation
    
    Args:
        pin: ADC pin number
        
    Returns:
        float: TDS value in ppm (parts per million)
    
    Note:
        - ไม่มีการชดเชยอุณหภูมิ เพื่อความเรียบง่ายและแม่นยำในสภาวะคงที่
        - ใช้ Cubic regression สำหรับแปลง voltage เป็น ppm
        - ค่าที่ได้คือ TDS ที่อุณหภูมิห้อง (~25°C)
    """
    voltage = read_stable_voltage(pin)
    
    # ตัดค่ารบกวนเมื่อไม่ได้จุ่มในน้ำ
    if voltage < 0.05:
        return 0.0
    
    # Cubic Regression Formula (แม่นยำกว่า Linear)
    # สูตรนี้ได้จากการ curve fitting กับ TDS sensor มาตรฐาน
    tds = (133.42 * voltage**3 - 255.86 * voltage**2 + 857.39 * voltage) * 0.5
    
    # Apply Calibration Factor
    return round(tds * _k_value, 1)

def get_ec_mspcm(pin):
    """Calculate EC (Electrical Conductivity) in mS/cm
    
    Args:
        pin: ADC pin number
        
    Returns:
        float: EC value in mS/cm (milliSiemens per centimeter)
    
    Standard Conversion:
        - 1 mS/cm = 500 ppm (conversion factor 0.5)
        - สำหรับไฮโดรโปนิกส์ ค่า EC มักอยู่ระหว่าง 0.5-3.0 mS/cm
    """
    tds_ppm = get_tds_ppm(pin)
    # TDS (ppm) = EC (mS/cm) × 500
    # Therefore: EC (mS/cm) = TDS (ppm) / 500
    ec = tds_ppm / 500.0
    return round(ec, 2)

def get_ec_uspcm(pin):
    """Calculate EC (Electrical Conductivity) in µS/cm
    
    Args:
        pin: ADC pin number
        
    Returns:
        float: EC value in µS/cm (microSiemens per centimeter)
    
    Note:
        - 1 mS/cm = 1000 µS/cm
        - µS/cm ใช้สำหรับน้ำที่มีความเข้มข้นต่ำ (น้ำดื่ม, น้ำกลั่น)
        - mS/cm ใช้สำหรับสารละลายที่เข้มข้นกว่า (ไฮโดรโปนิกส์)
    """
    ec_ms = get_ec_mspcm(pin)
    return round(ec_ms * 1000.0, 0)

def read_all_values(pin):
    """Read and display all values with proper units
    
    Args:
        pin: ADC pin number
        
    Returns:
        dict: Dictionary containing all measurements
    """
    voltage = read_stable_voltage(pin)
    tds = get_tds_ppm(pin)
    ec_ms = get_ec_mspcm(pin)
    ec_us = get_ec_uspcm(pin)
    
    results = {
        'voltage': voltage,
        'tds_ppm': tds,
        'ec_ms_cm': ec_ms,
        'ec_us_cm': ec_us,
        'k_value': _k_value
    }
    
    return results

def print_readings(pin):
    """Print formatted readings with units"""
    data = read_all_values(pin)
    print("=" * 40)
    print("TDS/EC Sensor Readings")
    print("=" * 40)
    print(f"Voltage:     {data['voltage']:.3f} V")
    print(f"TDS:         {data['tds_ppm']:.1f} ppm")
    print(f"EC:          {data['ec_ms_cm']:.2f} mS/cm")
    print(f"EC:          {data['ec_us_cm']:.0f} µS/cm")
    print(f"K-value:     {data['k_value']:.4f}")
    print("=" * 40)

def calibrate_sensor(pin, standard_value, readings_count=5):
    """ช่วยคำนวณ K-value อัตโนมัติ
    
    Args:
        pin: ADC pin number
        standard_value: ค่าจากเครื่องมาตรฐาน (ppm หรือ µS/cm)
        readings_count: จำนวนครั้งที่อ่าน (default: 5)
    
    Returns:
        float: K-value ที่คำนวณได้
    
    วิธีใช้:
        1. จุ่มเซ็นเซอร์และเครื่องมาตรฐานในน้ำเดียวกัน
        2. อ่านค่าจากเครื่องมาตรฐาน (เช่น 650 ppm)
        3. เรียกฟังก์ชัน: calibrate_sensor(34, 650)
        4. K-value จะถูกตั้งค่าอัตโนมัติ
    
    ตัวอย่าง:
        >>> calibrate_sensor(34, 650)
        กำลังอ่านค่า...
          ครั้งที่ 1: 580.5 ppm
          ครั้งที่ 2: 582.3 ppm
          ...
        K-value = 1.1207
        ตั้งค่า K-value เรียบร้อย!
    """
    print("=" * 50)
    print("🔧 เริ่มต้น Calibration")
    print("=" * 50)
    print(f"ค่ามาตรฐาน: {standard_value:.1f} ppm/µS/cm")
    print(f"จำนวนครั้งที่อ่าน: {readings_count}")
    print()
    
    # ตั้ง K = 1.0 ก่อนอ่านค่า
    original_k = _k_value
    set_kvalue(1.0)
    
    # อ่านค่าหลายครั้ง
    readings = []
    print("📊 กำลังอ่านค่า...")
    for i in range(readings_count):
        val = get_tds_ppm(pin)
        readings.append(val)
        print(f"  ครั้งที่ {i+1}: {val:.1f} ppm")
        time.sleep(2)
    
    # คำนวณค่าเฉลี่ย
    avg_reading = sum(readings) / len(readings)
    
    # คำนวณ K-value
    if avg_reading > 0:
        k_value = standard_value / avg_reading
    else:
        print("\n❌ ข้อผิดพลาด: ไม่สามารถอ่านค่าได้")
        print("   กรุณาตรวจสอบการเชื่อมต่อเซ็นเซอร์")
        set_kvalue(original_k)
        return None
    
    # แสดงผลลัพธ์
    print()
    print("=" * 50)
    print("📈 ผลลัพธ์การ Calibration")
    print("=" * 50)
    print(f"ค่ามาตรฐาน:        {standard_value:.1f} ppm/µS/cm")
    print(f"ค่าเฉลี่ยที่อ่านได้:  {avg_reading:.1f} ppm")
    print(f"K-value ใหม่:       {k_value:.4f}")
    print(f"ความแตกต่าง:       {abs(standard_value - avg_reading):.1f} ppm")
    print(f"ความคลาดเคลื่อน:    {abs(1 - avg_reading/standard_value) * 100:.2f}%")
    print("=" * 50)
    
    # ตั้งค่า K-value ใหม่
    set_kvalue(k_value)
    print(f"\n✅ ตั้งค่า K-value = {k_value:.4f} เรียบร้อย!")
    
    # ทดสอบอ่านค่าใหม่
    print("\n🔍 ทดสอบอ่านค่าหลัง Calibrate...")
    time.sleep(1)
    test_val = get_tds_ppm(pin)
    print(f"   ค่าที่อ่านได้: {test_val:.1f} ppm (ควรใกล้เคียง {standard_value:.1f})")
    
    print("\n" + "=" * 50)
    print("💾 บันทึก K-value นี้เพื่อใช้ต่อไป:")
    print(f"   set_kvalue({k_value:.4f})")
    print("=" * 50)
    
    return k_value

def monitor_continuous(pin, interval=2):
    """Monitor sensor values continuously
    
    Args:
        pin: ADC pin number
        interval: Time between readings in seconds (default: 2)
    
    Press Ctrl+C to stop
    """
    print("=" * 50)
    print("📡 เริ่มการติดตามค่าอย่างต่อเนื่อง")
    print("=" * 50)
    print(f"K-value: {_k_value:.4f}")
    print("กด Ctrl+C เพื่อหยุด")
    print("=" * 50)
    print()
    
    try:
        count = 0
        while True:
            count += 1
            data = read_all_values(pin)
            
            print(f"[{count:04d}] ", end="")
            print(f"TDS: {data['tds_ppm']:7.1f} ppm | ", end="")
            print(f"EC: {data['ec_ms_cm']:5.2f} mS/cm | ", end="")
            print(f"V: {data['voltage']:.3f} V")
            
            time.sleep(interval)
            
    except KeyboardInterrupt:
        print("\n" + "=" * 50)
        print("⏹️  หยุดการติดตามค่า")
        print("=" * 50)

# --- ตัวอย่างการใช้งาน ---
"""
#############################################
# วิธีใช้งาน TDS/EC Sensor
#############################################

import tds_ec_sensor

# --- 1. การใช้งานพื้นฐาน (ก่อน Calibrate) ---
# อ่านค่า TDS
tds = tds_ec_sensor.get_tds_ppm(34)
print(f"TDS: {tds} ppm")

# อ่านค่า EC
ec_ms = tds_ec_sensor.get_ec_mspcm(34)
ec_us = tds_ec_sensor.get_ec_uspcm(34)
print(f"EC: {ec_ms} mS/cm หรือ {ec_us} µS/cm")

# แสดงค่าทั้งหมดพร้อมหน่วย
tds_ec_sensor.print_readings(34)


# --- 2. การ Calibrate (แนะนำ!) ---
# วิธีที่ 1: ใช้สารละลายมาตรฐาน (EC 1413 µS/cm)
tds_ec_sensor.calibrate_sensor(34, 1413)

# วิธีที่ 2: ใช้เครื่องสำเร็จรูปเทียบ
# - จุ่มทั้งเซ็นเซอร์และเครื่องมาตรฐานในน้ำเดียวกัน
# - สมมติเครื่องแสดง 650 ppm
tds_ec_sensor.calibrate_sensor(34, 650)

# ตั้งค่า K-value ด้วยตนเอง
tds_ec_sensor.set_kvalue(1.1207)


# --- 3. การใช้งานหลัง Calibrate ---
# อ่านค่า (จะแม่นยำตาม K-value ที่ตั้งไว้)
tds_ec_sensor.print_readings(34)

# อ่านค่าเป็น Dictionary
data = tds_ec_sensor.read_all_values(34)
print(data)
# {'voltage': 1.523, 'tds_ppm': 652.3, 'ec_ms_cm': 1.30, 'ec_us_cm': 1304.0, 'k_value': 1.1207}


# --- 4. ติดตามค่าอย่างต่อเนื่อง ---
# อ่านค่าทุก 2 วินาที (กด Ctrl+C เพื่อหยุด)
tds_ec_sensor.monitor_continuous(34, interval=2)


# --- 5. ดูค่า K-value ปัจจุบัน ---
k = tds_ec_sensor.get_kvalue()
print(f"K-value ปัจจุบัน: {k}")


#############################################
# ตัวอย่างการใช้งานจริง - ระบบไฮโดรโปนิกส์
#############################################

import tds_ec_sensor
import time

# ตั้งค่า K-value ที่ได้จาก Calibrate
tds_ec_sensor.set_kvalue(1.1207)

# Loop ตรวจสอบ EC ทุก 30 นาที
while True:
    data = tds_ec_sensor.read_all_values(34)
    ec = data['ec_ms_cm']
    
    print(f"EC: {ec} mS/cm")
    
    # ตรวจสอบค่า EC (เหมาะสำหรับผักสลัด: 1.2-2.0 mS/cm)
    if ec < 1.2:
        print("⚠️ EC ต่ำเกินไป - เพิ่มปุ๋ย")
    elif ec > 2.0:
        print("⚠️ EC สูงเกินไป - เติมน้ำเจือจาง")
    else:
        print("✅ EC อยู่ในช่วงที่เหมาะสม")
    
    time.sleep(1800)  # รอ 30 นาที


#############################################
# Tips & Best Practices
#############################################

1. Calibrate ทุก 1-2 เดือน หรือเมื่อเปลี่ยนเซ็นเซอร์ใหม่
2. ทำความสะอาดเซ็นเซอร์เป็นประจำด้วยน้ำกลั่น
3. เก็บเซ็นเซอร์ในน้ำกลั่นเมื่อไม่ใช้งาน (อย่าปล่อยให้แห้ง)
4. สำหรับไฮโดรโปนิกส์ ใช้ EC (mS/cm) จะเหมาะกว่า TDS (ppm)
5. ค่า K-value ปกติอยู่ระหว่าง 0.8-1.3

"""