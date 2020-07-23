// The model of chat history

const mongoose = require('mongoose')

const chatHistory = new mongoose.Schema({
    created_at: {
        type: String
    },
    messages: {
        type: Array
    }
});

module.exports = ChatHistory = mongoose.model('ChatHistory', chatHistory)