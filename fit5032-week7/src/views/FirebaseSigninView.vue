<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const db = getFirestore();

const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            console.log("Firebase Sign in Successful!");

            // Fetch user role from Firestore
            const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
            if (userDoc.exists()) {
                const userRole = userDoc.data().role;

                // Redirect based on user role
                if (userRole === "admin") {
                    router.push("/admin-dashboard");
                } else if (userRole === "professional") {
                    router.push("/professional-dashboard");
                } else {
                    router.push("/user-dashboard");
                }
            } else {
                console.log("No user role found");
            }
        })
        .catch((error) => {
            console.log(error.code);
        });
};
</script>

<style scoped>
.signin-view {
    padding: 20px;
}
</style>