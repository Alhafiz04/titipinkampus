import { app } from "./firebase.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth(app);

// Ambil elemen HTML
const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

/* =========================
   REGISTER
========================= */

if (registerBtn) {

    registerBtn.addEventListener("click", () => {

        createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        )

        .then((userCredential) => {

            alert("Akun berhasil dibuat!");

            console.log(userCredential.user);

        })

        .catch((error) => {

            alert("Error: " + error.message);

        });

    });

}

/* =========================
   LOGIN
========================= */

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        )

        .then((userCredential) => {

            alert("Login berhasil!");

            console.log(userCredential.user);

            window.location.href = "dashboard.html";

        })

        .catch((error) => {

            alert("Error: " + error.message);

        });

    });

}

/* =========================
   LOGOUT
========================= */

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        signOut(auth)

        .then(() => {

            alert("Logout berhasil!");

            window.location.href = "index.html";

        })

        .catch((error) => {

            alert("Error: " + error.message);

        });

    });

}