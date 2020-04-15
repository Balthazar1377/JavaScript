'use strict';

const collections = document.querySelectorAll('.book'),
    adv = document.querySelector('.adv');
collections[0].before(collections[1]);
collections[2].before(collections[4]);
collections[2].before(collections[3]);
collections[2].before(collections[5]);

adv.remove();

const elemsTwo = collections[0].querySelectorAll('li');
elemsTwo[2].before(elemsTwo[3]);
elemsTwo[2].before(elemsTwo[6]);
elemsTwo[2].before(elemsTwo[8]);
elemsTwo[2].before(elemsTwo[4]);
elemsTwo[2].before(elemsTwo[5]);
elemsTwo[2].before(elemsTwo[7]);
elemsTwo[2].before(elemsTwo[9]);

const elemsFive = collections[5].querySelectorAll('li');
elemsFive[2].before(elemsFive[9]);
elemsFive[2].before(elemsFive[3]);
elemsFive[2].before(elemsFive[4]);
elemsFive[7].after(elemsFive[5]);

const headerThree = collections[4].querySelector('a');
headerThree.textContent = 'Книга 3. this и Прототипы Объектов';

const elemsSix = collections[2].querySelectorAll('li'),
    newElem = document.createElement('li');
elemsSix[8].after(newElem);
newElem.textContent = 'Глава 8: За пределами ES6';

const bodyPicture = document.querySelector('body');
bodyPicture.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');





