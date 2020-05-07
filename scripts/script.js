// eslint-disable-next-line strict
window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    //Timer
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');


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
            if (timer.hours < 10) {
                timerHours.textContent = '0' + timer.hours;
            }
            if (timer.minutes < 10) {
                timerMinutes.textContent = '0' + timer.minutes;
            }
            if (timer.seconds < 10) {
                timerSeconds.textContent = '0' + timer.seconds;
            }
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

    countTimer('26 may 2020');

    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');
        const handlermenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlermenu);
        closeBtn.addEventListener('click', handlermenu);
        menuItems.forEach(elem => elem.addEventListener('click', handlermenu));
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popUpContent = popup.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            width = document.documentElement.clientWidth;
        let count = 0;
        popUpContent.style.opacity = '0';

        function animation() {
            if (width > 768) {
                popup.style.display = 'block';
                count++;
                if (count < 10) {
                    popUpContent.style.opacity = count * 0.1;
                }
                setTimeout(animation, 100);
            } else {
                popup.style.display = 'block';
                popUpContent.style.opacity = '1';
            }

        }

        popupBtn.forEach(elem => {
            elem.addEventListener('click', animation);
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
        console.log(width);
    };
    togglePopUp();
});
