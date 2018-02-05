$(document).ready(function () {
  var partyName;
  var partyTime;
  var address;
  var city;
  var state;
  var host;
  var pplComing;
  var stuff;
  var addy;
  var timeTill;

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

  // Create Firebase event for adding events to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    //sets up the train objects in the dom
    event.preventDefault();
    host = childSnapshot.val().Host;
    partyName = childSnapshot.val().Name;
    addy = childSnapshot.val().Location;
    partyTime = childSnapshot.val().Time;
    var timeTill = moment().diff(moment(partyTime), "days");
    console.log("time until party: "+ timeTill);
    //posts events to the DOM
    $("#pendingEvents > tbody").append("<tr><td>" + partyTime + "</td><td>" + partyName + "</td><td>" +
      addy + "</td><td>" + host + "</td><td>" + timeTill + "</td></tr>");
  });
});

