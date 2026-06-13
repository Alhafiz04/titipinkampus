import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* =========================
SIMPAN PESANAN
========================= */

const btn = document.getElementById("simpanOrder");

if (btn) {


btn.addEventListener("click", async () => {

    const pesanan =
        document.getElementById("pesanan").value;

    const catatan =
        document.getElementById("catatan").value;

    const alamat =
        document.getElementById("alamat").value;

    try {
        const params =
    new URLSearchParams(
        window.location.search
    );

    const driverId =
    params.get("driverId");
        await addDoc(
            collection(db, "orders"),
            {
                userId:
                    auth.currentUser.uid,

                driverId:
                    driverId,
                pesanan,
                catatan,
                alamat,
                status:
                    "Menunggu",
                ratingDiberikan: false,
                tanggal:
                    new Date()
                    .toLocaleDateString()
            }
        );

        alert("Pesanan berhasil dikirim!");

        document.getElementById("pesanan").value = "";
        document.getElementById("catatan").value = "";
        document.getElementById("alamat").value = "";

    }

    catch (error) {

        alert(error.message);

    }

});


}

/* =========================
TAMPILKAN PESANAN
========================= */

const ordersDiv =
document.getElementById("orders");

if (ordersDiv) {


async function loadOrders() {

    const snapshot =
        await getDocs(
            collection(db, "orders")
        );

    let html = "";

    snapshot.forEach((doc) => {

        const data = doc.data();

        html += `
            <div class="card">

                <h3>Pesanan</h3>

                <p>${data.pesanan}</p>

                <p>
                Status :
                ${data.status}
                </p>

                <p>
                Alamat :
                ${data.alamat}
                </p>

            </div>
        `;

    });

    ordersDiv.innerHTML = html;

}

loadOrders();


}
