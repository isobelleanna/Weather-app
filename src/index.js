function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let dateTime = document.querySelector("#date-time");
let now = new Date();
dateTime.innerHTML = formatDate(now);

function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#today-tempurature").innerHTML = Math.round(
    response.data.main.temp
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function changeCity(event) {
  event.preventDefault();
  let apiKey = "a9d342967b8c9019a17cfec6188776fb";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let element = document.querySelector("#button-addon2");
element.addEventListener("click", changeCity);

function fahrenheitTemperature() {
  let h3 = document.querySelector("h3#today-tempurature");
  h3.innerHTML = `Today | <strong>66</strong> ℉`;
}

let clickMeButton = document.querySelector("#fheight");
clickMeButton.addEventListener("click", fahrenheitTemperature);

function celciusTemperature() {
  let h3 = document.querySelector("h3#today-tempurature");
  h3.innerHTML = `Today | <strong>16</strong> ℃`;
}

let clickButton = document.querySelector("#cheight");
clickButton.addEventListener("click", celciusTemperature);

//let currentLocationButton = document.querySelector("#current-location-button");
//currentLocationButton.addEventListener("click", getCurrentLocation);
