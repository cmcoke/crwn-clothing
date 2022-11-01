import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, getDocs, setDoc, collection, writeBatch, query } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn-yu_K00vArnaIIQIWJ_PCpbaUPJ_mZw",
  authDomain: "crwn-clothing-db-4c26d.firebaseapp.com",
  projectId: "crwn-clothing-db-4c26d",
  storageBucket: "crwn-clothing-db-4c26d.appspot.com",
  messagingSenderId: "366050734409",
  appId: "1:366050734409:web:642be4d148a7ec25056a98"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// using Google account for authentication
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// firebase firestore config
export const db = getFirestore();

// create user documents for signing and signing out users
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}

// authenticate user with their email & password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// allows user to sign in with their email & password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// allows user to sign out of their account
export const signOutUser = async () => await signOut(auth);

// 
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);


/* 

  creates a new collection and the documents within that new collection in the firestore

    -- collectionKey: refers to the name of the collection
    -- objectsToAdd: refers to documents that are with the collection 
    
*/

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};


// get the 'categories' collection & it's documents from the firebase store
export const getCategoriesAndDocuments = async () => {

  const collectionRef = collection(db, 'categories');

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;

};