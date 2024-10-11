<template>
    <div class="access-denied-container">
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page. Please log in to continue.</p>
      <button @click="goToLogin">Go to Login</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goToLogin = () => {
    router.push({ name: 'Login' });
  };
  </script>
  
  <style scoped>
  .access-denied-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  p {
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>