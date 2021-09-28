//print date and hour

let now = new Date();
let year = now.getFullYear();

let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = monthName[now.getMonth()];

let dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = dayName[now.getDay()];
let dayOfMonth = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let actualDate = document.querySelector("#actual-date");
actualDate.innerHTML = `${month}, ${dayOfMonth} - ${year}`;

let actualHour = document.querySelector("#actual-hour");

if (minutes < 10) {
  actualHour.innerHTML = `${day} - ${hour}:0${minutes} `;
} else {
  actualHour.innerHTML = `${day} - ${hour}:${minutes}`;
}

window.load = getCurrentPosition();

let unit = "C";
let apiKey = "0e49051742904728363d076005947b7c";

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

let actualCity = document.querySelector("#searching");
actualCity.addEventListener("submit", showDataByCity);

function showDataByCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#type-city");
  let userCityName = cityName.value;
  axios
    .get(getCurrentForecastByCityName(userCityName))
    .then(updateDataMainForecast);
}

function showCurrentLocationData(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  axios
    .get(getCurrentForecastByPosition(latitude, longitude))
    .then(updateDataMainForecast);

  showPosisitionForecast5Days(position);
}

//change the main box data

function updateDataMainForecast(response) {
  console.log(response);
  temperature = Math.round(response.data.main.temp);
  let location = response.data.name;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}ºC`;

  let mainForecast = document.querySelector("#main-forecast");
  mainForecast.innerHTML = response.data.weather[0].main;

  let minMainForecast = document.querySelector("#min-main-forecast");
  minMainForecast.innerHTML = Math.round(response.data.main.temp_min) + "ºC";

  let maxMainForecast = document.querySelector("#max-main-forecast");
  maxMainForecast.innerHTML = Math.round(response.data.main.temp_max) + "ºC";

  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = location;

  let linkIcon = response.data.weather[0].icon;

  let icon = document.querySelector("#icon-main-forecast");
  icon.src = `http://openweathermap.org/img/wn/${linkIcon}@2x.png`;
}

let temperature;

function updateForecast5Days(response) {
  console.log(response);
  //Day 1
  let day1 = document.querySelector("#day1");
  day1.innerHTML = getDate(response.data.daily[1].dt);

  let day1Forecast = document.querySelector("#day1-forecast");
  day1Forecast.innerHTML = capitalizeStringForecast5Days(
    response.data.daily[1].weather[0].description
  );

  let minDay1 = document.querySelector("#min-day1");
  minDay1.innerHTML = Math.round(response.data.daily[1].temp.min) + "ºC";

  let maxDay1 = document.querySelector("#max-day1");
  maxDay1.innerHTML = Math.round(response.data.daily[1].temp.max) + "ºC";

  //day 2
  let day2 = document.querySelector("#day2");
  day2.innerHTML = getDate(response.data.daily[2].dt);

  let day2Forecast = document.querySelector("#day2-forecast");
  day2Forecast.innerHTML = capitalizeStringForecast5Days(
    response.data.daily[2].weather[0].description
  );

  let minDay2 = document.querySelector("#min-day2");
  minDay1.innerHTML = Math.round(response.data.daily[2].temp.min) + "ºC";

  let maxDay2 = document.querySelector("#max-day2");
  maxDay1.innerHTML = Math.round(response.data.daily[2].temp.max) + "ºC";

  //day 3
  let day3 = document.querySelector("#day3");
  day3.innerHTML = getDate(response.data.daily[3].dt);

  let day3Forecast = document.querySelector("#day3-forecast");
  day3Forecast.innerHTML = capitalizeStringForecast5Days(
    response.data.daily[3].weather[0].description
  );

  let minDay3 = document.querySelector("#min-day3");
  minDay3.innerHTML = Math.round(response.data.daily[3].temp.min) + "ºC";

  let maxDay3 = document.querySelector("#max-day3");
  maxDay3.innerHTML = Math.round(response.data.daily[3].temp.max) + "ºC";

  //day 4
  let day4 = document.querySelector("#day4");
  day4.innerHTML = getDate(response.data.daily[4].dt);

  let day4Forecast = document.querySelector("#day4Forecast");
  day4Forecast.innerHTML = capitalizeStringForecast5Days(
    response.data.daily[4].weather[0].description
  );

  let minDay4 = document.querySelector("#min-day4");
  minDay4.innerHTML = Math.round(response.data.daily[4].temp.min) + "ºC";

  let maxDay4 = document.querySelector("#max-day4");
  maxDay4.innerHTML = Math.round(response.data.daily[4].temp.max) + "ºC";

  //day 5
  let day5 = document.querySelector("#day5");
  day5.innerHTML = getDate(response.data.daily[5].dt);

  let day5Forecast = document.querySelector("#day5-forecast");
  day5Forecast.innerHTML = capitalizeStringForecast5Days(
    response.data.daily[5].weather[0].description
  );

  let minDay5 = document.querySelector("#min-day5");
  minDay5.innerHTML = Math.round(response.data.daily[5].temp.min) + "ºC";

  let maxDay5 = document.querySelector("#max-day5");
  maxDay5.innerHTML = Math.round(response.data.daily[5].temp.max) + "ºC";
}

function showPosisitionForecast5Days(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  axios
    .get(getForecast5DaysByPosition(latitude, longitude))
    .then(updateForecast5Days);
}

function getDate(timeStamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fry", "Sat"];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let theDate = new Date(timeStamp * 1000);
  let dateString = theDate.getDate();
  let dayString = theDate.getDay();
  let monthString = theDate.getMonth();

  return `${dateString}/${months[monthString - 1]}  ${days[dayString]}`;
}

function capitalizeStringForecast5Days(string) {
  let stringCapitalize = string.charAt(0).toUpperCase() + string.slice(1);
  return stringCapitalize;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(
    showCurrentLocationData,
    showPosisitionForecast5Days
  );
}

function getCurrentForecastByCityName(userCityName) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${userCityName}&appid=${apiKey}&units=metric`;
}

function getCurrentForecastByPosition(latitude, longitude) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
}

function getForecast5DaysByPosition(latitude, longitude) {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeUnitToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeUnitToCelsius);

function changeUnitToFahrenheit(event) {
  event.preventDefault();
  if (unit !== "F") {
    let temperatureElement = document.querySelector("#temperature");
    let toFahrenheit = (temperature * 9) / 5 + 32;

    temperatureElement.innerHTML = `${Math.round(toFahrenheit)} ºF`;
    return (unit = "F");
  }
}

function changeUnitToCelsius(event) {
  event.preventDefault();
  if (unit !== "C") {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}ºC`;
    return (unit = "C");
  }
}
