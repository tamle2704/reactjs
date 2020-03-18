import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2mHJEqw70Fq5myrNASF8gilnkdUfjeB4",
  authDomain: "manage-student-71a2b.firebaseapp.com",
  databaseURL: "https://manage-student-71a2b.firebaseio.com",
  projectId: "manage-student-71a2b",
  storageBucket: "manage-student-71a2b.appspot.com",
  messagingSenderId: "355742100494",
  appId: "1:355742100494:web:a992e66c018ae57135a05f",
  measurementId: "G-WYPKSEPQJB"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let db = firebase.firestore().collection("students");

export default db;
