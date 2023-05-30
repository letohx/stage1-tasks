const time = document.querySelector('.time');
const dateString = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const audio = document.querySelector('audio');
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');





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

function getRandomNum(n) { 
    randomNum = Math.floor( (n * Math.random()) + 1 );
};
getRandomNum(20);

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

city.value = city.value == true ? city.value : "Braslaw";

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=efa7a758e84992cc2a2543cb878a4812&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
    humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`;
}
getWeather();

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
  getWeather();
};
window.addEventListener('load', getLocalStorageWeather);


// Quote of the day

let randomNumCitations;

async function getQuotes() {  
  const res = await fetch('js/data.json');
  const data = await res.json(); 
  
  randomNumCitations = Math.floor(((data.length) * Math.random()));
  quote.textContent = data[randomNumCitations].text;
  author.textContent = data[randomNumCitations].author;
  };
getQuotes();
changeQuote.addEventListener('click', getQuotes);


// Audio player

import playList from './playList.js';

let isPlay = false;
let playNum = 0;

function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    toggleBtn();
  } else {
    audio.pause();
    isPlay = false;
    toggleBtn();
  };
  stylePlayItems();
};
playBtn.addEventListener('click', playAudio);

function toggleBtn() {
  if (!isPlay) {
    playBtn.classList.remove('pause');
  } else {
    playBtn.classList.add('pause');
  };
};
playBtn.addEventListener('click', toggleBtn);

function playNext() {
  playNum = (playNum < (playList.length - 1)) ? (playNum += 1) : 0;
  isPlay = false;
  document.querySelectorAll('.item-active').forEach(el => {
    el.classList.remove('item-active');
  });
  playAudio();
  toggleBtn();
};
playNextBtn.addEventListener('click', playNext);

function playPrev() {
  playNum = (playNum > 0) ? (playNum -= 1) : (playList.length - 1);
  isPlay = false;
  document.querySelectorAll('.item-active').forEach(el => {
    el.classList.remove('item-active');
  });
  playAudio();
  toggleBtn();
};
playPrevBtn.addEventListener('click', playPrev);

playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li);
});

function stylePlayItems() {
  if (!isPlay ) {
    document.querySelectorAll('.item-active').forEach(el => {
      el.classList.remove('item-active');
    });
  } else {
    document.querySelectorAll('.play-list li')[playNum].classList.add('item-active');
  };
};

const arrElem = document.querySelectorAll('.play-item');
const arrayElem = [];

for (let i = 0; i < playList.length; i++){
  arrayElem.push(arrElem[i]);
  arrElem[i].addEventListener('click', function(e){
    playNum = arrayElem.indexOf(e.target);
    playAudio();
  });
};


