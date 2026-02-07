class ECsensor {
    constructor() {
        this.name = "EC Sensor";
        this.description = "EC (Electrical Conductivity) Sensor";
        this.author = "Your Name";
        this.category = "Sensor";
        this.version = "1.0.0";
        this.icon = "/static/icon.png";
        this.tags = ["EC", "Sensor", "Water Quality"];
    }

    getBlocks() {
        return "blocks.js";
    }

    getGenerators() {
        return "generators.js";
    }
}

module.exports = ECsensor;