({
    name: "TDS/EC Pro Sensor",
    description: "High Precision Water Quality Sensor - No Temperature Compensation (Median Filter)",
    author: "Cap_Apiluk",
    category: "Sensor",
    version: "4.0.0",
    icon: "/static/fertilizer.png",
    color: "#27AE60",
    blocks: [
        // Block 1: อ่านค่า TDS (ppm)
        {
            xml: `
                <block type="ec_read_tds_pro">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 2: อ่านค่า EC (mS/cm)
        {
            xml: `
                <block type="ec_read_ms_pro">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 3: อ่านค่า EC (µS/cm)
        {
            xml: `
                <block type="ec_read_us_pro">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 4: ตั้งค่า K-Value
        {
            xml: `
                <block type="ec_set_k_pro">
                    <value name="k">
                        <shadow type="math_number">
                            <field name="NUM">1.0</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 5: Calibrate อัตโนมัติ
        {
            xml: `
                <block type="ec_calibrate_auto">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                    <value name="standard">
                        <shadow type="math_number">
                            <field name="NUM">650</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 6: ดูค่า K-Value ปัจจุบัน
        {
            xml: `
                <block type="ec_get_k_pro"></block>
            `
        },
        // Block 7: อ่านค่าทั้งหมด (Dictionary)
        {
            xml: `
                <block type="ec_read_all_values">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 8: แสดงค่าพร้อมหน่วย
        {
            xml: `
                <block type="ec_print_readings">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                </block>
            `
        }
    ],
    // JavaScript files (Blockly blocks and generators)
    js: [
        "/blocks.js",
        "/generators.js"
    ],
    // Python module
    modules: [
        {
            name: "tds_ec_sensor",
            path: "/modules/tds_ec_sensor.py"
        }
    ]
});