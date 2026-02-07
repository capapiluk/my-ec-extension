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
        for i in range(10):
            raw = adc.read()
            print("Raw ADC:", raw)  # debug
            sum_val += raw
            time.sleep_ms(2)
        
        adc_val = sum_val / 10.0
        voltage = (adc_val * 3.3) / 4095.0
        print("Average ADC:", adc_val, "Voltage:", voltage)  # debug
        return voltage
    except Exception as e:
        print("EC voltage read error:", e)
        return -1.0

def read_value(pin):
    """อ่านค่า EC (mS/cm)"""
    try:
        voltage = read_voltage(pin)
        print("Voltage for EC calc:", voltage)  # debug
        
        if voltage < 0.1:
            print("Voltage too low!")  # debug
            return -1.0
        
        # สูตร Gravity EC (DFRobot)
        ec = (133.42 * voltage * voltage * voltage - 255.86 * voltage * voltage + 857.39 * voltage) * 0.001
        print("Calculated EC:", ec)  # debug
        
        ec = ec + ec_offset
        
        if ec < 0:
            ec = 0
        if ec > 10:
            ec = 10
        
        return ec
    except Exception as e:
        print("EC read error:", e)
        return -1.0

def set_offset(offset):
    """ตั้งค่า offset สำหรับ calibrate"""
    global ec_offset
    ec_offset = offset
