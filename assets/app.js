const apiKey = '65d8e3386e46335b26faada96528f6b0';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

var weatherIcon = document.querySelector('.weather-icon');
var cityElement = document.querySelector('.city');
var tempElement = document.querySelector('.temp');
var humidityElement = document.querySelector('.humidity');
var windElement = document.querySelector('.wind');
var weatherDetails = document.querySelector('.weather-details');

weatherDetails.style.display = 'none';

async function checkWeather(city) {
    if (!city) {
        weatherDetails.style.display = 'none';
        return;
    }
    
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    if (data.cod === 200) {
        weatherDetails.style.display = 'block'; 

        cityElement.innerHTML = data.name;
        tempElement.innerHTML = Math.round(data.main.temp) + '°C';
        humidityElement.innerHTML = data.main.humidity + '%';
        windElement.innerHTML = data.wind.speed + ' km/h';

        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = 'assets/img/cloudy-forecast-svgrepo-com.svg';
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = 'assets/img/egg-sunny-side-up-svgrepo-com.svg';
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = 'assets/img/rain-svgrepo-com (2).svg';
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = 'assets/img/cloud-drizzle-svgrepo-com.svg';
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = 'assets/img/mist-svgrepo-com.svg';
        } else if (data.weather[0].main === 'Snow') {
            weatherIcon.src = 'assets/img/snowing-forecast-svgrepo-com.svg';
        }
    } else {
        weatherDetails.style.display = 'none';
        alert("City not found!");
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});
