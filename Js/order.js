import { app } from "./firebase.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const db = getFirestore(app);

/* =========================
   SIMPAN TITIPAN
========================= */

const btn = document.getElementById("simpanOrder");

if (btn) {

    btn.addEventListener("click", async () => {

        const namaBarang =
            document.getElementById("namaBarang").value;

        const lokasiBeli =
            document.getElementById("lokasiBeli").value;

        const hargaBarang =
            parseInt(document.getElementById("hargaBarang").value);

        const ongkosTitip =
            parseInt(document.getElementById("ongkosTitip").value);

        const catatan =
            document.getElementById("catatan").value;

        try {

            await addDoc(
                collection(db, "orders"),
                {
                    namaBarang,
                    lokasiBeli,
                    hargaBarang,
                    ongkosTitip,
                    totalHarga:
                        hargaBarang + ongkosTitip,
                    catatan,
                    status: "Menunggu",
                    tanggal:
                        new Date().toLocaleDateString()
                }
            );

            alert("Titipan berhasil disimpan!");

        }

        catch (error) {

            alert(error.message);

        }

    });

}

/* =========================
   TAMPILKAN TITIPAN
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
                    <h3>${data.namaBarang}</h3>
                    <p>Lokasi: ${data.lokasiBeli}</p>
                    <p>Harga: Rp ${data.hargaBarang}</p>
                    <p>Ongkos: Rp ${data.ongkosTitip}</p>
                    <p>Status: ${data.status}</p>
                </div>
            `;

        });

        ordersDiv.innerHTML = html;

    }

    loadOrders();

}