const valid = () => {
    const calcWrap = document.querySelector('.calc-block');
        calcWrap.addEventListener('input', event => {
            const target = event.target;
            if(target.closest('input')){
                target.value = target.value.replace(/\D/g, ' ');
            }
        });
};

export default valid;