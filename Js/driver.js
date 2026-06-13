console.log("driver.js berhasil dimuat");
import { auth, db } from "./firebase.js";

import {
doc,
setDoc,
updateDoc,
getDoc,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const onlineBtn = document.getElementById("onlineBtn");
const offlineBtn = document.getElementById("offlineBtn");
const simpanLokasi = document.getElementById("simpanLokasi");
const lokasiInput = document.getElementById("lokasi");
const menuFile = document.getElementById("menuFile");
const uploadMenuBtn = document.getElementById("uploadMenuBtn");

console.log("menuFile =", menuFile);
console.log("uploadMenuBtn =", uploadMenuBtn);
/* =========================
ONLINE
========================= */

if (onlineBtn) {

onlineBtn.addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) {
        alert("Silakan login dulu");
        return;
    }

    try {

        const userRef =
            doc(db, "users", user.uid);

        const userSnap =
            await getDoc(userRef);

        const userData =
            userSnap.data();

        await setDoc(
            doc(db, "drivers", user.uid),
            {
                userId: user.uid,
                nama: userData.nama,
                rating: userData.rating || 5,
                lokasi: lokasiInput.value,
                online: true,
                totalOrder: 0,
                menuFoto: ""
            },
            { merge: true }
        );

        alert("Driver Online");

    } catch (error) {

        alert(error.message);

    }

});


}

/* =========================
OFFLINE
========================= */

if (offlineBtn) {

offlineBtn.addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) return;

    try {

        await updateDoc(
            doc(db, "drivers", user.uid),
            {
                online: false
            }
        );

        alert("Driver Offline");

    } catch (error) {

        alert(error.message);

    }

});


}

/* =========================
SIMPAN LOKASI
========================= */

if (simpanLokasi) {

simpanLokasi.addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) return;

    try {

        await updateDoc(
            doc(db, "drivers", user.uid),
            {
                lokasi: lokasiInput.value
            }
        );

        alert("Lokasi disimpan");

    } catch (error) {

        alert(error.message);

    }

});


}

/* =========================
UPLOAD MENU CLOUDINARY
========================= */

if (uploadMenuBtn) {

uploadMenuBtn.addEventListener(
    "click",
    async () => {

        const user =
            auth.currentUser;

        if (!user) {

            alert("Silakan login");

            return;
        }

        const file =
            menuFile.files[0];

        if (!file) {

            alert(
                "Pilih gambar terlebih dahulu"
            );

            return;
        }

        try {

            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            formData.append(
                "upload_preset",
                "titipin_menu"
            );

            const response =
                await fetch(
                    "https://api.cloudinary.com/v1_1/dqbxfilem/image/upload",
                    {
                        method: "POST",
                        body: formData
                    }
                );

            const data =
                await response.json();

            await updateDoc(
                doc(
                    db,
                    "drivers",
                    user.uid
                ),
                {
                    menuFoto:
                        data.secure_url
                }
            );

            alert(
                "Menu berhasil diupload!"
            );

            console.log(
                data.secure_url
            );

        }

        catch (error) {

            console.log(error);

            alert(
                "Upload gagal"
            );

        }

    }
);

}
/* =========================
   LOAD PESANAN MASUK
========================= */

async function loadPesanan() {

    const user =
        auth.currentUser;

    if (!user) return;

    const container =
        document.getElementById(
            "pesananMasuk"
        );

    if (!container) return;

    const snapshot =
        await getDocs(
            collection(
                db,
                "orders"
            )
        );

    let html = "";

    snapshot.forEach((order) => {

        const data =
            order.data();

        if (
            data.driverId === user.uid
        ) {

            html += `
                <div class="card">

                    <p>
                    ${data.pesanan}
                    </p>

                    <p>
                    📍 ${data.alamat}
                    </p>

                    <p>
                    Status:
                    ${data.status}
                    </p>

                    <button
                    onclick="terimaPesanan('${order.id}')">
                    Terima
                    </button>

                    <button
                    onclick="tolakPesanan('${order.id}')">
                    Tolak
                    </button>

                    <button
                    onclick="selesaiPesanan('${order.id}')">
                    Selesai
                    </button>

                </div>
            `;
        }

    });

    if (html === "") {

        html =
        "<p>Belum ada pesanan</p>";

    }

    container.innerHTML =
        html;

}
window.terimaPesanan =
async function(id) {

    await updateDoc(
        doc(
            db,
            "orders",
            id
        ),
        {
            status:
            "Diproses"
        }
    );

    loadPesanan();

};

window.tolakPesanan =
async function(id) {

    await updateDoc(
        doc(
            db,
            "orders",
            id
        ),
        {
            status:
            "Ditolak"
        }
    );

    loadPesanan();

};
auth.onAuthStateChanged(
    (user) => {

        if(user){

            loadPesanan();

        }

    }
);
window.selesaiPesanan =
async function(id){

    await updateDoc(
        doc(
            db,
            "orders",
            id
        ),
        {
            status:
            "Selesai"
        }
    );

    loadPesanan();

};