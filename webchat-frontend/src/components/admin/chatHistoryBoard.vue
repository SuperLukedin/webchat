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
    width: 400px;
    height: 400px;
    margin: 10px 10px;
    flex-direction: column;
    overflow-y: scroll;
}
.msg {
    margin-left: 10px;
    margin-right: 10px;    
    border-bottom: 1px solid rgb(191, 197, 196);
    max-width: 550px;
    word-wrap: break-word;
}
</style>