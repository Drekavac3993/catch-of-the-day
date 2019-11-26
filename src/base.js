import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBUE37-LvHH5G_Db5mosTo5qLrqREYLq1I",
    authDomain: "catch-of-the-day-8e215.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-8e215.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
