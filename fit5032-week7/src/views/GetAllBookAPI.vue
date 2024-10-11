<template>
    <div class="container">
        <pre>{{ jsondata }}</pre>
        <p v-if="error">{{ error }}</p>
    </div>
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
        this.getAllBooksAPI();
    },
    methods: {
        async getAllBooksAPI() {
            try {
                const response = await axios.get('https://getallbooks-grw3iausaa-uc.a.run.app');
                this.jsondata = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching all books:', error);
                this.error = 'Failed to fetch all books';
                this.jsondata = null;
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