const images = () => {
    const commandPhoto = document.querySelector('.command');

    commandPhoto.addEventListener('mouseover', event => {
        const target = event.target;
        if(target.closest('.command__photo')){
            const source = target.getAttribute('src');
            event.target.src = event.target.dataset.img;
            event.target.dataset.img = source;
        }
    });
    commandPhoto.addEventListener('mouseout', event => {
        const target = event.target;
        if(target.closest('.command__photo')){
            const source = target.getAttribute('src');
            event.target.src = event.target.dataset.img;
            event.target.dataset.img = source;
        }
    });
    };


export default images;