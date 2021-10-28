const countdownDisplay = document.querySelectorAll('.selection-item');
const selector = document.querySelector('.selector');
const pomodoroInput = document.getElementById('pomodoro');
const shortBreakInput = document.getElementById('short-break');
const longBreakInput = document.getElementById('long-break');
const arrowUp = document.querySelectorAll('.arrow-up');
const arrowDown = document.querySelectorAll('.arrow-down');
const errorMsg = document.querySelectorAll('.error-msg');
const settingsOpen = document.querySelector('.settings-icon');
const settingsClose = document.querySelector('.close-settings');
const settings = document.querySelector('.settings-modal');
const fonts = document.querySelectorAll('.font');
const colors = document.querySelectorAll('.color');
const applyBtn = document.querySelector('.apply-btn');
const countdownType = document.querySelectorAll('.selection-item');
const display = document.querySelector('.display-container');
const pomodoroDsiplay = document.getElementById('pomodoro-display');
const shortBreakDsiplay = document.getElementById('short-break-display');
const longBreakDsiplay = document.getElementById('long-break-display');
const pomodoroStart = document.getElementById('start-pomodoro');
const shortBreakStart = document.getElementById('start-short-break');
const longBreakStart = document.getElementById('start-long-break');
const pomodoroProgress = document.querySelector('.pomodoro-progress-bar');
const shortBreakProgress = document.querySelector('.short-break-progress-bar');
const longBreakProgress = document.querySelector('.long-break-progress-bar');
var color = '#F87070';
var font = "'Kumbh Sans', sans-serif";
var pomodoroTime = 25 * 60;
var shortBreakTime = 5 * 60;
var longBreakTime = 15 * 60;
var pomodoroIsActive = false;
var shortBreakIsActive = false;
var longBreakIsActive = false;
var initialPomodoroTime = pomodoroTime;
var initialShortBreakTime = shortBreakTime;
var initialLongBreakTime = longBreakTime; 
var pomodoroCountdown;
var shortBreakCountdown;
var longBreakCountdown;

const changeCountdownDisplay = (selection, index)=> {
    const activeSelection = document.querySelector('.selection-item.selection-active')
        if (activeSelection && activeSelection != selection) {
            activeSelection.classList.remove('selection-active')
        }
        selection.classList.add('selection-active');
        selector.style.transform = `translateX(${-145+(index*95)}%)`
        display.style.transform = `translateX(${0-(index*34)}%)`
}

const openCloseSettings = () => {
    settings.classList.toggle('settings-modal-active');
}


const fontChange = (selection) => {
    let activeSelection = document.querySelector('.font.active');
        if (activeSelection && activeSelection != selection) {
            activeSelection.classList.remove('active')
        }
        selection.classList.add('active')
        let text = selection.querySelector('p')
        font = window.getComputedStyle(text).getPropertyValue('font-family');
}

const colorChange = (selection) => {
        let activeSelection = document.querySelector('.color.active');
        if (activeSelection && activeSelection != selection) {
            activeSelection.classList.remove('active')
        }
        selection.classList.add('active')
        let childEl = selection.querySelector('.inner-circle')
        color = window.getComputedStyle(childEl).getPropertyValue('background-color');
}

const valueIncrement = (arrow, index)=> {
    let input = arrow.nextElementSibling;
    let value = parseInt(input.value);
    let error = errorMsg[index]
    if (value >= 60) {
        error.innerText = "Max length is 60 minutes"
        error.classList.toggle('error-msg-active');
        setTimeout(() => {
            error.classList.toggle('error-msg-active');
        }, 2000);
        return
    }else if (isNaN(value)) {
        input.value = 1;
    }else {
        input.value ++;
    }
}

const valueDecrement = (arrow)=> {
    let input = arrow.previousElementSibling;
    let value = parseInt(input.value);
    if (value <= 0 || isNaN(value)) {
        input.value = 0;
        return
    }else {
        input.value --;
    }
}

const initialTimeSet =() => {
    pomodoroDsiplay.innerText = `${((pomodoroTime/60) < 10) ? '0'+(pomodoroTime/60) : (pomodoroTime/60)}:00`;
    shortBreakDsiplay.innerText = `${((shortBreakTime/60) < 10) ? '0'+(shortBreakTime/60) : (shortBreakTime/60)}:00`;
    longBreakDsiplay.innerText = `${((longBreakTime/60) < 10) ? '0'+(longBreakTime/60) : (longBreakTime/60)}:00`;
}

const applySettings = () => {
    document.documentElement.style.setProperty('--accentColor', ''+color+'');
    document.documentElement.style.setProperty('--font', ''+font+'');
    pomodoroTime = parseInt(pomodoroInput.value) * 60;
    initialPomodoroTime = pomodoroTime;
    shortBreakTime = parseInt(shortBreakInput.value)* 60;
    initialShortBreakTime = shortBreakTime;
    longBreakTime = parseInt(longBreakInput.value)* 60;
    initialLongBreakTime = longBreakTime;
    openCloseSettings();
    initialTimeSet();
}

const pomodoroCountdownHandler = () => {
    pomodoroIsActive = true;
    pomodoroStart.innerText = 'pause';
    window.pomodoroCountdown = setInterval(() => {
        pomodoroTime --;
        let minutes = Math.floor(pomodoroTime / 60)
        let seconds = pomodoroTime % 60;
        if (minutes < 10) {
            minutes = "0"+minutes;
        }
        if (seconds < 10){
            seconds = "0"+seconds;
        }
        pomodoroProgress.setAttribute('stroke-dashoffset', (1036- (1036 * (pomodoroTime/initialPomodoroTime))))
        pomodoroDsiplay.innerText = `${minutes}:${seconds}` 
        if ( pomodoroTime == 0 ){
            clearInterval(pomodoroCountdown);
            pomodoroStart.innerText = 'restart';
            pomodoroTime = initialPomodoroTime;
            pomodoroIsActive = false;
        }
    }, 1000);
}

const shortBreakCountdownHandler = () => {
    shortBreakIsActive = true;
    shortBreakStart.innerText = 'pause';
    window.shortBreakCountdown = setInterval(() => {
        shortBreakTime--;
        let minutes = Math.floor(shortBreakTime / 60)
        let seconds = shortBreakTime % 60;
        if (minutes < 10) {
            minutes = "0"+minutes;
        }
        if (seconds < 10){
            seconds = "0"+seconds;
        }
        shortBreakProgress.setAttribute('stroke-dashoffset', (1036- (1036 * (shortBreakTime/initialShortBreakTime))));
        shortBreakDsiplay.innerText = `${minutes}:${seconds}`;
        if(shortBreakTime == 0){
            clearInterval(shortBreakCountdown);
            pomodoroStart.innerText = 'restart';
            shortBreakTime = initialShortBreakTime;
            shortBreakIsActive = false;
        }
    }, 1000);
}

const longBreakCountdownHandler = () => {
    longBreakIsActive = true;
    longBreakStart.innerText = 'pause';
    window.longBreakCountdown = setInterval(() => {
        longBreakTime--;
        let minutes = Math.floor(longBreakTime / 60)
        let seconds = longBreakTime % 60;
        if (minutes < 10) {
            minutes = "0"+minutes;
        }
        if (seconds < 10){
            seconds = "0"+seconds;
        }
        longBreakProgress.setAttribute('stroke-dashoffset', (1036- (1036 * (longBreakTime/initialLongBreakTime))));
        longBreakDsiplay.innerText = `${minutes}:${seconds}`;
        if(longBreakTime == 0){
            clearInterval(longBreakCountdown);
            longBreakStart.innerText = 'restart';
            longBreakTime = initialLongBreakTime;
            longBreakIsActive = false;
        }
    }, 1000);
}


countdownDisplay.forEach((display, index) =>{
    display.addEventListener('click', (e)=> {
        changeCountdownDisplay(display, index)
    })
})

settingsOpen.addEventListener('click', openCloseSettings);
settingsClose.addEventListener('click',openCloseSettings);
applyBtn.addEventListener('click', applySettings);

settings.addEventListener('click', (e)=> {
    if (e.target != e.currentTarget) {
        return
    } else {
        openCloseSettings();
    }
})

arrowUp.forEach((arrow, index) => {
    arrow.addEventListener('click', (e)=> {
        valueIncrement(arrow, index);
    })
})
arrowDown.forEach((arrow) => {
    arrow.addEventListener('click', (e)=> {
        valueDecrement(arrow);
    })
})

fonts.forEach((font)=> {
    font.addEventListener('click', (e)=> {
        fontChange(font);
    })
})

colors.forEach((color) => {
    color.addEventListener('click', (e)=> {
        colorChange(color);
    })
})


pomodoroStart.addEventListener('click', (e)=> {
    if (pomodoroIsActive) {
        clearInterval(window.pomodoroCountdown);
        pomodoroIsActive = false;
        pomodoroStart.innerText = 'resume';
    }else {
        pomodoroCountdownHandler();
    }
})

shortBreakStart.addEventListener('click', (e)=> {
    if(shortBreakIsActive) {
        clearInterval(window.shortBreakCountdown);
        shortBreakIsActive = false;
        shortBreakStart.innerText = "resume";
    }else {
        shortBreakCountdownHandler();
    }
})

longBreakStart.addEventListener('click', (e)=> {
    if (longBreakIsActive) {
        clearInterval(window.longBreakCountdown)
        longBreakIsActive = false;
        longBreakStart.innerText = 'resume'
    }else {
        longBreakCountdownHandler();
    }  
})