$(document).ready(function() {
  $.ajaxSetup({cache: false});
  
  $(document).on('mousemove', function(e) {
    $('.all').css({
      left: e.pageX / 75 - 5,
      top: e.pageY / 75 - 5
    });
  });

  var out = document.getElementById('weath');
  var city = document.getElementById('city');
  var country = document.getElementById('country');
  var t = document.getElementById('temp');
  var gradus = document.getElementById('gradus');
  
  if(navigator.geolocation) {
    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      
      
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude, function(data) {     
        city.innerHTML = data.name + ", ";
        country.innerHTML = data.sys.country;
        
        t.innerHTML =data.main.temp + " &#176";
        gradus.innerHTML = "C ";
        
        $('#gradus').on('click', function(c) {
          if(gradus.innerHTML === "F ") {
            t.innerHTML = data.main.temp + " &#176";
            gradus.innerHTML = "C ";
          } else {
            t.innerHTML = Math.floor(data.main.temp * 1.8) + 32 + " &#176";
            gradus.innerHTML = "F ";
          }
        });
        
        out.innerHTML = data.weather[0].main;
        $('#weath').append('<img src="' + data.weather[0].icon + '">');
      });
    };

    function error() {
      out.innerHTML = "Unable to retrieve your location";
    };
    navigator.geolocation.getCurrentPosition(success, error);
    
    
  }
});