

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
  function writeScore(mode, name="John Doe", score) {
      var ref = database.ref(mode);
      ref.push().set({name: name, score: score});
}

function showRank(mode="EASY"){
  database.ref(mode).orderByChild("score").limitToLast(3).on("child_added", function(snapshot){
      console.log(snapshot.val());
  });
}

function main_row(){
  var main_row = document.createElement("tr");
  var main_col1 = document.createElement("td");
  var main_col2 = document.createElement("td");
  var main_col3 = document.createElement("td");
  main_col1.innerText = "RANK";
  main_col2.innerText = "NAME";
  main_col3.innerText = "SCORE";
  main_row.appendChild(main_col1);
  main_row.appendChild(main_col2);
  main_row.appendChild(main_col3);
  return main_row;
}

function loadRank(mode){
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById("TAB_"+mode).style.display = "block";
  //var tableBody = document.getElementById('RANK_HARD');
  
  var table = document.getElementById("TABLE_"+mode);
  table.innerHTML = "";
  var row = table.insertRow(0);
  var col1 = row.insertCell(0);
  var col2 = row.insertCell(1);
  var col3 = row.insertCell(2);
  col1.innerText = "RANK";
  col2.innerText = "NAME";
  col3.innerText = "SCORE";

  var rank = database.ref(mode);
  var i = 3;
  rank.orderByChild("score").limitToLast(3).on("child_added", function(snapshot){
    row = table.insertRow(1);
    col1 = row.insertCell(0);
    col2 = row.insertCell(1);
    col3 = row.insertCell(2);
    col1.innerText = i;
    col2.innerText = snapshot.child("name").val();
    col3.innerText = snapshot.child("score").val();
    i-=1;
  });

}
