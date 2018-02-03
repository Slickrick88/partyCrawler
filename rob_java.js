var config = {
  apiKey: "AIzaSyAb-Eg8PzUPHvjSZbD9x6DwLEzUL9Ap_dM",
  authDomain: "partycrawlerpeople.firebaseapp.com",
  databaseURL: "https://partycrawlerpeople.firebaseio.com",
  projectId: "partycrawlerpeople",
  storageBucket: "",
  messagingSenderId: "402396598323"
  };

  firebase.initializeApp(config);

var partyName = $("eventName").val().trim()
var host = $("Host").val().trim()
var partyTime = $("datetime").val().trim()
var addy = $("Address").val().trim()
var pplComing = $("Invitees").val().trim()
var stuff = $("Items").val().trim()

var partyObj = {
  Name: partyName,
  Location: addy,
  Event_Type: [],
  Kid_Friendly: true,
  Time: partyTime


}
