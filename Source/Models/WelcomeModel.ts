import mongoose from "mongoose"

const Welcome = new mongoose.Schema({
    Guild: String,
    WelcomeChannel: String,
    ImageURL: String,
    Description: String
})

export = mongoose.model('Welcome', Welcome);