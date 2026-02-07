({
    name: "EC Sensor",
    description: "EC (Electrical Conductivity) Sensor for water quality measurement",
    author: "Your Name",
    category: "Sensor",
    version: "1.0.0",
    icon: "/static/icon.png",
    color: "#2C97DE",
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
    ]
});
