const sessionLengthElement = document.getElementById('session-length');
const breakLengthElement = document.getElementById('break-length');
const statusElement = document.getElementById('status');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let sessionLength = parseInt(sessionLengthElement.innerText);
let breakLength = parseInt(breakLengthElement.innerText);;
let isSessionFinished = false;
let intervalID;
let isClocking = false;

document.getElementById('session-length-sub').addEventListener('click', function(){
    if(!isClocking) {
        if (sessionLengthElement.innerText > '1') {
            sessionLength = parseInt(sessionLengthElement.innerText);
            sessionLength -= 1;
            if(statusElement.innerHTML === 'Session'+'<br>') {
                minutesElement.innerText = sessionLength;
                secondsElement.innerText = 0;
            }
            sessionLengthElement.innerText = sessionLength;
        }
    }
});

document.getElementById('session-length-add').addEventListener('click', function(){
    if(!isClocking) {
        sessionLength = parseInt(sessionLengthElement.innerText);
        sessionLength += 1;
        if(statusElement.innerHTML === 'Session'+'<br>') {
            minutesElement.innerText = sessionLength;
            secondsElement.innerText = 0;
        }
        sessionLengthElement.innerText = sessionLength;
    }
});

document.getElementById('break-length-sub').addEventListener('click', function(){
    if(!isClocking) {
        if (breakLengthElement.innerText > '1') {
            breakLength = parseInt(breakLengthElement.innerText);
            breakLength -= 1;
            if(statusElement.innerHTML === 'Break!'+'<br>') {
                minutesElement.innerText = breakLength;
                secondsElement.innerText = 0;
            }
            breakLengthElement.innerText = breakLength;
        }
    }
});

document.getElementById('break-length-add').addEventListener('click', function(){
    if(!isClocking) {
        breakLength = parseInt(breakLengthElement.innerText);
        breakLength += 1;
        if(statusElement.innerHTML === 'Break!'+'<br>') {
            minutesElement.innerText = breakLength;
            secondsElement.innerText = 0;
        }
        breakLengthElement.innerText = breakLength;
    }
});

function clocking(type, length, sec) {
    statusElement.innerHTML = type;
    let estimatedMinutes = length;
    let estSeconds;
    if(parseInt(secondsElement.innerText) === 0) {
        estSeconds = length * 60;   
    } else {
        estSeconds = sec;
    }
    let isLastStateBreak = false;
    intervalID = setInterval(function() {
        estimatedMinutes = Math.floor(estSeconds / 60);
        if (estimatedMinutes > -1 && estSeconds > -1)
            if (estSeconds < 59) {
                secondsElement.innerText = estSeconds - Math.round(estimatedMinutes * 60);
            } else {
                minutesElement.innerText = estimatedMinutes;
                secondsElement.innerText = estSeconds - Math.round(estimatedMinutes * 60);
            }
        if(statusElement.innerHTML === 'Session'+'<br>') {
            isLastStateBreak = false;
        } else {
            isLastStateBreak = true;
        }
        estSeconds--;
        if (estSeconds < 0) {
            if(isLastStateBreak){
                statusElement.innerHTML = 'Session'+'<br>'
                estimatedMinutes = sessionLength;
                if(parseInt(secondsElement.innerText) === 0) {
                    estSeconds = sessionLength * 60;   
                } else {
                    estSeconds = sec;
                }
            } else {
                statusElement.innerHTML = 'Break!'+'<br>';
                estimatedMinutes = breakLength;
                if(parseInt(secondsElement.innerText) === 0) {
                    estSeconds = estimatedMinutes * 60;   
                } else {
                    estSeconds = sec;
                }
            }
        }
    }, 1000);
}

function startClock() {
    if(isClocking) {
        isClocking = false;
    } else {
        isClocking = true;
    }
    
    if(isClocking) {
        let prevSessionLength = sessionLength;
        let prevBreakLength = breakLength;
        if(statusElement.innerHTML === 'Session'+'<br>' && prevSessionLength !== sessionLength) {
            clocking(statusElement.innerHTML = 'Session'+'<br>', sessionLength , parseInt(secondsElement.innerText));
        }
        else if(statusElement.innerHTML === 'Break!'+'<br>' && prevBreakLength !== breakLength) {
            clocking(statusElement.innerHTML = 'Session'+'<br>', breakLength , parseInt(secondsElement.innerText));
        } else {
            clocking(statusElement.innerHTML, parseInt(minutesElement.innerText) , parseInt(secondsElement.innerText));
        }
        
    } else {
        clearInterval(intervalID);
        minutesElement.innerText = minutesElement.innerText;
        secondsElement.innerText = secondsElement.innerText;
    }
}