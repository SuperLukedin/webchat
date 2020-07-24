<template>
    <div class="historyBoard">
        <p> Started at {{ this.history.created_at }} </p>
        <div v-for="msg in history.messages" :key="msg.index">
            <div class="msg"> {{ msg.username }}:  {{ msg.msg }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chatHistoryBoard',
    props: ['history'],
    data: function () {
        return {
            
        }
    },
    mounted () {
        
    },
    methods: {
    
    }
}
</script>

<style scoped>
.historyBoard {
    border: 1px solid rgb(129, 129, 34);
    width: 350px;
    height: 400px;
    margin: 30px 30px;
    flex-direction: column;
    background-color: rgb(92, 99, 99);    
    overflow-y: scroll;
    
}
p {
    color: antiquewhite;
    font-style: italic;
}
.msg {
    color: antiquewhite;
    margin-left: 10px;
    margin-right: 10px;    
    border-bottom: 1px solid rgb(191, 197, 196);
    max-width: 550px;
    word-wrap: break-word;
}
</style>