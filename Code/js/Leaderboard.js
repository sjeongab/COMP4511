

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD80hNjHJdSQXmLZOfNWg8gtTGlCWaogOw",
    authDomain: "hamsterdb-10831.firebaseapp.com",
    databaseURL: "https://hamsterdb-10831-default-rtdb.firebaseio.com",
    projectId: "hamsterdb-10831",
    storageBucket: "hamsterdb-10831.appspot.com",
    messagingSenderId: "216089999867",
    appId: "1:216089999867:web:088e671d90eec49ecab35e"
  };

  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var uid = database.ref('rank/').push();
  function writeScore(name="John Doe", score) {
      uid.set({name: name, score: score});
    }