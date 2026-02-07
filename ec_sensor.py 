import machine
import time

ec_offset = 0.0

def read_voltage(pin):
    """อ่านค่าแรงดันจาก EC sensor"""
    try:
        adc = machine.ADC(machine.Pin(pin))
        adc.atten(machine.ADC.ATTN_11DB)
        adc.width(machine.ADC.WIDTH_12BIT)
        
        sum_val = 0
        for _ in range(10):
            sum_val += adc.read()
            time.sleep_ms(2)
        
        adc_val = sum_val / 10.0
        voltage = (adc_val * 3.3) / 4095.0
        return voltage
    except Exception as e:
        print(f"EC voltage read error: {e}")
        return -1.0

def read_value(pin):
    """อ่านค่า EC (mS/cm)"""
    try:
        voltage = read_voltage(pin)
        
        if voltage < 0.1:
            return -1.0
        
        ec = (133.42 * voltage ** 3 
              - 255.86 * voltage ** 2 
              + 857.39 * voltage) * 0.001
        
        ec += ec_offset
        
        if ec < 0:
            ec = 0
        if ec > 10:
            ec = 10
        
        return ec
    except Exception as e:
        print(f"EC read error: {e}")
        return -1.0

def set_offset(offset):
    """ตั้งค่า offset สำหรับ calibrate"""
    global ec_offset
    ec_offset = offset