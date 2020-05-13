const sendForm = () => {
    const errorMessage = 'Что-то пошло не так!',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро свяжемся с Вами!';
    const form = document.querySelectorAll('form');
    const statusMessage = document.createElement('div');
    statusMessage.className = 'message';
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';


    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    document.body.addEventListener('input', event => {
        const target = event.target;
        if(target.closest('.form-phone')){
            target.value = target.value.replace(/[^+\d]/g, '');
        }
        if(target.closest('.form-name')){
            target.value = target.value.replace(/[^а-я\s]/ig, '');
        }
        if(target.closest('.mess')){
            target.value = target.value.replace(/[^а-я\s]/ig, '');
        }
    });
    
    form.forEach(elem => {
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
                    setTimeout(() => {
                        statusMessage.textContent = '';
                    }, 5000);
                    inputs.forEach(item => {
                        item.value = '';
                    });
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    setTimeout(() => {
                        statusMessage.textContent = '';
                    }, 5000);
                    inputs.forEach(item => {
                        item.value = '';
                    });
                });
        });
    });
};

export default sendForm;