import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href =
            "index.html";

        return;
    }

    try {

        const userRef =
            doc(db, "users", user.uid);

        const userSnap =
            await getDoc(userRef);

        if (userSnap.exists()) {

            const data =
                userSnap.data();

            document.getElementById(
                "profilNama"
            ).textContent =
                data.nama;

            document.getElementById(
                "profilEmail"
            ).textContent =
                data.email;

            document.getElementById(
                "profilNoHp"
            ).textContent =
                data.noHp;

            document.getElementById(
                "profilRole"
            ).textContent =
                data.role;

            document.getElementById(
                "profilRating"
            ).textContent =
                data.rating;

        }

    }

    catch (error) {

        console.log(error);

    }

});