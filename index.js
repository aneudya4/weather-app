const weatherImg = document.querySelector('.img-container figure img');
const dateSpan = document.querySelector('.city-data span');
const input = document.querySelector('input');
const form = document.querySelector('form');
const cityHeading = document.querySelector('h1');
const temperature = document.querySelector('p');
const windInfo = document.querySelector('ul li span.wind');
const maxTempInfo = document.querySelector('ul li span.max-temp');
const humidityInfo = document.querySelector('ul li span.humidity');
const unicode = document.querySelector('.uni-code');
const imgCaption = document.querySelector('figcaption');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value) {
    alert('input cant be empty');
    return;
  }
  getWeather(input.value);
  input.value = '';
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=239bda12834b811be00c5e7001bc0f84
  `;

  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      unicode.hidden = false;
      cityHeading.textContent = data.name;
      temperature.textContent = `${covertToFahrenheit(data.main.temp)}`;
      temperature.appendChild(unicode);
      humidityInfo.textContent = `${data.main.humidity}%`;
      maxTempInfo.textContent = `${covertToFahrenheit(data.main.temp_max)}${
        unicode.textContent
      }`;
      windInfo.textContent = `${data.wind.speed}km/h`;
      weatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherImg.alt = data.weather[0].main;
      imgCaption.textContent = data.weather[0].description;
    })
    .catch((error) => {
      alert('city not found');
    });
}

function covertToFahrenheit(temp) {
  return Math.floor(1.8 * (temp - 273) + 32);
}

function setDate() {
  var now = new Date();

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let dayOfTheMonth = now.getDate();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  dateSpan.textContent = `${day}  ${month} ${dayOfTheMonth}, ${year}`;
}

window.addEventListener('load', (event) => {
  setDate();
  getWeather('san francisco');
});
