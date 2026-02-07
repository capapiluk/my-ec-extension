const blocks = require("./blocks/blocks");
const generators = require("./blocks/generators");

module.exports = {
    name: "EC Sensor",
    description: "EC (Electrical Conductivity) Sensor for water quality measurement",
    author: "Your Name",
    category: "Sensor",
    version: "1.0.0",
    icon: "/static/icon.png",
    color: "#2C97DE",
    blocks: blocks
};