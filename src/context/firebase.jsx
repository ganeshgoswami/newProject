import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useContext } from "react";
import { addDoc, collection, getFirestore, getDocs,getDoc,doc, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyA0mlg2AGHZjD8rgKGH2mcTPrh_EZq8NrA",
  authDomain: "bookify-f82c8.firebaseapp.com",
  projectId: "bookify-f82c8",
  storageBucket: "bookify-f82c8.appspot.com",
  messagingSenderId: "129830417765",
  appId: "1:129830417765:web:567f4d490ce738da681d8c",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firebaseStore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  // console.log(user);

  //  Add data in firebase store handelCreateNewListing

  const handelCreateNewListing = async (name, isbn, price, cover) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    await addDoc(collection(firebaseStore, "books"), {
      name,
      isbn,
      price,
      imageUrl: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

//  product data 
  const [allProducts, SetProducts] = useState([]);

  let API = "http://localhost:2410/products";

  const fetchApiData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      SetProducts(data.allProducts);
      console.log(data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApiData(API);
  }, []);

  //  create new user signUpUserEmailAndPassword
  const signUpUserEmailAndPassword = (email, password) =>{
    createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((value)=>console.log(setUser(null))).catch((err)=>console.log(err))
  }
  //  sign in user signInUserEmailAndPassword
  const signInUserEmailAndPassword = (email, password) =>{
    signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((value)=>console.log("success")).catch((err)=>console.log(err));
  }
  // sing out loggedOut
  const loggedOut = () =>{
    signOut(firebaseAuth)
  }
  // google sign in signInWithGoogle
  const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
  // real timedata change on ui and user log in or not
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

    // list all Data books listAllBooks
    const listAllBooks = () => {
      
      return getDocs(collection(firebaseStore,"books"));
    };

    const getBookById = async(id) =>{
      const docRef = doc(firebaseStore,"books",id);
      const result = await getDoc(docRef);
      return result;
    }

    const placeOrder = async(bookId,qty,data) =>{
     const collectionRef = collection(firebaseStore,"books",bookId,"order")
     const result =await addDoc(collectionRef,{
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      data,
      qty:Number(qty)
     })
     return result;
    }

 

    const fetchMyBooks = async(userId) =>{
      const collectionRef = collection(firebaseStore,"books");
      const q = query(collectionRef,where("userId", "==" , userId ))
 
      const result = await getDocs(q)
      return result;
    }

    const getOrders = async(bookId)=>{
      const collectionRef = collection(firebaseStore,"books",bookId,"order")
      const result = await getDocs(collectionRef)
      return result;
     }

    const getImageUrl = (path) =>{

      return getDownloadURL(ref(storage,path))
    }

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserEmailAndPassword,
        signInUserEmailAndPassword,
        signInWithGoogle,
        handelCreateNewListing,
        listAllBooks,
        getImageUrl,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        loggedOut,
        allProducts,
        isLoggedIn,
        user
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
