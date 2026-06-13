import { auth, db }
from "./firebase.js";

import {
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    getDoc,
    query,
    where
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(
    auth,
    async (user) => {

        if (!user) {

            window.location.href =
                "index.html";

            return;

        }

        const container =
            document.getElementById(
                "riwayatContainer"
            );

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
                data.userId ===
                user.uid
            ) {

                html += `
                <div class="card">

                    <h3>
                    Pesanan
                    </h3>

                    <p>
                    ${data.pesanan}
                    </p>

                    <p>
                    📍 ${data.alamat}
                    </p>

                    <p>
                    Status :
                    ${data.status}
                    </p>

                    <p>
                    ${data.tanggal}
                    </p>

                    ${
                        data.status === "Selesai"
                        && !data.ratingDiberikan
                        ?
                        `
                        <button
                        onclick="beriRating(
                        '${order.id}',
                        '${data.driverId}'
                        )">
                        ⭐ Beri Rating
                        </button>
                        `
                        :
                        ""
                    }

                </div>
                `;
            }

        });

        if(html===""){

            html =
            "<p>Belum ada riwayat</p>";

        }

        container.innerHTML =
            html;

    }
);
window.beriRating =
async function(
    orderId,
    driverId
){

    const nilai =
        prompt(
            "Masukkan rating 1-5"
        );

    if(!nilai) return;

    const rating =
        parseInt(nilai);

    if(
        rating < 1 ||
        rating > 5
    ){

        alert(
            "Rating harus 1-5"
        );

        return;

    }

    const user =
        auth.currentUser;

    await addDoc(
        collection(
            db,
            "reviews"
        ),
        {
            driverId,
            userId:
                user.uid,
            rating
        }
    );

    await updateDoc(
        doc(
            db,
            "orders",
            orderId
        ),
        {
            ratingDiberikan: true
        }
    );

    alert(
        "Rating berhasil diberikan"
    );

    location.reload();

};