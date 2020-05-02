'use strict';

function DomElement (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.start = function(selector, height, width, bg, fontSize) {
    const body = document.querySelector('body');
    selector = prompt('Введите класс или идентификатор блока: ');

    if (selector === '.selector') {
        body.innerHTML = '<div class = "selector"></div>';
        const div = body.querySelector('.selector');

        div.style.cssText = `height: ${height}px;
        width: ${width}px;
        background: ${bg};
        font-size: ${fontSize}px;`;
    } else if (selector === '#selector') {
        body.innerHTML = '<div id = "selector"></div>';
        const div = body.querySelector('#selector');
        console.log(div);
        div.style.cssText = `height: ${height}px;
        width: ${width}px;
        background: ${bg};
        font-size: ${fontSize}px;`;
    }
    const asked = prompt('Введите любой текст: ');
    const text = document.querySelector('div');
    text.innerHTML = asked;
    
};

let dom = new DomElement();
dom.start('#selector', 500, 500, 'orange', 24);