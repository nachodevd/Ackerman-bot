import mongoose from "mongoose"

const Level = new mongoose.Schema({
    Guild: String,
    LevelChannel: String,
    ImageURL: String,
    XP: Number,
    Level: Number
})

export = mongoose.model('Level', Level);