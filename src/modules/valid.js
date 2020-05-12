const valid = () => {
    const calcWrap = document.querySelector('.calc-block'),
        input = calcWrap.querySelectorAll('input');
    input.forEach(elem => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/\D/g, ' ');
        });
    });
};

export default valid;