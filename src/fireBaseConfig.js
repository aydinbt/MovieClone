import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyBCwMTNxlQecI40rA0uduWNfqBA9f9hulQ",
  authDomain: "deneme-app-9723e.firebaseapp.com",
  projectId: "deneme-app-9723e",
  storageBucket: "deneme-app-9723e.appspot.com",
  messagingSenderId: "107355049022",
  appId: "1:107355049022:web:91ccd30299e9f11e9d156f",
  measurementId: "G-S5SH8W3VZ6",
};
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export const deleteBookMark = (id) => {
  deleteDoc(doc(db, "MoviesBookMark", id));
};

const refMovieComments = collection(db, "MoviesComments");
const refBookMark = collection(db, "MoviesBookMark");

export const useBookMarkListener = () => {
  const [bookmark, setBookMark] = useState([]);
  useEffect(() => {
    return onSnapshot(refBookMark, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });
      setBookMark(docs);
    });
  }, []);
  return bookmark;
};
export const useMoviesCommentMarkListener = () => {
  const [moviesComment, setMoviesComment] = useState([]);
  useEffect(() => {
    return onSnapshot(refMovieComments, (snapshot) => {
      const docs = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        })
        .sort(function (a, b) {
          return a.date > b.date ? -1 : a.date > b.date ? 1 : 0;
        });
      setMoviesComment(docs);
    });
  }, []);
  return moviesComment;
};

export const addBookMark = (id, title, image) => {
  const user = firebase.auth().currentUser;
  addDoc(refBookMark, {
    uid: id,
    title: title,
    user: user.email,
    image: image,
  });
};
export const addComment = (id, desc, date, heart = 0) => {
  const user = firebase.auth().currentUser;
  addDoc(refMovieComments, {
    uid: id,
    desc: desc,
    user: user.email,
    date: new Date().toISOString(),
    heart: heart,
  });
};

export const setHeart = (id, heart) => {
  db.collection("/MoviesComments")
    .doc(id)
    .update({
      heart: heart + 1,
    });
};
export { firebase, db };
