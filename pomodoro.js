const buttons = document.querySelectorAll('button');
let breakLengthDisplay = document.querySelector('#break-length');
let sessionLengthDisplay = document.querySelector('#session-length');
let timeLeft = document.querySelector('#time-left');
let start_stop = document.querySelector('#start_stop');
let timerLabel = document.querySelector('#timer-label');
const lengthButtons = document.querySelectorAll('.length-buttons');



let countdown;
let playButtonIcon = false;

let sessionTime;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        lengthValue(button);
    })
});

const lengthValue = (button) => {
    let breakLengthValue = parseFloat(breakLengthDisplay.textContent);
    let sessionLengthValue = parseFloat(sessionLengthDisplay.textContent);
    if (button.id === 'break-decrement') {
        if (breakLengthValue === 1) return;
        breakLengthDisplay.textContent = breakLengthValue - 1;
    }
    if (button.id === 'break-increment') {
        if (breakLengthValue === 60) return;
        breakLengthDisplay.textContent = breakLengthValue + 1;

    }
    if (button.id === 'session-decrement') {
        if (sessionLengthValue === 1) return;
        displayTimeLeft((sessionLengthValue - 1) * 60);
        sessionLengthDisplay.textContent = sessionLengthValue - 1;


    }
    if (button.id === 'session-increment') {
        if (sessionLengthValue === 60) return;
        displayTimeLeft((sessionLengthValue + 1) * 60);
        sessionLengthDisplay.textContent = sessionLengthValue + 1;
    }

    if (button.id === 'start_stop') {
        playButtonIcon = !playButtonIcon;
        const pauseTimeLeft = timeLeft.textContent;
        const splitTimeLeft =  pauseTimeLeft.split(':');
        const getTimeLeftInSeconds = parseFloat(splitTimeLeft[0] * 60) + parseFloat(splitTimeLeft[1]);
        lengthButtons.forEach( button => {
            button.disabled = true;
        })
        if(playButtonIcon){
            button.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
            if(timerLabel.textContent === 'Session'){
                timer(getTimeLeftInSeconds);
            }else if(timerLabel.textContent === 'Break'){
                breaktimer(getTimeLeftInSeconds);
            }   
        } else  {
            button.innerHTML = '<i class="fas fa-play fa-2x"></i>';
            clearInterval(countdown);
        }
        
    }

    if (button.id === 'reset') {
        reset();
    }
}




const timer = (sessionCountDown) => {
    let breakTime = parseFloat(breakLengthDisplay.textContent);
    let breakTimeValue = breakTime * 60;
    
    const now = Date.now();
    const then = now + sessionCountDown * 1000;
    displayTimeLeft(sessionCountDown);
    timerLabel.textContent = 'Session';
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        if(secondsLeft < -1){    
            clearInterval(countdown);   
            breaktimer(breakTimeValue);
        }
        displayTimeLeft(secondsLeft);
    }, 1000);  
};

const breaktimer = (breakTime) => {
    let sessionTime = parseFloat(sessionLengthDisplay.textContent);
    let sessionTimeValue = sessionTime * 60;
    
    timerLabel.textContent = 'Break';
    const now = Date.now();
    const then = now + breakTime * 1000;
    displayTimeLeft(breakTime);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        if(secondsLeft < -1){
            clearInterval(countdown);
            timer(sessionTimeValue);
        }
        displayTimeLeft(secondsLeft);
    }, 1000);  
};


const displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? 0 : ''}${minutes}:${remainderSeconds < 10 ? 0 : ''}${remainderSeconds}`;
    timeLeft.textContent = display;
}


const reset = () => {
    breakLengthDisplay.textContent = 5;
    sessionLengthDisplay.textContent = 25;
    displayTimeLeft(1500);
    clearInterval(countdown);
    start_stop.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    timerLabel.textContent = 'Session';
    lengthButtons.forEach( button => {
        button.disabled = false;
    })
    
}

reset();
