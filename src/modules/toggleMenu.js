const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li');
    const handlermenu = () => {
        menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlermenu);

    menu.addEventListener('click', event => {
        let target = event.target;
        console.log(target);
        if (target.classList.contains('close-btn')) {
            menu.classList.toggle('active-menu');
        }

        target = target.closest('ul>li');
        if (target) {
            menu.classList.remove('active-menu');
        }
    }
    );
};

export default toggleMenu;