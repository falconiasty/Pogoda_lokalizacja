document.addEventListener("DOMContentLoaded", function(event) {

var geo = navigator.geolocation;

if(geo) {
  geo.getCurrentPosition(function(location) {
    console.log('Szerokość ' + location.coords.latitude);
    console.log('Długość ' + location.coords.longitude);

    var  coords = 'http://api.openweathermap.org/data/2.5/weather?lat='+location.coords.latitude+'&lon='+location.coords.longitude+'\&APPID=5fdf06236055565849ed4d0e8f85bd58';
    console.log(coords);

    fetch(coords)
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
            var temp = resp.main.temp-273.15; // temperatura
            var pressure = resp.main.pressure; // cisnienie
            var humidity = resp.main.humidity; // wilgotnosc
            var sunrise = unixtodate(resp.sys.sunrise); //wschod
            var sunset = unixtodate(resp.sys.sunset); //zachod
            var wind_speed = resp.wind.speed;
            var wind_angle = resp.wind.deg;
            var weather_descriptionIcon = resp.weather[0].icon;
            console.log(weather_descriptionIcon);

            console.log(temp);
            var  miasto = document.getElementById("miasto");
            miasto.textContent = resp.name.toUpperCase();

            var  tempe = document.getElementById("tempe");
            tempe.textContent = temp+"℃";

            document.getElementById("icon_sun").src = "http://openweathermap.org/img/w/"+weather_descriptionIcon+".png";

             document.getElementById("pressure").textContent = pressure+" hPa";
             document.getElementById("humidity").textContent = humidity+" %";
             document.getElementById("wind_speed").textContent = wind_speed+" m/s";
             document.getElementById("wind_angle").textContent = wind_angle +" \| "+ windAngle(wind_angle);
             document.getElementById("sunrise").textContent = sunrise;
             document.getElementById("sunset").textContent = sunset;
             const currentDate = new Date();
             document.getElementById("data").textContent = "Dzień: " + currentDate.getDate() + "." + (currentDate.getMonth()+1) + "." + currentDate.getFullYear()+"r";;
              ;})



      });



}
else {

  console.log('niedostepne');


}
function windAngle(angle){
  if(angle>=10 && angle<80){
    return "NE";  }
  else if(angle>=80 && angle<100){
      return "E"; }
  else if(angle>=100 && angle<170){
          return "SE"; }
  else if(angle>=170 && angle<190){
          return "S"; }
  else if(angle>=190 && angle<260){
          return "SW"; }
  else if(angle>=260 && angle<280){
          return "W"; }
  else if(angle>=280 && angle<350){
          return "NW"; }
  else if(angle>=350 && angle<=360){
          return "N"; }
  else if(angle>=0 && angle<10){
          return "N"; }
  }



function unixtodate(unix_time){

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_time*1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}

function getCity(){
  var city_name = document.getElementById("city").value;
  return city_name;
  console.log(city_name)
}

});
