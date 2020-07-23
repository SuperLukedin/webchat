<template>
    <div class="board">
        <div class="textarea">
            <div class="message" v-for="message in messages" v-bind:key="message.index">
                <div class="username"> {{ message.username }}:  {{ message.msg }}</div>                
            </div>                        
        </div>
        <form @submit="sendMessage">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Type your text here" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="msg">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="sendMessage" v-bind:disabled="!msg">Send</button>
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
    flex-direction: column;
    justify-content: center;    
}
.textarea {
    border: 1px solid rgb(171, 170, 196);
    height: 600px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}
</style>