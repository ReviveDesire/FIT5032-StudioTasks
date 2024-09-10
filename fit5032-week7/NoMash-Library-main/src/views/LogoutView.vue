<template>
    <div class="logout-view">
      <h1>Logout Page</h1>
      <p>Click the button below to log out.</p>
      <p v-if="userInfo">
        Logged in as: <strong>{{ userInfo.email }}</strong>
      </p>
      <p v-else>
        No user is currently logged in.
      </p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { getAuth, signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const auth = getAuth();
  const userInfo = ref(null);
  
  // Function to log out the current user
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User has been logged out.");
        userInfo.value = null;
        router.push("/FireLogin");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
  
  onMounted(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      userInfo.value = {
        email: currentUser.email,
        uid: currentUser.uid,
      };
      console.log("Current user details:", currentUser);
    } else {
      console.log("No user is currently logged in.");
    }
  });
  </script>
  
  <style scoped>
  .logout-view {
    padding: 20px;
  }
  button {
    margin-top: 10px;
  }
  </style>
  