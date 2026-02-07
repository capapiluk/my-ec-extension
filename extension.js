({
    name: "EC Sensor",
    description: "อ่านค่า EC จาก Gravity EC / TDS Sensor (ไม่ชดเชยอุณหภูมิ)",
    author: "cap_apiluk",
    category: "Sensors",
    version: "1.0.0",
    icon: "/static/icon.png",
    color: "#2ecc71",
    blocks: [
        {
            xml: `
                <block type="ec_read_value">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="ec_read_voltage">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="ec_set_offset">
                    <value name="offset">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                </block>
            `
        }
    ],
    chip: [
        "ESP32",
        "Arduino"
    ]
});
