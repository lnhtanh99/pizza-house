import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZOK1ElF_RyxlKzHAr3p9ftw-iBS0C7zU",
  authDomain: "pizza-house-vn.firebaseapp.com",
  projectId: "pizza-house-vn",
  storageBucket: "pizza-house-vn.appspot.com",
  messagingSenderId: "1064987256308",
  appId: "1:1064987256308:web:4a66ef69ad5d393062c5a1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectStorage, projectFirestore, projectAuth };