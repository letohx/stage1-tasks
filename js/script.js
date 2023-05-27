// Сlock and Сalendar

const time = document.querySelector('.time');
const dateString = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

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

function showGreeting() {
    const date = new Date();
  const hours = date.getHours();

  function getTimeOfDay() {
    let timeOfDay;

    if ((hours >=0) &&(hours < 6)) {
        timeOfDay = "night";
    } else if ((hours >=6) &&(hours < 12)) {
        timeOfDay = "morning";
    } else if ((hours >=12) &&(hours < 18)) {
        timeOfDay = "afternoon";
    } else if ((hours >=18) &&(hours < 24)) {
        timeOfDay = "evening";
    };  

    return timeOfDay;
  };  

  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay},`;
  greeting.textContent = greetingText;
};

function setLocalStorage() {
    if (name) {
      localStorage.setItem('name', name.value);
    };
  }
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);








