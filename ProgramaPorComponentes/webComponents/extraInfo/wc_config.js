function receiveInfo(card){
    console.log(card.dataset.ingredientes);
    let arrayIngredients= card.dataset.ingredientes.split(',');
    let generalDiv= document.createElement('div');
    generalDiv.classList.add('infoExtra');
    generalDiv.innerHTML= '<h4>Ingredientes</h4><i class="fas fa-times"></i>';
    ul= document.createElement('ul');
    arrayIngredients.forEach(element => {
        li= document.createElement('li');
        li.innerHTML= element;
        ul.appendChild(li);
    });

    generalDiv.appendChild(ul);
    card.appendChild(generalDiv);

}