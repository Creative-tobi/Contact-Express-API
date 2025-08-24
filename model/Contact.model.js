const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    phone: {type: Number, require: true},
    createdAt: {type: Date, default: new Date().toISOString() },
    updatedAt: {type: Date, default: null}
})

module.exports = mongoose.model("Contact", contactSchema);