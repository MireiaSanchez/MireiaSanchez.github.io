function addEventsInfo(buttonCard) {
let closeButton= document.querySelectorAll('.fa-times');
closeButton.forEach(button => {
    button.addEventListener('click', ()=> {
        button.parentElement.remove();
        // Cambiamos botón de la card para que vuelva a ser clicable.
        buttonCard.removeAttribute('disabled');
    });
});

}

