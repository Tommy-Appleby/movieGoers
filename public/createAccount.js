(function() {
	console.log("loaded createAcct script");
    const firebaseConfig = {
        apiKey: "AIzaSyAHfnQHxx_PEsWW-9BWFOxMD7r9KzdRCYw",
        authDomain: "fir-proj-73e59.firebaseapp.com",
        databaseURL: "https://fir-proj-73e59-default-rtdb.firebaseio.com",
        projectId: "fir-proj-73e59",
        storageBucket: "fir-proj-73e59.appspot.com",
        messagingSenderId: "286772816543",
        appId: "1:286772816543:web:6eb884a40f6b91411cd0aa",
        measurementId: "G-YM5KVJ94P7"
      };
		
	firebase.initializeApp(firebaseConfig);
	//get elements
	const txtEmail = document.getElementById("email");
	const txtPassword = document.getElementById("password");
	const txtPasswordConfirm = document.getElementById("reEnterPassword");
	const btnCreateAccount = document.getElementById("createAccount");
	
	const txtAccountUserName = document.getElementById("username");
    console.log(document.getElementById("email"));
    console.log(txtPassword);
    console.log(txtPasswordConfirm);
    console.log(txtAccountUserName);
	//signup event
	btnCreateAccount.addEventListener('click', e => {
		//get email and password
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const pass2 = txtPasswordConfirm.value;
		const auth = firebase.auth();
		if(pass == pass2){
			//create user
			const promise = auth.createUserWithEmailAndPassword(email,pass);
			promise.catch(e => console.log(e.message));
		}else{
			alert("Please make sure your passwords match.");
		}
	});
	
	//add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
			console.log(firebaseUser.uid);
			// Add a new document in collection "users"
			firebase.firestore().collection("users").doc(firebaseUser.uid).set({
				username: txtAccountUserName.value,
			})
			.then(() => {
				console.log("Document successfully written!");
				//window.location = "accountMainPageAfterSignIn.html";
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});

			var user = firebase.auth().currentUser;

			user.sendEmailVerification().then(function() {
  			// Email sent.
			  alert("Please verify your account by going to your email.");
			  firebase.auth().signOut();
			  window.location = "index.html";
			}).catch(function(error) {
  			// An error happened.
			  alert(error);
			});
			
		}else{
			//window.location = "index.html";
			console.log("not logged in");
		}
	});
}());