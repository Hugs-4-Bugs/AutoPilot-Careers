'use client';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignIn,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendEmailVerification,
  onAuthStateChanged,
  type User,
  Auth,
} from 'firebase/auth';

export {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  type User,
};


export const signInWithEmailAndPassword = (auth: Auth, email: string, password:string) => {
  return firebaseSignIn(auth, email, password);
};


export const signOut = (auth: Auth) => {
  return firebaseSignOut(auth);
};
