import firebase from 'firebase';
import 'firebase/firebase-database';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBMa3kJZTdktQOv1pToDVoTQE1F7foslmU',
  authDomain: 'mapmyfriends-7f3b3.firebaseapp.com',
  databaseURL: 'https://mapmyfriends-7f3b3.firebaseio.com',
  projectId: 'mapmyfriends-7f3b3',
  storageBucket: 'mapmyfriends-7f3b3.appspot.com',
  messagingSenderId: '164203873364',
  appId: '1:164203873364:web:2e278ddd9d9316a7dd59c1',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

export default db;
