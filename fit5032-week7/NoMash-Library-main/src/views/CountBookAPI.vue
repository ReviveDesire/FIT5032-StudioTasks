<template>
    <div class="container"><pre>{{ jsondata }}</pre></div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            jsondata: null,
            error: null
        };
    },
    mounted() {
        this.getBookCountAPI();
    },
    methods: {
        async getBookCountAPI() {
            try {
                const response = await axios.get('https://countbooks-grw3iausaa-uc.a.run.app');
                this.jsondata = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = error;
                this.count = null;
            }
        },
    },
};
</script>

<style scoped>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>