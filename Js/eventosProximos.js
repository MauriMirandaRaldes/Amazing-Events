var datos = [];
var pasados = [];
var fechaActual = [];

async function getData2() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json =>{datos.push(json)})
  
    fechaActual.push(datos[0].fechaActual);
    pasados.push(...datos[0].eventos.filter(item =>item.date > fechaActual));

    displayFicha(pasados)
}

getData2()

function displayFicha(data){
    let toDisplay = [];
    if(data && data.length > 0){
        toDisplay.push(...pasados);
    }else{
        toDisplay.push(...datos);
    }

    var html = "";

    toDisplay.map(lista =>{ 

        html += 

       `<div class="tarjeta">
       <a href = "detalles.html?id=${lista.id}" class="elementos__target">
       <div>
           <h2 class="titulo__secundario__target">${lista.name}</h2>  
           <p class="parrafo2__target">${lista.description}</p>
           <p class="parrafo3__target">${lista.category}</p>
           <p class="parrafo2__target">${lista.place}</p>
           <p class="parrafo2__target">Fecha: ${lista.date}</p>
           <p class="parrafo4__target">Precio: $${lista.price}</p>
       </div>
       <div class = "customimgcart">
           <img src="${lista.image}" class="imagenCart">
       </div>
       </a>
       </div>    `
        
    })


document.querySelector("#mainCards").innerHTML = html;

}