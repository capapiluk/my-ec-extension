# ==================================================
# DFRobot Gravity TDS / EC Sensor
# MicroBlock Compatible Version (High Accuracy)
# Temperature fixed at 25°C
# Ported & Simplified by Cap_Apiluk
# ==================================================

from machine import ADC, Pin
import time

# ----------------- CONSTANTS -----------------
SCOUNT = 30              # sample count for median
AREF = 3.3               # ESP32 reference voltage
ADC_RANGE = 4095         # 12-bit ADC
FIXED_TEMP = 25.0        # fixed temperature
K_VALUE = 1.0            # calibration factor

# ----------------- GLOBAL -----------------
_adc = None
_pin = None
_tds = 0.0
_ec = 0.0

# ----------------- INTERNAL -----------------
def _median(arr):
    arr = sorted(arr)
    n = len(arr)
    if n & 1:
        return arr[n // 2]
    return (arr[n // 2] + arr[n // 2 - 1]) // 2

# ----------------- API -----------------

def tds_init(pin):
    """
    เริ่มต้นเซนเซอร์ TDS
    pin = ADC GPIO (32-39)
    """
    global _adc, _pin
    _pin = pin
    _adc = ADC(Pin(pin))
    _adc.atten(ADC.ATTN_11DB)
    _adc.width(ADC.WIDTH_12BIT)

def tds_update():
    """
    อ่านค่าและคำนวณ TDS / EC
    """
    global _tds, _ec

    if _adc is None:
        return

    buf = []
    for i in range(SCOUNT):
        buf.append(_adc.read())
        time.sleep_ms(2)

    analog = _median(buf)
    voltage = analog * AREF / ADC_RANGE

    # DFRobot original formula
    tds = (133.42 * voltage ** 3
           - 255.86 * voltage ** 2
           + 857.39 * voltage) * 0.5

    # apply calibration
    tds = tds * K_VALUE

    _tds = round(tds, 1)
    _ec = round(tds / 500.0, 2)

def get_tds_ppm():
    """
    อ่านค่า TDS (ppm)
    """
    tds_update()
    return _tds

def get_ec_us():
    """
    อ่านค่า EC (µS/cm)
    """
    tds_update()
    return int(_ec * 1000)

def get_ec_ms():
    """
    อ่านค่า EC (mS/cm)
    """
    tds_update()
    return _ec

def set_k_value(k):
    """
    ตั้งค่า K (ปรับเทียบ)
    """
    global K_VALUE
    K_VALUE = float(k)

def get_k_value():
    """
    อ่านค่า K ปัจจุบัน
    """
    return K_VALUE

# ----------------- CALIBRATION HELPERS -----------------

def calculate_k(standard_ppm, measured_ppm):
    """
    คำนวณค่า K จากน้ำมาตรฐาน
    """
    if measured_ppm <= 0:
        return 1.0
    return standard_ppm / measured_ppm

def calibrate_with_standard(standard_ppm):
    """
    คาลิเบรตแบบง่าย (ต้องแช่น้ำมาตรฐานก่อนเรียก)
    """
    global K_VALUE
    tds_update()
    raw = _tds
    if raw > 0:
        K_VALUE = standard_ppm / raw
    return K_VALUE
