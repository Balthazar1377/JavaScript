/* eslint-disable no-unused-vars */
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

        menu.addEventListener('click', event => {
            let target = event.target;
            console.log(target);
            if (target.classList.contains('close-btn')) {
                menu.classList.toggle('active-menu');
            }

            target = target.closest('ul>li');
            if (target) {
                menu.classList.remove('active-menu');
            }
        }
        );
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpContent = popUp.querySelector('.popup-content'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            width = document.documentElement.clientWidth;
        popUpContent.style.opacity = '0';
        let count = 0;

        function animation() {
            if (width > 768) {
                popUp.style.display = 'block';
                count++;
                if (count < 10) {
                    popUpContent.style.opacity = count * 0.1;
                    setTimeout(animation, 100);
                }
            } else {
                popUp.style.display = 'block';
                popUpContent.style.opacity = '1';
            }
        }

        popUpBtn.forEach(elem => {
            elem.addEventListener('click', animation);
        });

        popUp.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
                count = 0;
                popUpContent.style.opacity = count;
            }
            target = target.closest('.popup-content');

            if (!target) {
                popUp.style.display = 'none';
            }
        });
    };
    togglePopUp();

    //Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();
});
