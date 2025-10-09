// DO NOT EDIT, this file is generated
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';

const firebaseConfig = {"projectId":"autopilot-careers-de69a","appId":"1:1012708335965:web:15848c697067f92080a256","storageBucket":"autopilot-careers-de69a.appspot.com","apiKey":"mock-key-for-dev-env","authDomain":"autopilot-careers-de69a.firebaseapp.com","messagingSenderId":"1012708335965"};

let firebaseApp: FirebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

export { firebaseApp };
