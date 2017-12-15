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
  var ids = ['#temp1', '#temp2', '#temp3', '#temp4', '#temp5', '#temp6'];
  var lats = ['50.434341', '40.730610', '52.520008', '52.237049', '48.864716', '51.509865'];
  var longs = ['30.527756', '-73.935242', '13.404954', '21.017532', '2.349014', '-0.118092'];
  
  for(var i = 1; i < 7; i++) { 
        (function(i){$.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lats[i-1] + "&lon=" + longs[i-1], function(dat) {
          $('#temp' + i).append(dat.main.temp + " &#176" + "C " + dat.weather[0].main + '<img src="' + dat.weather[0].icon + '">');
          console.log(i);
        })})(i);
  }     
  
  if(navigator.geolocation) {
    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      
      
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude, function(data) {     
        city.innerHTML = data.name + ", ";
        country.innerHTML = data.sys.country;
        
        t.innerHTML = data.main.temp + " &#176";
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
      city.innerHTML = "Unable to retrieve your location";
    };
    navigator.geolocation.getCurrentPosition(success, error);
    
    
  }
});