import mongoose from "mongoose"

const warn = new mongoose.Schema({
    User: String,
    Guild: String,
    Warns: Number,
})

export = mongoose.model('warn', warn);