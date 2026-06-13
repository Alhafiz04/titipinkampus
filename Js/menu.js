import { db } from "./firebase.js";

import {
    doc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params =
    new URLSearchParams(
        window.location.search
    );

const driverId =
    params.get("id");
document
.getElementById("pesanLink")
.href =
`order.html?driverId=${driverId}`;

async function loadMenu() {

    const driverRef =
        doc(
            db,
            "drivers",
            driverId
        );

    const driverSnap =
        await getDoc(driverRef);

    if (!driverSnap.exists())
        return;

    const data =
        driverSnap.data();

    document.getElementById(
        "menuImage"
    ).src =
        data.menuFoto;

    document.getElementById(
        "driverNama"
    ).textContent =
        data.nama;

    document.getElementById(
        "driverRating"
    ).textContent =
        data.rating;

    document.getElementById(
        "driverLokasi"
    ).textContent =
        data.lokasi;

}

loadMenu();