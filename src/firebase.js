// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtxK2-RQY32LDGQRyLw3Ubk5eqO83bwR8",
  authDomain: "health-tracking-12433.firebaseapp.com",
  databaseURL: "https://health-tracking-12433-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "health-tracking-12433",
  storageBucket: "health-tracking-12433.appspot.com",
  messagingSenderId: "151085429342",
  appId: "1:151085429342:web:6515ea31c263f2f2657acf",
  measurementId: "G-STDW50933X"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;