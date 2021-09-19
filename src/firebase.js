import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCjKhz2ky7nxxxAMib9QscAJHu2MYK7uIc",
    authDomain: "tmdb-movies-4820e.firebaseapp.com",
    projectId: "tmdb-movies-4820e",
    storageBucket: "tmdb-movies-4820e.appspot.com",
    messagingSenderId: "865233882539",
    appId: "1:865233882539:web:9d7d7f356a7cd6682116ee"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export { auth }