"""
DFRobot Gravity: Analog TDS Sensor/Meter for MicroPython
Simplified version - No temperature sensor required

Based on: https://www.dfrobot.com/wiki/index.php/Gravity:_Analog_TDS_Sensor_/_Meter_For_Arduino_SKU:_SEN0244

ไม่ต้องใช้ Temperature Sensor - ใช้อุณหภูมิคงที่ 25°C
เหมาะสำหรับ:
- ระบบในร่มที่อุณหภูมิคงที่
- งานทั่วไปที่ไม่ต้องการความแม่นยำสูงมาก
- ต้องการความง่ายในการติดตั้ง

Ported to MicroPython by Cap_Apiluk
GNU Lesser General Public License.
"""

import machine
import time
import json

class GravityTDS:
    """
    DFRobot Gravity TDS Sensor Class (Simplified - No Temp Sensor)
    
    Features:
    - Median filtering for stable readings
    - NO temperature sensor required (fixed at 25°C)
    - Auto-save calibration to file
    - Simple calibration with standard solution
    """
    
    # Constants
    SCOUNT = 30  # Sample count for median filter
    FIXED_TEMPERATURE = 25.0  # ใช้อุณหภูมิคงที่
    
    def __init__(self):
        """Initialize TDS sensor"""
        self._pin = None
        self._adc = None
        self._aref = 3.3  # ESP32 voltage
        self._adc_range = 4095  # ESP32 12-bit
        self._k_value = 1.0  # Calibration factor
        
        # TDS/EC values
        self._tds_value = 0.0
        self._ec_value = 0.0
        
        # Calibration file
        self._cal_file = "/tds_calibration.json"
        
    def set_pin(self, pin):
        """Set ADC pin number
        
        Args:
            pin: GPIO pin number (ADC capable: 32-39 for ESP32)
        """
        self._pin = pin
        self._adc = machine.ADC(machine.Pin(pin))
        self._adc.atten(machine.ADC.ATTN_11DB)  # 0-3.3V range
        self._adc.width(machine.ADC.WIDTH_12BIT)
        
    def begin(self):
        """Initialize sensor and load calibration"""
        if self._adc is None:
            raise ValueError("Please call set_pin() before begin()")
        
        # Load calibration
        self._load_calibration()
        print("GravityTDS Sensor Ready")
        print(f"Pin: GPIO {self._pin}")
        print(f"Temperature: {self.FIXED_TEMPERATURE}C (Fixed)")
        print(f"K-value: {self._k_value:.4f}")
        
    def _get_median_num(self, arr):
        """Get median value using bubble sort
        
        Args:
            arr: Array of values
            
        Returns:
            int: Median value
        """
        temp = arr.copy()
        n = len(temp)
        
        # Bubble sort
        for j in range(n - 1):
            for i in range(n - j - 1):
                if temp[i] > temp[i + 1]:
                    temp[i], temp[i + 1] = temp[i + 1], temp[i]
        
        # Return median
        if (n & 1) > 0:
            return temp[(n - 1) // 2]
        else:
            return (temp[n // 2] + temp[n // 2 - 1]) // 2
    
    def update(self):
        """Sample ADC and calculate TDS value
        
        Call this before getting TDS/EC values
        """
        if self._adc is None:
            raise ValueError("Sensor not initialized. Call begin() first.")
        
        # Collect samples
        samples = []
        for _ in range(self.SCOUNT):
            samples.append(self._adc.read())
            time.sleep_ms(2)
        
        # Get median value
        analog_average = self._get_median_num(samples)
        
        # Convert to voltage
        average_voltage = analog_average * self._aref / self._adc_range
        
        # Temperature compensation at 25°C (coefficient = 1.0, no change)
        compensation_coefficient = 1.0 + 0.02 * (self.FIXED_TEMPERATURE - 25.0)
        compensation_voltage = average_voltage / compensation_coefficient
        
        # Convert voltage to TDS using cubic regression
        # Formula: (133.42*V^3 - 255.86*V^2 + 857.39*V) * 0.5
        self._tds_value = (133.42 * compensation_voltage**3 - 
                          255.86 * compensation_voltage**2 + 
                          857.39 * compensation_voltage) * 0.5
        
        # Apply K-value calibration
        self._tds_value = self._tds_value * self._k_value
        
        # Calculate EC (mS/cm)
        self._ec_value = self._tds_value / 500.0
        
    def get_tds_value(self):
        """Get TDS value in ppm
        
        Returns:
            float: TDS in ppm
        """
        return round(self._tds_value, 1)
    
    def get_ec_value(self):
        """Get EC value in mS/cm
        
        Returns:
            float: EC in mS/cm
        """
        return round(self._ec_value, 2)
    
    def get_ec_value_us(self):
        """Get EC value in µS/cm
        
        Returns:
            float: EC in µS/cm
        """
        return round(self._ec_value * 1000.0, 0)
    
    def calibrate(self, standard_value):
        """Calibrate with known TDS value
        
        Args:
            standard_value: Known TDS value in ppm (e.g., 707)
        
        Example:
            sensor.calibrate(707)  # Standard solution
        """
        print("=" * 50)
        print("Starting Calibration")
        print("=" * 50)
        print(f"Standard value: {standard_value} ppm")
        print("Make sure sensor is in the standard solution!")
        print()
        
        # Take multiple readings
        print("Taking readings...")
        readings = []
        
        # Temporarily set K to 1.0
        temp_k = self._k_value
        self._k_value = 1.0
        
        for i in range(5):
            self.update()
            value = self.get_tds_value()
            readings.append(value)
            print(f"  Reading {i+1}/5: {value:.1f} ppm")
            time.sleep(2)
        
        # Calculate average
        avg_reading = sum(readings) / len(readings)
        
        # Calculate new K-value
        if avg_reading > 0:
            new_k = standard_value / avg_reading
            self._k_value = new_k
            self._save_calibration()
            
            print()
            print("=" * 50)
            print("Calibration Complete!")
            print("=" * 50)
            print(f"Average reading:  {avg_reading:.1f} ppm")
            print(f"Standard value:   {standard_value:.1f} ppm")
            print(f"New K-value:      {new_k:.4f}")
            print(f"Error:            {abs(standard_value - avg_reading):.1f} ppm")
            print("=" * 50)
            
            # Test reading
            print("\nTesting calibrated reading...")
            time.sleep(1)
            self.update()
            test = self.get_tds_value()
            print(f"Test reading: {test:.1f} ppm (should be ~{standard_value:.0f})")
            
            return new_k
        else:
            print("\nError: Cannot read sensor!")
            print("Please check connections.")
            self._k_value = temp_k
            return None
    
    def set_k_value(self, k):
        """Set K-value manually
        
        Args:
            k: Calibration factor
        """
        self._k_value = float(k)
        self._save_calibration()
        print(f"K-value set to: {self._k_value:.4f}")
        
    def get_k_value(self):
        """Get current K-value
        
        Returns:
            float: Current K-value
        """
        return self._k_value
    
    def _save_calibration(self):
        """Save calibration to file"""
        try:
            data = {
                'k_value': self._k_value,
                'calibrated_at': time.time()
            }
            with open(self._cal_file, 'w') as f:
                json.dump(data, f)
        except Exception as e:
            print(f"Warning: Could not save calibration: {e}")
    
    def _load_calibration(self):
        """Load calibration from file"""
        try:
            with open(self._cal_file, 'r') as f:
                data = json.load(f)
                self._k_value = data.get('k_value', 1.0)
        except:
            self._k_value = 1.0
    
    def reset_calibration(self):
        """Reset K-value to 1.0"""
        self._k_value = 1.0
        self._save_calibration()
        print("Calibration reset to K=1.0")
    
    def print_info(self):
        """Print all sensor information"""
        print("=" * 50)
        print("TDS/EC Sensor Readings")
        print("=" * 50)
        print(f"Pin:              GPIO {self._pin}")
        print(f"Temperature:      {self.FIXED_TEMPERATURE}C (Fixed)")
        print(f"K-value:          {self._k_value:.4f}")
        print(f"TDS:              {self._tds_value:.1f} ppm")
        print(f"EC:               {self._ec_value:.2f} mS/cm")
        print(f"EC:               {self._ec_value * 1000:.0f} uS/cm")
        print("=" * 50)


# ========================================
# Simplified API Functions
# ========================================

_sensor = None

def init(pin=34):
    """Initialize TDS sensor
    
    Args:
        pin: ADC pin number (default: 34)
        
    Returns:
        GravityTDS: Sensor object
    """
    global _sensor
    _sensor = GravityTDS()
    _sensor.set_pin(pin)
    _sensor.begin()
    return _sensor

def get_tds_ppm(pin):
    """Get TDS value in ppm
    
    Args:
        pin: ADC pin number
        
    Returns:
        float: TDS in ppm
    """
    global _sensor
    if _sensor is None or _sensor._pin != pin:
        init(pin)
    
    _sensor.update()
    return _sensor.get_tds_value()

def get_ec_mspcm(pin):
    """Get EC value in mS/cm
    
    Args:
        pin: ADC pin number
        
    Returns:
        float: EC in mS/cm
    """
    global _sensor
    if _sensor is None or _sensor._pin != pin:
        init(pin)
    
    _sensor.update()
    return _sensor.get_ec_value()

def get_ec_uspcm(pin):
    """Get EC value in µS/cm
    
    Args:
        pin: ADC pin number
        
    Returns:
        float: EC in µS/cm
    """
    global _sensor
    if _sensor is None or _sensor._pin != pin:
        init(pin)
    
    _sensor.update()
    return _sensor.get_ec_value_us()

def set_kvalue(k):
    """Set K-value
    
    Args:
        k: Calibration factor
    """
    global _sensor
    if _sensor is None:
        init()
    _sensor.set_k_value(k)

def get_kvalue():
    """Get current K-value
    
    Returns:
        float: K-value
    """
    global _sensor
    if _sensor is None:
        init()
    return _sensor.get_k_value()

def calibrate_sensor(pin, standard_value):
    """Calibrate sensor
    
    Args:
        pin: ADC pin number
        standard_value: Known TDS value in ppm (e.g., 707)
    
    Returns:
        float: New K-value
    """
    global _sensor
    if _sensor is None or _sensor._pin != pin:
        init(pin)
    
    return _sensor.calibrate(standard_value)

def print_readings(pin):
    """Print all sensor readings
    
    Args:
        pin: ADC pin number
    """
    global _sensor
    if _sensor is None or _sensor._pin != pin:
        init(pin)
    
    _sensor.update()
    _sensor.print_info()

def read_all_values(pin):
    """Read all sensor values as dictionary
    
    Args:
        pin: ADC pin number
        
    Returns:
        dict: All sensor values
    """
    global _sensor
    if _sensor is None or _sensor._pin != pin:
        init(pin)
    
    _sensor.update()
    
    return {
        'tds_ppm': _sensor.get_tds_value(),
        'ec_ms_cm': _sensor.get_ec_value(),
        'ec_us_cm': _sensor.get_ec_value_us(),
        'k_value': _sensor.get_k_value()
    }