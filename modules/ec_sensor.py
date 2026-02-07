import machine
import time

tds_offset = 0.0
temperature = 25.0
kvalue = 1.0  # K value สำหรับ TDS sensor (ปรับได้)

def read_voltage(pin):
    """อ่านค่าแรงดันจาก TDS sensor"""
    try:
        adc = machine.ADC(machine.Pin(pin))
        adc.atten(machine.ADC.ATTN_11DB)
        adc.width(machine.ADC.WIDTH_12BIT)
        
        # อ่านค่า 40 ครั้ง
        sum_val = 0
        for i in range(40):
            sum_val += adc.read()
            time.sleep_ms(1)
        
        adc_val = sum_val / 40.0
        voltage = (adc_val * 3.3) / 4095.0
        return voltage
    except Exception as e:
        print("TDS voltage read error:", e)
        return -1.0

def read_tds_ppm(pin, temp=None):
    """อ่านค่า TDS (ppm) พร้อม temperature compensation"""
    try:
        global temperature
        
        if temp is None:
            temp = temperature
        
        voltage = read_voltage(pin)
        
        if voltage < 0:
            return -1.0
        
        # Temperature compensation
        compensation_coefficient = 1.0 + 0.02 * (temp - 25.0)
        compensated_voltage = voltage / compensation_coefficient
        
        # สูตร TDS Sensor: TDS = (133.42 * V³ - 255.86 * V² + 857.39 * V) * 0.5 * K
        # หรือแบบง่าย: TDS = (133.42 * compensated_voltage³ - 255.86 * compensated_voltage² + 857.39 * compensated_voltage) * 0.5
        tds_value = (133.42 * compensated_voltage * compensated_voltage * compensated_voltage 
                     - 255.86 * compensated_voltage * compensated_voltage 
                     + 857.39 * compensated_voltage) * 0.5 * kvalue
        
        tds_value = tds_value + tds_offset
        
        if tds_value < 0:
            tds_value = 0
        if tds_value > 9999:
            tds_value = 9999
        
        return round(tds_value, 0)
    except Exception as e:
        print("TDS read error:", e)
        return -1.0

def read_ec_us(pin, temp=None):
    """อ่านค่า EC (µS/cm) จาก TDS"""
    try:
        tds = read_tds_ppm(pin, temp)
        
        if tds < 0:
            return -1.0
        
        # แปลง TDS (ppm) เป็น EC (µS/cm)
        # EC (µS/cm) = TDS (ppm) / 0.5
        ec_us = tds / 0.5
        
        return round(ec_us, 0)
    except Exception as e:
        print("EC read error:", e)
        return -1.0

def read_ec_ms(pin, temp=None):
    """อ่านค่า EC (mS/cm)"""
    try:
        ec_us = read_ec_us(pin, temp)
        
        if ec_us < 0:
            return -1.0
        
        return round(ec_us / 1000.0, 2)
    except Exception as e:
        return -1.0

def read_value(pin):
    """backward compatibility - คืนค่า TDS (ppm)"""
    return read_tds_ppm(pin)

def set_offset(offset):
    """ตั้งค่า offset (ppm)"""
    global tds_offset
    tds_offset = offset

def set_temperature(temp):
    """ตั้งค่าอุณหภูมิอ้างอิง (°C)"""
    global temperature
    if temp >= 0 and temp <= 80:
        temperature = temp
        return True
    return False

def set_kvalue(k):
    """ตั้งค่า K value (0.5-1.5)"""
    global kvalue
    if k >= 0.5 and k <= 1.5:
        kvalue = k
        return True
    return False

def calibrate_solution(pin, known_tds_ppm):
    """Calibrate ด้วยสารละลายที่ทราบค่า TDS
    
    Args:
        pin: GPIO pin
        known_tds_ppm: ค่า TDS ที่ถูกต้อง (ppm)
    """
    global tds_offset
    
    # อ่านค่าหลายครั้ง
    sum_tds = 0
    count = 5
    
    print("Calibrating... Please wait")
    
    for i in range(count):
        tds_offset = 0  # reset offset ก่อนวัด
        measured = read_tds_ppm(pin)
        if measured > 0:
            sum_tds += measured
        time.sleep_ms(500)
    
    avg_measured = sum_tds / count
    
    if avg_measured > 0:
        # คำนวณ offset
        tds_offset = known_tds_ppm - avg_measured
        print("Calibration done!")
        print("Measured avg:", avg_measured, "ppm")
        print("Target:", known_tds_ppm, "ppm")
        print("Offset:", tds_offset, "ppm")
        return True
    else:
        print("Calibration failed")
        return False

def calibrate_kvalue(pin, known_tds_ppm):
    """Calibrate K value"""
    global kvalue, tds_offset
    
    tds_offset = 0
    old_k = kvalue
    
    print("Calibrating K value... Please wait")
    
    # อ่านค่าหลายครั้ง
    sum_tds = 0
    count = 5
    
    for i in range(count):
        measured = read_tds_ppm(pin)
        if measured > 0:
            sum_tds += measured
        time.sleep_ms(500)
    
    avg_measured = sum_tds / count
    
    if avg_measured > 0:
        # คำนวณ K value ใหม่
        kvalue = old_k * (known_tds_ppm / avg_measured)
        
        # จำกัดค่า K
        if kvalue < 0.5:
            kvalue = 0.5
        if kvalue > 1.5:
            kvalue = 1.5
        
        print("K value calibration done!")
        print("Old K:", old_k)
        print("New K:", round(kvalue, 3))
        return True
    else:
        print("K calibration failed")
        kvalue = old_k
        return False