<template>
    <div>
        <h1>Admin logged</h1>
    </div>
</template>

<script>
export default {
    name: 'adminBoard',
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
            const API_URL = 'http://localhost:3000'
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