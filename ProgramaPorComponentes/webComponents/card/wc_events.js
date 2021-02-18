function addEventButtons(){
  buttons= document.querySelectorAll('.botonInfo');

   buttons.forEach(button => {
       button.addEventListener('click', (event)=> {
        event.stopImmediatePropagation();
        // Enviamos la card en concreto en la que aparecerá el componente extraInfo.
        receiveInfo(button.parentElement.parentElement);
        // Añadimos evento de cerrar a los botones del componente extraInfo. 
        addEventsInfo(button);
        
        button.setAttribute('disabled', 'true');
       });
   });

   
   
}

