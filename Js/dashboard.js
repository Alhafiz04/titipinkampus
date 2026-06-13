import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
getDoc,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

if (!user) {

    window.location.href =
        "index.html";

    return;
}

try {

    /* =========================
       NAMA USER
    ========================= */

    const userRef =
        doc(db, "users", user.uid);

    const userSnap =
        await getDoc(userRef);

    if (userSnap.exists()) {

        const data =
            userSnap.data();

        document.getElementById(
            "namaUser"
        ).textContent =
            `Halo, ${data.nama} 👋`;

    }

    /* =========================
       DRIVER ONLINE
    ========================= */

    const driverGrid =
        document.getElementById(
            "driverGrid"
        );

    const snapshot =
        await getDocs(
            collection(
                db,
                "drivers"
            )
        );

    let html = "";

    snapshot.forEach((driver) => {

        const data =
            driver.data();

        if (data.online === true) {

            html += `
            <div class="card">

                <h3>
                    ${data.nama || "Driver"}
                </h3>

                <p>
                    ⭐ ${data.rating || 5}
                </p>

                <p>
                    📍 ${data.lokasi || "-"}
                </p>

                <p>
                    🟢 Online
                </p>

               <a href="menu.html?id=${driver.id}">
                    <button>
                     Lihat Menu
                </button>
                </a>

            </div>
            `;
        }

    });

    driverGrid.innerHTML =
        html;

}

catch (error) {

    console.log(error);

}

});
