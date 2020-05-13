const countTimer = deadline => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        timerNumbers = document.querySelector('.timer-numbers'),
        timerDates = timerNumbers.querySelectorAll('span');


    const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
        return { timeRemaining, hours, minutes, seconds };
    };

    const updateClock = () => {
        const timer = getTimeRemaining();
        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;
        timerDates.forEach(elem => {
            if(elem.textContent < 10 && !isNaN(elem.textContent)){
                elem.textContent = '0' + elem.textContent;
            }
        });
    };

    const checkTimer = () => {
        const timer = getTimeRemaining();
        if (timer.timeRemaining > 0) {
            setInterval(updateClock, 1000);
        } else {
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    };
    checkTimer();
};

export default countTimer;