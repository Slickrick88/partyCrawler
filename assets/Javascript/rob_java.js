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
  var partyID;
  var counter;
  var timer;

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
    counter++;
    partyID = childSnapshot.key;
    console.log("partyID: " + partyID);
    host = childSnapshot.val().Host;
    partyName = childSnapshot.val().Name;
    addy = childSnapshot.val().Location;
    partyTime = childSnapshot.val().Time;
    var timeTill = moment().diff(moment(partyTime), "days");
    console.log("time until party: " + timeTill);
    //posts events to the DOM

    $("#pendingEvents > tbody").append("<tr class='rowID' id='" + partyID + "'><td class=partyTime'>" + partyTime + "</td><td class='partyName'>" + partyName + "</td><td class=address>" +
      addy + "</td><td class=host>" + host + "</td><td class='minutesTill'>" + timeTill + "</td></tr>");

  });

  function partyDataRefresh() {
    var min = document.getObjectByClass("minutesTill");
    console.log("min element: " + min);
    for (i = 0; i < min.length; i++) {
      var timeLeft = min[i].html()
      console.log(timeLeft)
    }
  };

  function updateTime() {
    timer = setInterval(partyTime, 1 * 1000)
  };
 
  var table=$("#pendingEvents").DataTable();
  $("#pendingEvents tbody").on("click", "tr", function () {
    var rowData = table.row($(this).parents("tr").data());
    console.log("row data:" + rowData);
    $("#itemsTbl tbody tr").remove()
    var database = firebase.database();
    var key ="";
    key = this.id;
    console.log("key is: " + key);
    database.ref(key + '/Host').once('value').then(function (snapshot) {
      host = snapshot.val();
      console.log("host pulled: " + host);
    }, function (error) {
      console.log(error);
    });
    database.ref(key + '/Items').on("child_added", function (childSnapshot) {
      var itemKey = childSnapshot.val().key;
      var itemDescription = childSnapshot.val().itemDescription;
      var itemTaken = childSnapshot.val().itemTaken;
      if (itemTaken === true) {
        var itemTakenDesc = "Claimed"
      }
      else {
        var itemTakenDesc = "Open"
      };
      var takenBy = childSnapshot.val().takeBy;
      console.log("items pulled: " + itemDescription);
      console.log("items take?: " + itemTaken);
      console.log("taken by whom: " + takenBy);
      //add to html dom to see what everyone is bringing
      $("#itemsTbl > tbody").append("<tr class='rowID' data-key='" + itemKey + "'><td>" + itemDescription + "</td><td class='" +
        itemTaken + "'>" + itemTakenDesc + "</td><td>" + takenBy + "</td></tr>");
    }, function (error) {
      console.log(error);
    });
  });
});
