//Firebase
(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyByCt2sDszxo84V6wd6MWxFarfsT7BpPZs",
        authDomain: "btime-e18fa.firebaseapp.com",
        databaseURL: "https://btime-e18fa.firebaseio.com",
        projectId: "btime-e18fa",
        storageBucket: "btime-e18fa.appspot.com",
        messagingSenderId: "23757485554"
    };
    firebase.initializeApp(config);
    var firestore = firebase.firestore();

    //Get Elements
    window.storeUser = firestore.collection("User");

    window.name_up = $('#name_signup');
    window.email_up = $('#email_signup');
    window.password_up = $('#password_signup');

    window.email_in = $('#email_signin');
    window.password_in = $('#password_signin');

    window.signIn = $('#btnSignIn');
    window.signUp = $('#btnSignUp');

    //Add SingIn Event
    signIn.on('click', e => {

        e.preventDefault();

        const email = window.email_in.val();
        const pass = window.password_in.val();

        const auth = firebase.auth();

        //Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        promise.catch(e => alert(e.message));
    });

    //Add SingUp Event
    signUp.on('click', e => {

        e.preventDefault();

        const email = window.email_up.val();
        const pass = window.password_up.val();
        const name = window.name_up.val();

        const auth = firebase.auth();

        //Store at Firestore and Firebase
        storeUser.add({
            emailUser: email,
            nomeUser: name,
            senhaUser: pass
        }).then(function(){
            auth.createUserWithEmailAndPassword(
                email,
                pass
            ).then(function() {
                console.log("Gravado com sucesso!");
                alert("Seja mais que bem-vindo! ;)");
            }).catch(function (error) {
                alert(error);
            });
        }).catch(function(error){
            alert(error);
        });
    });

    // Add a Realtime Listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        location.href = "number.html?name=" + encodeURI(window.name_up.val());
        console.log(firebaseUser);
        console.log(user.email);
    }else {
        console.log('not logged in');
    }
    });
}());