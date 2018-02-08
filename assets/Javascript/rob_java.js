$(document).ready(function () {
  var partyName;
  var partyTime;
  var eventType;
  var address;
  var city;
  var state;
  var host;
  var pplComing;
  var stuff;
  var attire;
  var addy;
  var timeTill;
  var partyID;
  var counter;
  var timer;
  var childern;
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
    eventType = $("#eventType").val().trim();
    attire = $("#attire").val().trim();
    partyTime = $("#datetime").val().trim();
    address = $("#address-input").val().trim();
    city = $("#city-input").val().trim();
    childern = $("#child").val().trim();
    host = $("#host").val().trim();
    state = $("#state-input").val().trim();
    addy = address + " " + city + " " + state;

    console.log("name " + partyName);

    //reset entry form
    $("#partyCrawlerInput")[0].reset();

    //push to firebase
    database.ref().push({
      Name: partyName,
      Location: addy,
      Event_Type: eventType,
      Attire: attire,
      Kid_Friendly: childern,
      Time: partyTime,
      Host: host,
      Occurred: false,
      Items: [{
        Who: "NA",
        what: "NA",
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
    console.log(moment(partyTime).format("MM/DD/YYYY hh:mm:ss"));
    console.log("time until party: " + timeTill);

    //posts events to the DOM
    $("#pendingEvents > tbody").append("<tr class=rowID id='" + partyID + "'><td class=eventTime>" + (moment(partyTime).format("MM/DD/YYYY hh:mm:ss")) + "</td><td class=partyID>" + partyName + "</td><td class=location>" +
      addy + "</td><td class=host >" + host + "</td><td class=minutesTill>" + timeTill + "</td></tr>");

  });

  function partyDataRefresh() {
    var min = document.getObjectByClass("minutesTill");
    console.log("min element: " + min);
    for (i = 0; i < min.length; i++) {
      var timeLeft = min[i].html()
      console.log("testing" + timeLeft);
    }
  };

  function updateTime() {
    timer = setInterval(partyTime, 1 * 1000)
  };

  var table = $("#pendingEvents").DataTable();
  $("#pendingEvents tbody").on("click", "tr", function () {
    //remove items the were in the table previously
    $("#itemsTbl tbody tr").remove();
    //set a variable = to the row data
    var rowData = table.row($(this)).data();
    var test = document.getElementById(this);
    console.log("testing: "+rowData);  
    console.log(table.row(this).data());
    var database = firebase.database();
    var key = rowData.id;
    console.log("key is: " + key);
  });
});
