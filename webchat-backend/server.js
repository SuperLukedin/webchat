const express = require('express')
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

// server starts
const Port = process.env.Port || 3000
http.listen(Port, () => console.log("server started, listening %s...", Port))

// MongoDB Cloud
const connectDB = require('./DB/Connections')
const ChatHistory = require('./DB/ChatHistory')
connectDB()

// route
app.use('/list', require('./APIs/ListHistory'))

 // socket
let users = []
let messages = []
let index = 0
io.on("connection", (socket) => {
    socket.emit('loggedIn', {
        users: users.map(user => user.username),
        messages: messages
    })
    socket.on('newuser', username => {        
        console.log(`${username} joined in`)
        socket.username = username
        users.push(socket)

        io.emit('userOnline', socket.username)
    })
    socket.on('msg', msg => {
        let message = {
            index: index,
            username: socket.username,
            msg: msg
        } 
        messages.push(message)
        io.emit('msg', message)
        
        index++
    })
    console.log("Socket connection made")

    socket.on('disconnect', () => {        
        io.emit('userLeft', socket.username)
        users.splice(users.indexOf(socket), 1)

        // when no users exist, save the history and clean all the current messages in this socket
        if (users.length === 0 && messages.length !== 0) {
            console.log(messages)
            saveChatHistory(messages)
        }
    })
});

// methods
async function saveChatHistory(messages) {
    let chatHistory = {}

    chatHistory.created_at = constructTime()
    chatHistory.messages = messages
    let chatHistoryModel = new ChatHistory(chatHistory)
    await chatHistoryModel.save()
    messages.length = 0            
    index = 0
}

function constructTime() {
    let date_ = new Date()
    let month = date_.getMonth() + 1
    let day = date_.getDate()
    let hour = date_.getHours()
    let min = date_.getMinutes()
    let sec = date_.getSeconds()
    let date = [month, day].join('/')
    let time = [hour, min, sec].join(':')
    return date + ' ' + time
}