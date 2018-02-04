$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyAb-Eg8PzUPHvjSZbD9x6DwLEzUL9Ap_dM",
    authDomain: "partycrawlerpeople.firebaseapp.com",
    databaseURL: "https://partycrawlerpeople.firebaseio.com",
    projectId: "partycrawlerpeople",
    storageBucket: "partycrawlerpeople.appspot.com",
    messagingSenderId: "402396598323"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();
  console.log("test");
  $("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("test2");
    var partyName = $("#eventName").val().trim();
    var partyTime = $("#datetime").val();
    var address = $("#address-input").val();
    var city = $("#city-input").val();
    var host = $("#Host").val();
    var state = $("#state-input").val();
    var pplComing = $("#Invitees").val();
    var stuff = $("#Items").val();
    addy = address + " " + city + " " + state;
    console.log("name " + partyName);
    database.ref().push({

      Name: partyName,
      Location: addy,
      Event_Type: "NA",
      Kid_Friendly: true,
      Time: partyTime,
      Host: host,
      Occurred: true,
      People: [{
        Invitees: pplComing
      }],
      Items: stuff
      //console.log()
    });
  });
});

