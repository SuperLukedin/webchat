<template>
  <div class="container">
    <div v-if="!this.isAdmin">
      <h1>Web Chat</h1>
      <p> Your User Name: {{ username }}</p>
      <p> Current Online: {{ users.length }}</p>
    </div>
    <AdminBoard v-else-if="this.isAdmin"/>
    <Board v-if="!this.isAdmin" :messages="messages" @sendMessage="this.sendMessage"/>
  </div>
</template>

<script>
import io from 'socket.io-client'
import Board from './board'
import AdminBoard from './admin/adminBoard'

export default {
  name: 'Webchat',
  components: { 
    Board,
    AdminBoard
  },
  data: function() {
    return {
      username: '',
      socket: io('http://localhost:3000'),
      messages: [],
      users: [],
      isAdmin: false
    }
  },
  methods: {
    joinServer: function() {
      this.socket.on('loggedIn', data => {
        this.messages = data.messages
        this.users = data.users
        this.socket.emit('newuser', this.username)
      })
      this.listen()
    },
    listen: function () {
      this.socket.on('userOnline', user => {
        this.users.push(user)
      })
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1)
      })
      this.socket.on('msg', message => {
        this.messages.push(message)
      })
    },
    sendMessage: function (message) {
      this.socket.emit('msg', message)
    }
  },
  mounted () {
    this.username = prompt("Please type your user name", "Customer")
    if (this.username == 'admin') {
      this.isAdmin = true
    } else {
      if (!this.username) {
        this.username = 'Customer'
      }
      this.joinServer()
    }
  }
}
</script>

<style scoped>
</style>
