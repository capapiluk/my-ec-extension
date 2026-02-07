import machine
import time

# ตัวแปรเริ่มต้น
tds_offset = 0.0
temperature = 25.0
kvalue = 1.0 

def read_voltage(pin):
    """อ่านค่าแรงดันแบบเฉลี่ย 40 ครั้งเพื่อความนิ่ง"""
    try:
        adc = machine.ADC(machine.Pin(pin))
        adc.atten(machine.ADC.ATTN_11DB)
        adc.width(machine.ADC.WIDTH_12BIT)
        
        sum_val = 0
        for i in range(40):
            sum_val += adc.read()
            time.sleep_ms(1)
        
        adc_val = sum_val / 40.0
        voltage = (adc_val * 3.3) / 4095.0
        return voltage
    except Exception as e:
        return -1.0

def read_tds_ppm(pin, temp=None):
    """อ่านค่า TDS (ppm) พร้อมชดเชยอุณหภูมิ"""
    try:
        global temperature
        if temp is None:
            temp = temperature
        
        voltage = read_voltage(pin)
        if voltage <= 0: return 0.0
        
        # Temperature compensation (สำคัญมากเพื่อให้ค่าตรงกับ AR8011 ในน้ำที่อุณหภูมิต่างกัน)
        compensation_coefficient = 1.0 + 0.02 * (temp - 25.0)
        v_comp = voltage / compensation_coefficient
        
        # สูตร Polynomial สำหรับเซนเซอร์ TDS ยอดนิยม
        tds_value = (133.42 * v_comp**3 - 255.86 * v_comp**2 + 857.39 * v_comp) * 0.5 * kvalue
        tds_value += tds_offset
        
        return round(max(0, min(tds_value, 9999)), 0)
    except:
        return -1.0

def get_ms(pin, temp=None):
    """อ่านค่า EC หน่วย mS/cm (นิยมใช้ในปลูกผัก)"""
    tds = read_tds_ppm(pin, temp)
    if tds < 0: return -1.0
    # สูตรแปลง: EC (mS/cm) = (TDS / 0.5) / 1000
    return round((tds / 0.5) / 1000.0, 2)

def read_value(pin):
    """ฟังก์ชันมาตรฐานสำหรับ MicroBlock"""
    return read_tds_ppm(pin)

def set_offset(offset):
    global tds_offset
    tds_offset = offset

def set_kvalue(k):
    global kvalue
    if 0.5 <= k <= 1.5:
        kvalue = k
        return True
    return False

def set_temperature(temp):
    global temperature
    temperature = temp

def calibrate_kvalue(pin, known_tds_ppm):
    """ฟังก์ชัน Calibrate หาค่า K อัตโนมัติ"""
    global kvalue, tds_offset
    tds_offset = 0 # ล้างค่าเก่า
    measured = read_tds_ppm(pin)
    if measured > 0:
        kvalue = kvalue * (known_tds_ppm / measured)
        kvalue = max(0.5, min(kvalue, 1.5))
        return True
    return False