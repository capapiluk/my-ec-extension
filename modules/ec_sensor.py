import machine
import time

# --- Global Config ---
_k_value = 1.0       # ค่า Calibrate
_adc_pin = None
_adc_res = 4095.0    # ESP32 12-bit Resolution
_v_ref = 3.3         # System Voltage

def _init_pin(pin_num):
    global _adc_pin
    if _adc_pin is None:
        _adc_pin = machine.ADC(machine.Pin(pin_num))
        _adc_pin.atten(machine.ADC.ATTN_11DB) # 0-3.3V range
        _adc_pin.width(machine.ADC.WIDTH_12BIT)

def set_kvalue(k):
    global _k_value
    _k_value = float(k)

def read_stable_voltage(pin_num):
    """Super Pro Reading: Sampling + Sorting + Median Filtering"""
    _init_pin(pin_num)
    
    samples = []
    # 1. Sampling: อ่านค่า 30 ครั้งรวด
    for _ in range(30):
        samples.append(_adc_pin.read())
        time.sleep_ms(2)
    
    # 2. Sorting & Filtering: เรียงลำดับและตัดค่าขอบ (Noise) ทิ้ง
    samples.sort()
    valid_samples = samples[10:-10] # เอาเฉพาะ 10 ค่าตรงกลาง
    
    if not valid_samples: return 0.0
    
    # 3. Averaging
    avg_raw = sum(valid_samples) / len(valid_samples)
    return (avg_raw / _adc_res) * _v_ref

def get_tds_ppm(pin, temp=25):
    """Calculate TDS with Temperature Compensation"""
    voltage = read_stable_voltage(pin)
    if voltage < 0.05: return 0.0 # ตัดค่ารบกวนตอนไม่ได้จุ่มน้ำ
    
    # Temperature Compensation Formula
    # สูตร: ค่าจะเปลี่ยนประมาณ 2% ต่อองศา
    temp_coefficient = 1.0 + 0.02 * (temp - 25.0)
    v_comp = voltage / temp_coefficient
    
    # Cubic Regression (แม่นยำกว่า Linear)
    tds = (133.42 * v_comp**3 - 255.86 * v_comp**2 + 857.39 * v_comp) * 0.5
    
    # Apply Calibration K
    return round(tds * _k_value, 0)

def get_ec_ms(pin, temp=25):
    """Calculate EC (mS/cm) for Hydroponics"""
    # Standard: 1 mS/cm = 500 ppm (0.5 Factor)
    tds = get_tds_ppm(pin, temp)
    ec = (tds * 2) / 1000.0
    return round(ec, 2)