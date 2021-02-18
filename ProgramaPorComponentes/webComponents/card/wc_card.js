request.onload = function () {
    const platos = request.response;
    console.log(platos);
    platos.forEach(crearCards);
}


function crearCards(plato){
    let container= document.getElementById('cards');
    let emptyCard= document.createElement('div');
    emptyCard.classList.add('card', 'mx-auto', 'm-3', 'px-0', plato.tipo);
    emptyCard.setAttribute('data-calorias', plato.calorias);
    emptyCard.setAttribute('data-ingredientes', plato.ingredientes);
    emptyCard.style.width= '18rem';
    emptyCard.innerHTML= `
    <img class="card-img-top px-0" src="${plato.imagen}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${plato.nombre}</h5>
      <p class="card-text"></p>
    </div>
    <div class="card-footer text-muted">
    <button class="btn btn-primary botonInfo">Ver más</button>
    </div>`;
    container.appendChild(emptyCard);
    
    addEventButtons();
}
