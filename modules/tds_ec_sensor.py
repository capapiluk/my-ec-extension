# ==================================================
# DFRobot Gravity TDS / EC Sensor
# MicroBlock Compatible Version (High Accuracy)
# Temperature fixed at 25°C
# Auto-init Safe Version
# Ported & Improved by Cap_Apiluk
# ==================================================

from machine import ADC, Pin
import time

# ----------------- CONSTANTS -----------------
SCOUNT = 30              # sample count for median
AREF = 3.3               # ESP32 reference voltage
ADC_RANGE = 4096         # 12-bit ADC (2^12, ตาม DFRobot spec)
FIXED_TEMP = 25.0        # fixed temperature
K_VALUE = 1.0            # calibration factor
DEFAULT_PIN = 34         # default ADC pin

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

def _ensure_init(pin=DEFAULT_PIN):
    global _adc, _pin
    if _adc is None or _pin != pin:
        _pin = pin
        _adc = ADC(Pin(pin))
        _adc.atten(ADC.ATTN_11DB)
        _adc.width(ADC.WIDTH_12BIT)
        time.sleep_ms(300)  # ให้ ADC นิ่ง

# ----------------- API -----------------

def tds_init(pin=DEFAULT_PIN):
    """
    เริ่มต้นเซนเซอร์ TDS (เรียกหรือไม่เรียกก็ได้)
    """
    _ensure_init(pin)

def tds_update(pin=DEFAULT_PIN):
    """
    อ่านค่าและคำนวณ TDS / EC
    """
    global _tds, _ec

    _ensure_init(pin)

    buf = []
    for _ in range(SCOUNT):
        buf.append(_adc.read())
        time.sleep_ms(40)  # DFRobot spec: 40ms between samples

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

# ----------------- READ FUNCTIONS -----------------

def get_tds_ppm(pin=DEFAULT_PIN):
    """
    อ่านค่า TDS (ppm)
    """
    tds_update(pin)
    return _tds

def get_ec_us(pin=DEFAULT_PIN):
    """
    อ่านค่า EC (µS/cm)
    """
    tds_update(pin)
    return int(_ec * 1000)

def get_ec_ms(pin=DEFAULT_PIN):
    """
    อ่านค่า EC (mS/cm)
    """
    tds_update(pin)
    return _ec

# ----------------- CALIBRATION -----------------

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

def calculate_k(standard_ppm, measured_ppm):
    """
    คำนวณค่า K จากน้ำมาตรฐาน
    """
    if measured_ppm <= 0:
        return 1.0
    return standard_ppm / measured_ppm

def calibrate_with_standard(pin, standard_ppm):
    """
    Calibrate แบบง่าย (แช่น้ำมาตรฐานก่อน)
    """
    global K_VALUE
    tds_update(pin)
    raw = _tds
    if raw > 0:
        K_VALUE = standard_ppm / raw
    return K_VALUE

def calibrate_with_ec_us(pin, standard_ec_us):
    """
    Calibrate ด้วยค่า EC (µS/cm) - สำหรับปากกาวัดที่แสดง µS/cm
    """
    global K_VALUE
    tds_update(pin)
    
    # แปลง µS/cm เป็น ppm (ใช้สูตร ppm = µS/cm × 0.5)
    standard_ppm = standard_ec_us * 0.5
    raw = _tds
    
    if raw > 0:
        K_VALUE = standard_ppm / raw
    return K_VALUE

# ----------------- DEBUG -----------------

def read_all(pin=DEFAULT_PIN):
    """
    อ่านค่าทั้งหมด (ใช้ debug)
    """
    tds_update(pin)
    return {
        "pin": _pin,
        "tds_ppm": _tds,
        "ec_ms": _ec,
        "ec_us": int(_ec * 1000),
        "k_value": K_VALUE
    }

def print_readings(pin=DEFAULT_PIN):
    """
    แสดงผลค่าที่อ่านได้แบบสวยงาม (เหมาะสำหรับนักเรียน ป.6)
    """
    tds_update(pin)
    print("=" * 40)
    print("🌱 เซนเซอร์วัดคุณภาพน้ำ (ขา {})".format(_pin))
    print("=" * 40)
    print("💧 TDS (ความเค็ม): {:.1f} ppm".format(_tds))
    print("⚡ EC (ไฟฟ้า): {:.2f} mS/cm".format(_ec))
    print("🔬 EC (ไฟฟ้า): {} µS/cm".format(int(_ec * 1000)))
    print("🎯 K-Value: {:.2f}".format(K_VALUE))
    print("=" * 40)
