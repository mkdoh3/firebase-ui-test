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
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
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


firebase.auth().onAuthStateChanged(function () {
    var user = firebase.auth().currentUser;
    console.log(user)
    if (user != null) {
        database.ref("users").child(user.uid).set({
            email: user.email,
        })
        document.body.innerHTML = "<h1> Hello " + user.displayName + ", welcome! </h1> <h2>" + user.email + "</h2>"

    }
})


//database.ref.onAuth(function (data) {
//    console.log(data)
//    if (data && isNewUser) {
//        // save the user's profile into Firebase so we can list users,
//        // use them in Security and Firebase Rules, and show profiles
//        ref.child("users").child(data.uid).set({
//            provider: data.provider,
//            name: getName(authData)
//            //some more user data
//        });
//    }
//});









// authentification listenr
//on state change populate firebaseUser with current users info, else firebaseUser is null
