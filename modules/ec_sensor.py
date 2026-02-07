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
            sum_val += raw
            time.sleep_ms(2)
        
        adc_val = sum_val / 10.0
        voltage = (adc_val * 3.3) / 4095.0
        return voltage
    except Exception as e:
        print("EC voltage read error:", e)
        return -1.0

def read_value(pin):
    """อ่านค่า EC (mS/cm) สำหรับ ESP32 3.3V"""
    try:
        voltage = read_voltage(pin)
        
        if voltage < 0.01:
            return -1.0
        
        # สูตรสำหรับ ESP32 (3.3V) - ปรับจาก DFRobot
        # แปลง voltage จาก 3.3V scale ไปเป็น 5V scale
        voltage_5v = voltage * (5.0 / 3.3)
        
        # คำนวณ EC ด้วยสูตร DFRobot (ใช้ voltage ที่ scale แล้ว)
        ec = (133.42 * voltage_5v * voltage_5v * voltage_5v 
              - 255.86 * voltage_5v * voltage_5v 
              + 857.39 * voltage_5v) * 0.001
        
        ec = ec + ec_offset
        
        if ec < 0:
            ec = 0
        if ec > 20:  # เพิ่มขีดจำกัดบน
            ec = 20
        
        return round(ec, 2)  # ปัดเป็น 2 ตำแหน่ง
    except Exception as e:
        print("EC read error:", e)
        return -1.0

def set_offset(offset):
    """ตั้งค่า offset สำหรับ calibrate"""
    global ec_offset
    ec_offset = offset