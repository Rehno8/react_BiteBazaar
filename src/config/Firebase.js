// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwjuevUiHsUxZjf2d9BUVZRU3qp_AgR2g",
  authDomain: "bite-bazaar-2db36.firebaseapp.com",
  projectId: "bite-bazaar-2db36",
  storageBucket: "bite-bazaar-2db36.firebasestorage.app",
  messagingSenderId: "929752850296",
  appId: "1:929752850296:web:adf9b3210a5b9eab2d728d",
  measurementId: "G-JMVY5WHE18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);



export {analytics,auth,firestore}