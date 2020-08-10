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
  let tempuratureElement = document.querySelector("#today-tempurature");

  document.querySelector("#current-city").innerHTML = response.data.name;
  nowCelciusTemperature = response.data.main.temp;
  tempuratureElement.innerHTML = Math.round(nowCelciusTemperature);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
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

function fahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = (nowCelciusTemperature * 9) / 5 + 32;
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempuratureElement = document.querySelector("#today-tempurature");
  tempuratureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fheight");
fahrenheitLink.addEventListener("click", fahrenheitTemperature);

function celciusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let tempuratureElement = document.querySelector("#today-tempurature");
  tempuratureElement.innerHTML = Math.round(nowCelciusTemperature);
}

let celciusLink = document.querySelector("#cheight");
celciusLink.addEventListener("click", celciusTemperature);

let nowCelciusTemperature = null;

//let currentLocationButton = document.querySelector("#current-location-button");
//currentLocationButton.addEventListener("click", getCurrentLocation);
