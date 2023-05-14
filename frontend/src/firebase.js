import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const app = firebase.initializeApp({
    apiKey: "AIzaSyASuyIW6shYl9FIYXLZ2Mo_fry_l0XM8iQ",
    authDomain: "digimed-13041.firebaseapp.com",
    projectId: "digimed-13041",
    storageBucket: "digimed-13041.appspot.com",
    messagingSenderId: "275854810594",
    appId: "1:275854810594:web:edb5356199d047fb41adbb",
    measurementId: "G-6QNSL8F5SJ"
});

// Initialize Firebase
export const auth = app.auth();
export const database = app.database();
export default app;