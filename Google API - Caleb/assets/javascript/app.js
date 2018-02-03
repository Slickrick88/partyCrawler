
    function initMap() {
      var UNCC ={
        eventName:"UNCC",
        coordinates:{lat:35.305960, lng:-80.732119}
      };
      var UNCCWalmart = {
        eventName:"UNCC walmart",
        coordinates:{lat:35.295516, lng:-80.758212}
      };
      var UNCCCity = {
        eventName:"UNCC City",
        coordinates:{lat:35.228444,lng: -80.834941}
      };
      var charlotte = {

        coordinates:{lat: 35.2271, lng: -80.8431}
      };


      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: charlotte.coordinates
      });

    addMarker(UNCC);
    addMarker(UNCCWalmart);
    addMarker(UNCCCity);
    
    function addMarker(location){
      var marker = new google.maps.Marker({
        position: location.coordinates,
        map: map,
        title:Location.eventName
      });


        console.log(location.eventName)
        var infoWindow = new google.maps.InfoWindow({
          content:location.eventName
        })
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
        
      
    }
 
    

    
    
    
 $(document).ready(function() {
  var addressToSearch="";
  
  //stores the lat and lng from findCoordinates and saves them here
  var tempCoords = {
    eventName: "",
    address:"",
    coordinates:"",
  };
    
  $("#addEvent").on("click",function(){
    event.preventDefault();
    var newDiv = $("<div id = event>");

    var eventName= $("#eventName-input").val().trim();
    var address= $("#address-input").val().trim();
    var city = $("#city-input").val().trim();
    var state = $("#state-input").val().trim();

    $(newDiv).append("<p>"+eventName+"</p>"+"<p>"+address+"</p>"+"<p>"+city+"</p>"+"<p>"+state+"</p>");
    $("#events").append(newDiv);

    addressToSearch = address + " " + city + " " + state;
    console.log("addressToSearch: "+ addressToSearch);
    
    tempCoords.eventName = eventName;
    tempCoords.address = addressToSearch;
    

    findCoordinates();
    
    $("#eventName-input").val("");
    $("#address-input").val("");
    $("#city-input").val("");
    $("#state-input").val("");
    
  });

  function findCoordinates(){
  
     var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressToSearch +"&key=AIzaSyCWa5eHnMAMi6rkFWh1pg_Ssxz8lTN6lQk";
 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response)
    {
      console.log(response);
      var eventLat = response.results[0].geometry.location.lat;
      var eventLng = response.results[0].geometry.location.lng;

      var formatLocation = {
        lat:eventLat ,
        lng: + eventLng 
      };
      console.log("lat: "+ eventLat + ", lng: " + eventLng);
      console.log(formatLocation);

      tempCoords.coordinates = formatLocation;
      addMarker(tempCoords);

     
     });
    } //function findCoordinates ends

});//jQuery ends
}//ends initMap