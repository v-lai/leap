import credentials from './credentials';

// FirebaseWeb
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/storage');

const firebaseWeb = firebase.initializeApp(credentials.firebase);
const storage = firebase.storage();
const storageRef = storage.ref();
const firebaseInit = {
  initialize: firebaseWeb,
  auth: firebase.auth(),
  storage,
  storageRef,
};

export default firebaseInit;
