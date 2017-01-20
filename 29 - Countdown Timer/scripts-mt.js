// (function(){
  'use strict';
  const display = document.querySelector('.display');
  const timeLeft = display.querySelector('.display__time-left');
  const timeEnd = display.querySelector('.display__end-time');
  const buttons = document.querySelectorAll('[data-time]');
  const customTime = document.querySelector('#custom');

  let countdown;

  function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then, seconds);

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft < 0){
        clearInterval(countdown);
        return;
      }

      displayTimeLeft(secondsLeft);

    }, 1000)
  }

  function padZero(number) {
    return ('0' + number).slice(-2);
  }

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    // console.log(minutes, seconds);
    const remainderTime = padZero(minutes) + ':' + padZero(seconds % 60); 
    timeLeft.innerText = remainderTime;
    document.title = remainderTime;
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minute = end.getMinutes()
    const second = end.getSeconds();

    timeEnd.innerText = padZero(hour % 12) + ':' + padZero(minute) + ':' + padZero(second);
  }

  function startTimer(){
    const secondsRemaining = this.dataset.time;
    timer(secondsRemaining);
  }

  buttons.forEach(button => button.addEventListener('click', startTimer));
  
  customTime.addEventListener('submit', function(e) {
    e.preventDefault();
    const customTime = parseInt(this.minutes.value);
    timer(customTime * 60);
    this.reset();
  });

// }());