({
    name: "TDS/EC Pro Sensor",
    description: "High Precision Water Quality Sensor (Median Filter & Temp Compensation)",
    author: "Super Pro Dev",
    category: "Sensor",
    version: "3.5.0",
    icon: "/static/icon.png",
    color: "#2C3E50",
    blocks: [
        {
            xml: `
                <block type="ec_read_ms_pro">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                    <value name="temp">
                        <shadow type="math_number">
                            <field name="NUM">25</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="ec_read_tds_pro">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                    <value name="temp">
                        <shadow type="math_number">
                            <field name="NUM">25</field>
                        </shadow>
                    </value>
                </block>
            `
        },
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
        }
    ],
    // ระบุไฟล์ย่อยที่ต้องการโหลด (ถ้า IDE รองรับการแยกไฟล์)
    // หมายเหตุ: MicroBlock บางเวอร์ชันอาจต้องการให้รวม code ไว้ใน extension.js
    // แต่ถ้าใช้โครงสร้างโฟลเดอร์มาตรฐาน ให้ใส่ไว้ใน list นี้
    js: [
        "/blocks.js",
        "/generators.js"
    ],
    modules: [
        {
            name: "ec_sensor",
            path: "/modules/ec_sensor.py"
        }
    ]
});