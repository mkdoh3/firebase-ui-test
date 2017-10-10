//auth.signInWithEmailAndPassword(email, pass);
//
//auth.creatUserWithEmailAndPassword(email, pass);


//let currentUser = '';


const config = {
    apiKey: "AIzaSyBoDzxA09zepIWCD9INLvERA63qHwd_oZ4",
    authDomain: "ct-ace.firebaseapp.com",
    databaseURL: "https://ct-ace.firebaseio.com",
    projectId: "ct-ace",
    storageBucket: "ct-ace.appspot.com",
    messagingSenderId: "310061683501"
};
firebase.initializeApp(config);

const database = firebase.database()



const uiConfig = {
    signInSuccessUrl: 'logged-in-test.html',
    signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  //          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
//          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);








const emailInput = $("#email-input");
const passwordInput = $("#password-input");
const loginBtn = $("#login-btn");
const signupBtn = $("#signup-btn");
const logoutBtn = $("#logout-btn");



//login event

loginBtn.on("click", function () {
    const email = emailInput.val();
    const password = passwordInput.val();
    const auth = firebase.auth();
    //login
    const promise = auth.signInWithEmailAndPassword(email, password);
    //    currentUser = firebase.auth().currentUser.uid;

    promise.catch(function (error) {
        console.log(error.message);
    })


})




//signup event 

signupBtn.on("click", function () {
    //add check for email validation
    const email = emailInput.val();
    const password = passwordInput.val();
    const auth = firebase.auth();
    //sign up
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.then(function (data) {
        const userID = data.uid
        database.ref(userID).set({
            email: email,
            password: password,

        })
    })

    promise.catch(function (error) {
        console.log(error.message);
    })
})






logoutBtn.on("click", function () {
    firebase.auth().signOut();
})




// authentification listenr
//on state change populate firebaseUser with current users info, else firebaseUser is null



//firebase.auth().onAuthStateChanged(function (user) {
//    if (user) {
//        document.body.innerHTML = "<h1> Hello," + user.displayName + "welcome! </h1> <h2>" + user.email + "</h2>"
//    } else {
//        console.log('not logged in')
//        logoutBtn.attr("style", "display:none")
//
//    }
//})
