import credentials from './credentials';

// FirebaseWeb
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/storage');
require('firebase/firestore');

const firebaseWeb = firebase.initializeApp(credentials.firebase);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
const storageRef = storage.ref();
const firebaseInit = {
  initialize: firebaseWeb,
  auth: firebase.auth(),
  googleAuthProvider,
  firestore: firebase.firestore(),
  storage,
  storageRef,
};

export default firebaseInit;
