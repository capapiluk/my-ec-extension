({
    name: "TDS/EC Sensor",
    description: "TDS/EC Sensor for water quality measurement (TDS Sensor compatible)",
    author: "Your Name",
    category: "Sensor",
    version: "2.0.0",
    icon: "/static/icon.png",
    color: "#2C97DE",
    blocks: [
        {
            xml: `
                <block type="ec_read_tds">
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
                <block type="ec_read_us">
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
                <block type="ec_read_us_with_temp">
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
                <block type="ec_set_temperature">
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
                <block type="ec_set_kvalue">
                    <value name="kvalue">
                        <shadow type="math_number">
                            <field name="NUM">1.0</field>
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
        },
        {
            xml: `
                <block type="ec_calibrate">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                    <value name="known_value">
                        <shadow type="math_number">
                            <field name="NUM">707</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="ec_calibrate_kvalue">
                    <value name="pin">
                        <shadow type="math_number">
                            <field name="NUM">34</field>
                        </shadow>
                    </value>
                    <value name="known_value">
                        <shadow type="math_number">
                            <field name="NUM">707</field>
                        </shadow>
                    </value>
                </block>
            `
        }
    ],
    modules: [
        {
            name: "ec_sensor",
            path: "/modules/ec_sensor.py"
        }
    ]
});