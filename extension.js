({
    name: "TDS/EC Sensor ป.6",
    description: "เซนเซอร์วัดคุณภาพน้ำ เหมาะสำหรับนักเรียน ป.6",
    author: "Cap_Apiluk",
    category: "Sensor",
    version: "4.2.0",
    icon: "/static/fertilizer.png",
    color: "#27AE60",
    blocks: [
        // Block 1: อ่านค่า TDS (ppm)
        {
            xml: `
                <block type="ec_read_tds_simple">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 2: อ่านค่า EC (µS/cm) - สำหรับปากกาวัด
        {
            xml: `
                <block type="ec_read_us_simple">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 3: อ่านค่า EC (mS/cm)
        {
            xml: `
                <block type="ec_read_ms_simple">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 4: Calibrate ด้วยปากกาวัด (µS/cm)
        {
            xml: `
                <block type="ec_calibrate_simple">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                    <value name="standard_ec">
                        <shadow type="math_number">
                            <field name="NUM">1300</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        // Block 5: แสดงผลค่าที่วัดได้
        {
            xml: `
                <block type="ec_show_result">
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