$(document).ready(function () {
  var partyName;
  var partyTime;
  var address;
  var city;
  var state;
  var host;
  var pplComing;
  var stuff;

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
    partyName = $("#eventName").val().trim();
    partyTime = $("#datetime").val().trim();
    address = $("#address-input").val().trim();
    city = $("#city-input").val().trim();
    host = $("#host").val().trim();
    state = $("#state-input").val().trim();
    pplComing = $("#invitees").val().trim();
    stuff = $("#items").val().trim();
    addy = address + " " + city + " " + state;
    console.log("name " + partyName);

    //reset entry form
    $("#partyCrawlerInput")[0].reset();
    //push to firebase
    database.ref().push({
      Name: partyName,
      Location: addy,
      Event_Type: "NA",
      Kid_Friendly: true,
      Time: partyTime,
      Host: host,
      Occurred: true,
      People: [{
        guest: pplComing
      }],
      Items: [{
        itemDescription: stuff,
        itemTaken: false,
        takeBy: "NA"
      }]
    });
  });
});

