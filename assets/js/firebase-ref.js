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

let currentUser;
let currentUserID;




firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        currentUserID = user.uid
        console.log(user)
    }

    //use this code to check if a user is new or not to execute init setup modal when nessecar

    $(document).ready(function () {
        var ref = firebase.database().ref("users/" + currentUserID);
        ref.once("value")
            .then(function (snapshot) {
                console.log("child", snapshot.child("newUser").val())
                currentUser = snapshot.val()
                console.log("current user", currentUser)
                if (currentUser.newUser === true) {
                    currentUser.newUser === false;
                    $("#myModal").modal();
                }
                $("#welcomeMessage").text("Welcome " + currentUser.displayName)
                console.log(currentUser)
            });
    })
})








//    
//    
//    

//            
//            let test12;
//            let test = database.ref().child("users")
//            //            .once("value", snapshot => {
//            //                test12 = snapshot.val();
//            //            })
//            console.log(test)
//        }
//        if (database.ref(currentUser).newUser === true) {
//
//            $("#test").text("hello new user" + currentUser.displayName + " your user id is " +
//                currentUser.uid)
//        }
//    });
//})
