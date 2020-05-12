const sendForm = () => {
    const errorMessage = 'Что-то пошло не так!',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро свяжемся с Вами!';
    const form = document.querySelectorAll('form'),
        message = document.querySelector('.mess');
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';


    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });


    form.forEach(elem => {
        const tel = elem.querySelector('input[type="tel"]');
        tel.addEventListener('input', () => {
            tel.value = tel.value.replace(/[^+\d]/g, '');
        });
        const text = elem.querySelector('input[type="text"]');
        text.addEventListener('input', () => {
            text.value = text.value.replace(/[^а-я\s]/ig, '');
        });
        message.addEventListener('input', () => {
            message.value = message.value.replace(/[^а-я\s]/ig, '');
        });
        elem.addEventListener('submit', event  => {
            event.preventDefault();
            elem.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(elem);
            const body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            const inputs = elem.querySelectorAll('input');
            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                    inputs.forEach(item => {
                        item.value = '';
                    });
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    inputs.forEach(item => {
                        item.value = '';
                    });
                });
        });
    });
};

export default sendForm;