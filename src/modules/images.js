const images = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach(elem => {
        elem.addEventListener('mouseenter', event => {
            const source = elem.getAttribute('src');
            event.target.src = event.target.dataset.img;
            event.target.dataset.img = source;
        });

        elem.addEventListener('mouseleave', event => {
            const source = elem.getAttribute('src');
            event.target.src = event.target.dataset.img;
            event.target.dataset.img = source;
        });
    });
};

export default images;