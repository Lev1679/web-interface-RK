function modalController({modal, btnOpen, btnClose, time = 300}) {
    const modalElem = document.querySelector(modal);
    
    modalElem.style.transition = `opacity ${time}ms ease-in-out`;
    modalElem.style.opacity = 0;
    modalElem.style.visibility = 'hidden';
    
    const closeModal = event => {
        const target = event.target;
    
        if (
            target === modalElem ||
            (btnClose && target.closest(btnClose)) ||
            event.code === 'Escape'
        ) {
            modalElem.style.opacity = 0;
            setTimeout(() => {
                modalElem.style.visibility = 'hidden';
            }, time);
            window.removeEventListener('keydown', closeModal);
        }
    }
    
    const openModal = () => {
        modalElem.style.visibility = 'visible';
        modalElem.style.opacity = 1;
        window.addEventListener('keydown', closeModal);
    };
    
    document.querySelector(btnOpen).addEventListener('click', openModal);
    
    modalElem.addEventListener('click', closeModal);
}

modalController({
    modal: '.modal',
    btnOpen: '.request_button',
    btnClose: '.modal_close',
});