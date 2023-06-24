const apiKey = "31a7151816c0150e0921f976ce9d8af9";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    //visa inte väder om sökningen resulterar i error
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    console.log(data);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
//intervall utifrån sökt stad
setInterval(() => {
  checkWeather(searchBox.value);
}, 1 * 60 * 1000);

// Hämta element från DOM för att visa tid och datum
const city = document.getElementById("city");
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");

// uppdatera tid och datum
function updateDateTime() {
  // hämta aktuell tid för den valda staden
  const currentCityTime = new Date().toLocaleTimeString("sv-SE", {
    timeZone: "Europe/Stockholm",
  });

  // hämta aktuellt datum
  const currentDate = new Date().toLocaleDateString("sv-SE");

  // Uppdatera tid och datum på sidan
  timeElement.textContent = `Tid: ${currentCityTime}`;
  dateElement.textContent = `Datum: ${currentDate}`;
}

// uppdatera tid och datum varje sekund
setInterval(updateDateTime, 1000);
