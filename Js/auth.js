import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const registerFields =
    document.getElementById("registerFields");

let registerMode = false;
/* =========================
   REGISTER
========================= */

if (registerBtn) {

    registerBtn.addEventListener(
        "click",
        async () => {

            if (!registerMode) {

                registerFields.style.display =
                    "block";

                registerBtn.textContent =
                    "Simpan Akun";

                registerMode = true;

                return;
            }

            try {

                const nama =
                    document.getElementById(
                        "nama"
                    ).value;

                const noHp =
                    document.getElementById(
                        "noHp"
                    ).value;

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email.value,
                        password.value
                    );

                const user =
                    userCredential.user;

                await setDoc(
                    doc(
                        db,
                        "users",
                        user.uid
                    ),
                    {
                        nama,
                        noHp,
                        email: email.value,
                        rating: 5,
                        role: "user"
                    }
                );

                alert(
                    "Akun berhasil dibuat!"
                );

                registerFields.style.display =
                    "none";

                registerBtn.textContent =
                    "Daftar";

                registerMode = false;

            }

            catch (error) {

                alert(error.message);

            }

        }
    );

}

/* =========================
LOGIN
========================= */

if (loginBtn) {

loginBtn.addEventListener("click", async () => {

    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email.value,
                password.value
            );

        const uid =
            userCredential.user.uid;

        const userDoc =
            await getDoc(
                doc(db, "users", uid)
            );

        if (userDoc.exists()) {

            const data =
                userDoc.data();

            if (
                data.role === "driver"
            ) {

                window.location.href =
                    "driver.html";

            } else {

                window.location.href =
                    "dashboard.html";

            }

        } else {

            window.location.href =
                "dashboard.html";

        }

    } catch (error) {

        alert(error.message);

    }

});

}

/* =========================
LOGOUT
========================= */

if (logoutBtn) {

logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        window.location.href =
            "index.html";

    } catch (error) {

        alert(error.message);

    }

});

}
