<template>
  <div class="container">
    <div>
      <h1>Chat Area</h1>
      <p> User Name: {{ username }}</p>
      <p> Online: {{ users.length }}</p>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'Webchat',
  data: function() {
    return {
      username: '',
      socket: io('http://localhost:3000'),
      messages: [],
      users: []
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
    }
  },
  mounted () {
    this.username = prompt("Please type your user name", "Customer")
    if (!this.username) {
      this.username = 'Customer'
    }
    this.joinServer()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
