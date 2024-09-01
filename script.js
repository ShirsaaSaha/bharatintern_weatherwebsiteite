function getWeather() {
    const apiKey = '30b3ddda2f5cbb2fa78f5ac80bcda15e';
    const cityName = document.getElementById('city').value;

    if (!cityName) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(weatherData => {
            displayWeather(weatherData);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(forecastData => {
            displayHourlyForecast(forecastData.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(weatherData) {
    const temperatureContainer = document.getElementById('temperature-div');
    const weatherInfoContainer = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastContainer = document.getElementById('hourly-forecast');

    weatherInfoContainer.innerHTML = '';
    hourlyForecastContainer.innerHTML = '';
    temperatureContainer.innerHTML = '';

    if (weatherData.cod === '404') {
        weatherInfoContainer.innerHTML = `<p>${weatherData.message}</p>`;
    } else {
        const cityName = weatherData.name;
        const temperatureCelsius = Math.round(weatherData.main.temp - 273.15);
        const weatherDescription = weatherData.weather[0].description;
        const weatherIconCode = weatherData.weather[0].icon;
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperatureCelsius}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${weatherDescription}</p>
        `;

        temperatureContainer.innerHTML = temperatureHTML;
        weatherInfoContainer.innerHTML = weatherHtml;
        weatherIcon.src = weatherIconUrl;
        weatherIcon.alt = weatherDescription;

        showWeatherIcon();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastContainer = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); 

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); 
        const hour = dateTime.getHours();
        const temperatureCelsius = Math.round(item.main.temp - 273.15); 
        const weatherIconCode = item.weather[0].icon;
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${weatherIconUrl}" alt="Hourly Weather Icon">
                <span>${temperatureCelsius}°C</span>
            </div>
        `;

        hourlyForecastContainer.innerHTML += hourlyItemHtml;
    });
}

function showWeatherIcon() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; 
}
