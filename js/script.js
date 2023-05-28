const time = document.querySelector('.time');
const dateString = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

// Сlock and Сalendar

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();

  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
};
showTime();

function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-US', options);

  dateString.textContent = currentDate;
};


// Greeting

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if ((hours >=0) && (hours < 6)) {
      timeOfDay = "night";
  } else if ((hours >=6) && (hours < 12)) {
      timeOfDay = "morning";
  } else if ((hours >=12) && (hours < 18)) {
      timeOfDay = "afternoon";
  } else if ((hours >=18) && (hours < 24)) {
      timeOfDay = "evening";
  };  

  return timeOfDay;
};  

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay},`;

  greeting.textContent = greetingText;
};

function setLocalStorage() {
  if(name) {
    localStorage.setItem('name', name.value);
  };
};
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  };
};
window.addEventListener('load', getLocalStorage);


// Image slider

let randomNum;

function getRandomNum() { 
    randomNum = Math.floor( (20 * Math.random()) + 1 );
};
getRandomNum();

function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = String(randomNum).padStart(2, "0");
  const bgLink = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  let img = new Image();

  img.src = bgLink;
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${bgLink})`;
  }; 
};
setBg();

function getSlideNext() {
  randomNum = (randomNum < 20) ? (randomNum += 1) : 1;
  setBg();
};

function getSlidePrev() {
  randomNum = (randomNum > 1) ? (randomNum -= 1) : 20;
  setBg();
};

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


// Weather widget

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=efa7a758e84992cc2a2543cb878a4812&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
  }
  getWeather()

  city.addEventListener("change", (event) => {
    getWeather();
  });

  function setLocalStorageWeather() {
    if(city) {
      localStorage.setItem('city', city.value);
    };
  };
  window.addEventListener('beforeunload', setLocalStorageWeather);
  
  function getLocalStorageWeather() {
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    };
    getWeather()
  };
  window.addEventListener('load', getLocalStorageWeather);