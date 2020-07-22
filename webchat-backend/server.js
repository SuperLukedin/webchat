var express = require('express')
var app = express()
var http = require("http").Server(app)
const io = require("socket.io")(http)

var bodyParser = require('body-parser')
var cors = require('cors')


app.use(express.static(__dirname + "/public")) // middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())


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
    })
});