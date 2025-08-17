// firebase-config.js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
