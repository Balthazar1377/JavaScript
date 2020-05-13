const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
        popUpContent = popUp.querySelector('.popup-content'),
        inputs = popUp.querySelectorAll('input'),
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

    document.body.addEventListener('click', event => {
        const target = event.target;
        if(target.closest('.popup-btn')){
            animation();
        }
    });

    popUp.addEventListener('click', event => {
        const target = event.target;
        const statusMessage = document.querySelector('.message');
        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
            count = 0;
            popUpContent.style.opacity = count;
            inputs.forEach(elem => {
                elem.value = '';
            });
            if(statusMessage){
                statusMessage.textContent = '';
            }
        }
        if (!target.closest('.popup-content')) {
            popUp.style.display = 'none';
            inputs.forEach(elem => {
                elem.value = '';
            });
            if(statusMessage){
                statusMessage.textContent = '';
            }
        }
    });
};

export default togglePopUp;