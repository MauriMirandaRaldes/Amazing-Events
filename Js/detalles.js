var datos = []

async function getData(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json => {datos.push(...json.eventos)})
     console.log(datos)
    var id = datos.map(date => date.id)

    console.log(id)
    var id = location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    console.log(selectedId)
    var lista = datos.find(function(lista){
        return lista.id == selectedId
    })


    var html = 
    
    `<div class="tarjeta">
    <a href = "#""id=${lista.id}" class="elementos__target">
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
    
    document.querySelector("#mainCards").innerHTML = html;
}

getData()