function initMap() {
  
  // this is where the map will start
  var charlotte = {
    coordinates:{lat: 35.2271, lng: -80.8431}
  };


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: charlotte.coordinates
  });


function addMarker(location){
  var marker = new google.maps.Marker({
    position: location.coordinates,
    map: map,
    title:Location.eventName
    });

    var infoWindow = new google.maps.InfoWindow({
      content:location.eventName
    })
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  
  }



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

  //will hold information gathered from firebase to be used in both geocode and map
  var addressArray = [];
  var eventNameArray = [];
  var addressToSearch;
  var tempCoords = {
    eventName: "",
    address:"",
    coordinates:"",
  };

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
  database.ref().on("child_added", function (childSnapshot) {
    //sets up the train objects in the dom
    event.preventDefault();

    partyID = childSnapshot.key;
    console.log("partyID: " + partyID);
    host = childSnapshot.val().Host;
    partyName = childSnapshot.val().Name;
    addy = childSnapshot.val().Location;
    partyTime = childSnapshot.val().Time;
 
    //pushes to relevant array
      addressArray.push(addy);
      eventNameArray.push(partyName);
      
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("MM/DD/YYYY hh:mm:ss"));

    var timeTill = moment(partyTime).diff(currentTime, "days");
    console.log(moment(partyTime).format("MM/DD/YYYY hh:mm:ss"));
    console.log("time until party: " + timeTill);

    if (timeTill === -1)  {
      $(".rowID").val("");
    };
 
    //posts events to the DOM
    $("#pendingEvents > tbody").append("<tr class='rowID' data-key='" + partyID + "'><td class=partyTime'>" + (moment(partyTime).format("MM/DD/YYYY hh:mm:ss")) + "</td><td class='partyName'>" + partyName + "</td><td class=address>" +
      addy + "</td><td class=host>" + host + "</td><td class='minutesTill'>" + timeTill + "</td></tr>");

     
  });

 
  var table=$("#pendingEvents").DataTable();
  $("#pendingEvents tbody").on("click", "tr", function () {
    //remove items the were in the table previously
    $("#itemsTbl tbody tr").remove();
    //gets the key from the row that is clicked so it can retrieve data from firebase
    var key = $(this).data("key");
    console.log("testing: "+key); 
    
    database.ref(key+"");
    
  });
  
  // For Google Apis
    // waits for all children to be added to array
    
      var count = 0;
      setInterval(function(){
        if(count < eventNameArray.length){
      eventName = eventNameArray[count];
      addressToSearch = addressArray[count];

      searchAndAdd();
        }
        count++;
    }, 500);

    function searchAndAdd(){
      tempCoords.eventName = eventName;
      tempCoords.address = addressToSearch;
      findCoordinates();
    };
  
    function findCoordinates(){
    
       var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressToSearch +"&key=AIzaSyCWa5eHnMAMi6rkFWh1pg_Ssxz8lTN6lQk";
   
      $.ajax({
          url: queryURL,
          method: "GET"
      }).done(function(response)
      {
        
        var eventLat = response.results[0].geometry.location.lat;
        var eventLng = response.results[0].geometry.location.lng;
  
        var formatLocation = {
          lat:eventLat ,
          lng: eventLng 
        };
        console.log("lat: "+ eventLat + ", lng: " + eventLng);
       
  
        tempCoords.coordinates = formatLocation;
        addMarker(tempCoords);
  
       
       });
      } //function findCoordinates ends
});
}//ends initMap