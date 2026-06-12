import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmg0E8qmNdjvVx-nkcn61D8trVmz7XHrM",
  authDomain: "web-techno-30ec7.firebaseapp.com",
  databaseURL: "https://web-techno-30ec7-default-rtdb.firebaseio.com",
  projectId: "web-techno-30ec7",
  storageBucket: "web-techno-30ec7.firebasestorage.app",
  messagingSenderId: "974827264711",
  appId: "1:974827264711:web:3de79c2e6496e1ca687ce2",
  measurementId: "G-WS7BS3SRY3"
};

const app = initializeApp(firebaseConfig);

export { app };