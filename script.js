'use strict';

class First {
    constructor (phrase) {
        this.phrase = 'Привет, я метод родителя!';
    }
    hello (phrase) {
        console.log(phrase);
    }
}

class Second extends First {

    hello () {
        super.hello(this.phrase);
        console.log('А я наследуемый метод!');
    }
}

const sec = new Second();
sec.hello('Привет, я метод родителя!');