let API_KEY = 'f6fdff531d2d0185f902b7e4849f82f3';

let cityInputField = document.querySelector('input[placeholder="Search Your City"]');
let searchCityButton = document.querySelector('button.bg-blue-500');

let latitude = 13.0737328;
let longitude = 80.2209665;
let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

fetch(api)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return response.json();
    })
    .then(weatherData => {
        display(weatherData);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Please try again and check your input name.');
    });

searchCityButton.addEventListener('click', () => {
    let cityName = cityInputField.value.trim();
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(weatherData => {
            display(weatherData);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('not fetch weather data. Please try again.');
        });
});

function display(weatherData) {
    let cityName = document.querySelector('h2.text-3xl');
    let temperature = document.querySelector('p.text-2xl');
    let weatherIcon = document.querySelector('img');
    let weatherDescription = document.querySelector('p.text-lg');
    let dateTime = document.querySelector('p.text-sm');

    cityName.textContent = weatherData.name;
    temperature.textContent = `${weatherData.main.temp}°C`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    weatherIcon.alt = ` ${weatherData.weather[0].description}`;
    weatherDescription.textContent = `Description: ${weatherData.weather[0].description}`;
    dateTime.textContent = new Date().toLocaleString();
}
