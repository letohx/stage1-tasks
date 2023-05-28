const time = document.querySelector('.time');
const dateString = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');


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