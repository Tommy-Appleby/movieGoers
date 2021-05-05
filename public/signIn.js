(function() {
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
	const signIn = document.getElementById("signIn");
	const forgotPasswordBtn = document.getElementById("forgotPassword");
	//const dontHaveAnAccountSignUp = document.getElementById("dontHaveAnAccountSignUp");
	const txtEmail = document.getElementById("email");
	const txtPassword = document.getElementById("password");
	
	//signIn event
	signIn.addEventListener('click', e => {
		//get email and password
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		if(email == ""){
			alert("Please enter your email.");
		}else if(pass == ""){
			alert("Please enter your password.");
		}
		//sign in
		const promise = auth.signInWithEmailAndPassword(email,pass);
		promise.catch(e => alert(e.message));
	});

	//forgot password event
	forgotPasswordBtn.addEventListener('click', e => {
		//get email and password
		if(email.value == ""){
			alert("Please enter your email then click forgot password.");
		}else{
		const email = txtEmail.value;
		const auth = firebase.auth();
		//sign in
		const promise = auth.sendPasswordResetEmail(email);
		promise.catch(e => console.log(e.message));
		alert("Check your email to reset your password.");
		}
	});
	
	/*dontHaveAnAccountSignUp.addEventListener('click', e => {
		window.location.href = "createAnAccount.html";
	});*/
	
	//add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
			window.location.href = "createAnEvent.html";
		}else{
			console.log("not logged in");
		}
	});
}());