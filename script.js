let timer = document.querySelector('.timer');
let sessionTime = 1500;
let breakTime = 300;
let session = true;
let countdown;
let pause = true;

document.querySelectorAll('.play-btn').forEach(button => {
  button.addEventListener('click', e => {
    let name = e.target.name;
    (name == 'reset') ? reset() : (name == 'stop') ? stop() : playPause();
  });
});

document.querySelectorAll('input').forEach(setting => {
  setting.addEventListener('change', e => {
    let settingValue = e.target.value;
    if (Number.isInteger(+settingValue)) updateSetting(e.target);
  });
});

function playPause() {
  toggleSettings(false);
  if (pause) {
    countdown = setInterval(decreaseTimer, 1000);
    pause = false;
  } else {
    clearInterval(countdown);
    pause = true;
  }
}

function decreaseTimer() {
  if (session) {
    if (sessionTime <= 0) {
      session = false;
      sessionTime = document.querySelector('[name="session"]').value * 60;
    } else {
      sessionTime --;
    }
  } else {
    if (breakTime <= 0) {
      session = true;
      breakTime = document.querySelector('[name="break"]').value * 60;
    } else {
      breakTime --;
    }
  }
  updateTimer();
}

function reset() {
  breakTime = 300;
  sessionTime = 1500;
  stop();
  document.querySelector('[name="break"]').value = breakTime / 60;
  document.querySelector('[name="session"]').value = sessionTime / 60;
}

function stop() {
  clearInterval(countdown);
  updateTimer();
  toggleSettings(true);
}

function toggleSettings(visible) {
  document.querySelector('.corner').style.display = visible ? 'block' : 'none';
}

function updateSetting(setting) {
  let newTime = setting.value * 60;
  newTime = (newTime > 7200) ? 7200 : (newTime < 60) ? 60 : newTime;
  (setting.name == 'break') ? breakTime = newTime : sessionTime = newTime;
  updateTimer();
}

function updateTimer() {
  let counter = (session == true) ? sessionTime : breakTime;
  let min = ((Math.floor(counter / 60)).toString()).padStart(2, '0');
  let sec = ((counter % 60).toString()).padStart(2, '0');
  timer.textContent = min + ':' + sec;
}
