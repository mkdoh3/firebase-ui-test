const config = {
    apiKey: "AIzaSyBoDzxA09zepIWCD9INLvERA63qHwd_oZ4",
    authDomain: "ct-ace.firebaseapp.com",
    databaseURL: "https://ct-ace.firebaseio.com",
    projectId: "ct-ace",
    storageBucket: "ct-ace.appspot.com",
    messagingSenderId: "310061683501"
};
firebase.initializeApp(config);

const database = firebase.database();
let currentUser = '';



$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user
            console.log("current user id", currentUser)
        } else {
            console.log("no one signed in")
        }
        $("#test").text("hello " + currentUser.displayName + " your user id is " +
            currentUser.uid)
    });
})
