<template>
    <div>
        <h1> Admin Dashboard </h1>
        <div class="adminBoards">
            <div v-for="history in chatHistories" :key="history._id">
                <ChatHistoryBoard :history="history" />
            </div>
        </div>        
    </div>
</template>

<script>
import ChatHistoryBoard from './chatHistoryBoard'
export default {
    name: 'adminBoard',
    components: {
        ChatHistoryBoard
    },
    data: function () {
        return {
            chatHistories: []
        }
    },
    mounted () {
        this.fetchHistories()
    },
    methods: {
        fetchHistories: function () {
            const API_URL = 'ec2-18-234-117-45.compute-1.amazonaws.com:3000'
            fetch(API_URL + '/list')
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    this.chatHistories = data
                    console.log( this.chatHistories)
                    console.log( this.chatHistories.length)
                })
        }
    }
}
</script>  

<style scoped>
.adminBoards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;    
}
h1 {
    color: antiquewhite;
}
@media (max-width: 500px) {
    .adminBoards {
        display: flex;
        flex-direction: column;
    }
}
</style>