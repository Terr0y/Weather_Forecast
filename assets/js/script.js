$(document).ready(function () {
  const ApiKey = `359fbb9063e60407b575e9a14683190b`;
  $("#search-form").on("submit", function (e) {
    e.preventDefault();
    const city = $("#search-input").val();
    console.log(city);
    if (city) {
      getWeather(city);
      getForecast(city);
      addCityToHistory(city);
    }
  });

  function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
    fetch(url)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // Simulated data; replace with API call

        const currentWeather = {
          city: data.name,
          date: new Date(),
          icon: "Rainy",
          temp: `${data.main.temp} °C`,
          wind: `${data.wind.speed} KPH`,
          humidity: `${data.main.humidity}%`,
        };

        // Populate the weather-section with current weather
        const weatherHtml = `
        <h2>${currentWeather.city} (${currentWeather.date})</h2>
        <div>Icon: ${currentWeather.icon}</div>
        <div>Temperature: ${currentWeather.temp}</div>
        <div>Wind Speed: ${currentWeather.wind}</div>
        <div>Humidity: ${currentWeather.humidity}</div>
      `;
        $("#today").html(weatherHtml);
      });
  }

  function getForecast(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}&units=metric`;
    fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        let forecastHtml = "<h3>5-Day Forecast:</h3>";
        for (let i = 0; i < data.list.length; i += 8) {
          const day = data.list[i];
          forecastHtml += `
              <div class="col-md-2 forecast-card">
                <div class="card text-center">
                  <div class="card-body">
                    <h5 class="card-title">${new Date(
                      day.dt_txt
                    ).toDateString()}</h5>
                    <img src="http://openweathermap.org/img/wn/${
                      day.weather[0].icon
                    }.png" alt="Weather icon">
                    <p class="card-text">Temp: ${day.main.temp}°C</p>
                    <p class="card-text">Wind: ${day.wind.speed} KPH</p>
                    <p class="card-text">Humidity: ${day.main.humidity}%</p>
                  </div>
                </div>
              </div>
            `;
        }
        $("#forecast").html(forecastHtml);
      });
  }

  function addCityToHistory(city) {
    const cityButton = $("<button>")
      .addClass("btn btn-secondary btn-block my-1 city-button")
      .text(city)
      .click(function () {
        getWeather(city);
        getForecast(city);
      });
    $("#search-history").append(cityButton);
  }
});
