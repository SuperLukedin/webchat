const express = require('express')
const mongoose = require('mongoose')
const ChatHistory = require('../DB/ChatHistory')
const router = express.Router()

router.get('/', (req, res) => {    
    ChatHistory.find({}, (err, chatHistories) => {
        if (err) {
            res.send(err)
        } else {
            res.json(chatHistories)
        }
    })    
})

module.exports = router