<template>
    <div class="board">
        <div class="textarea">
            <div class="textline" v-for="message in messages" v-bind:key="message.index">
                <div class="textline-username"> {{ message.username }}:</div>
                <div class="textline-msg">{{ message.msg }}</div>                
            </div>                        
        </div>
        <form @submit.prevent="sendMessage">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Type your text here" v-model="msg">
                <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" id="button-addon2" @click="sendMessage" v-bind:disabled="!msg">Send</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'board',
    props: ['messages'],
    data: function () {
        return {
            msg: "",
        }
    },
    methods: {
        sendMessage: function () {
            if (!this.msg) {
                alert('Please enter a message')
                return
            }
            this.$emit('sendMessage', this.msg)
            this.msg = ""
        }
    }
}
</script>
<style scoped>
.board {
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;    
}
.textarea {
    background-color: rgba(144, 163, 163, 0.61);
    border: 2px solid rgb(171, 170, 196);
    height: 600px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    
}
.textline {
    display: flex;
}
.textline-username {
    flex-basis: 15%;
    color: rgb(245, 241, 237);
    font-size: large;
}
.textline-msg {
    max-width: 90%;
    word-wrap: break-word;
    color: rgb(245, 241, 237);
    font-size: large;
}
</style>