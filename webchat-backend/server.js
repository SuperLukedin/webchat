var express = require('express')
var app = express()
var http = require("http").Server(app)
const io = require("socket.io")(http)

var bodyParser = require('body-parser')
var cors = require('cors')
const connectDB = require('./DB/Connections')
const ChatHistory = require('./DB/ChatHistory')


app.use(express.static(__dirname + "/public")) // middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

connectDB()

let users = []
let messages = []
let index = 0


const Port = process.env.Port || 3000
http.listen(Port, () => console.log("server started, listening %s...", Port))


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
        console.log(`${socket.username} has disconnected`)
        io.emit('userLeft', socket.username)
        users.splice(users.indexOf(socket), 1)
        
        if (users.length === 0) {
            console.log(messages)

            // when no users exist, save the history and clean all the current messages in this socket
            let chatHistory = {}
            chatHistory.created_at = new Date().toString()
            chatHistory.messages = messages
            let chatHistoryModel = new ChatHistory(chatHistory)
            chatHistoryModel.save()
            messages.length = 0            
            index = 0
        }
    })
});