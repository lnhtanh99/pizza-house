import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXjXWXko1LxYJn06rewqWLC7SBzETImyE",
  authDomain: "mario-plan-32a23.firebaseapp.com",
  projectId: "mario-plan-32a23",
  storageBucket: "mario-plan-32a23.appspot.com",
  messagingSenderId: "535515272965",
  appId: "1:535515272965:web:6609b84f9d86057e49896c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };