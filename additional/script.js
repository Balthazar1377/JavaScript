
// eslint-disable-next-line strict
window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';
    function date(getnewYear) {
        const dateNow = new Date().getTime(),
            getNewYear = new Date(getnewYear).getTime(),
            textHours = document.querySelector('.text-hours'),
            textDay = document.querySelector('.text-day'),
            textTime = document.querySelector('.text-time'),
            newYear = document.querySelector('.new-year');

        function getDate() {
            const day = new Date().getDay(),
                hours = new Date().getHours(),
                minutes = new Date().getMinutes(),
                seconds = new Date().getSeconds(),
                dateNewYear = new Date(newYear);
            return { day, textHours, hours, minutes, seconds, dateNewYear };
        }

        function addText() {
            const text = getDate(),
                arr = [],
                days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            if (text.hours > 7 && text.hours < 11) {
                arr.push('Доброе утро');
            } else if (text.hours > 11 && text.hours < 18) {
                arr.push('Добрый день');
            } else if (text.hours > 18 && text.hours < 23) {
                arr.push('Добрый вечер');
            } else {
                arr.push('Чего не спим ночью?');
            }
            for (let i = 0; i < 6; i++) {
                if (i === text.day) {
                    text.day = days[i];
                    arr.push(`Сегодня ${text.day}`);
                }
            }
            arr.push('Текущее время: ' + new Date().toLocaleTimeString('en'));
            const timeNewYear = Math.floor((getNewYear - dateNow) / 1000 / 60 / 60 / 24);
            arr.push('Осталось ' + timeNewYear + ' дней до Нового года!');
            textHours.textContent = arr[0];
            textDay.textContent = arr[1];
            textTime.textContent = arr[2];
            newYear.textContent = arr[3];
        }
        addText();
    }
    date('31 jan 2021');
});


