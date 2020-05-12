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
        const statusMessage = document.querySelector('.message');
        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
            count = 0;
            popUpContent.style.opacity = count;
            statusMessage.textContent = '';
        }
        target = target.closest('.popup-content');

        if (!target) {
            popUp.style.display = 'none';
            statusMessage.textContent = '';
        }
    });
};

export default togglePopUp;