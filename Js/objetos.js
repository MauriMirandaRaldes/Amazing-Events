var inputBuscador = document.querySelector("#inputSearch");
var checkboxSelected = [];
var datos = [];
var elementosFiltrados = [];
var select = document.querySelector("#select");

async function getData() {
  await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then((response) => response.json())
    .then((json) => {
      datos.push(...json.eventos);
    });

  displayFicha(datos);

  let unica = datos.map((lista) => lista.category).sort();
  const dataArray = new Set(unica);
  let fecha = [...dataArray];

  //-------creo un checkbox por cada uno----------
  var inputCheckbox = "";

  fecha.forEach((date) => {
    inputCheckbox += `<label class="micheckbox" ><input type="checkbox" class="checkboxCont" value="${date}"> ${date}</label>`;
  });
  document.querySelector("#checkboxEvento").innerHTML = inputCheckbox;

  let checkBox = document.querySelectorAll(".checkboxCont");

  //-------aca agregamos a cada checkbox un add event listener-----

  checkBox.forEach((check) => {
    check.addEventListener("change", function () {
      if (check.checked == true) {
        checkboxSelected.push(check.value);
        console.log(checkboxSelected);
        dataCheck(checkboxSelected);
      } else {
        checkboxSelected = checkboxSelected.filter(
          (checkValue) => checkValue !== check.value
        );
        dataCheck(checkboxSelected);
      }
    });
  });
}
getData();

inputBuscador.addEventListener("keyup", buscador);

function buscador(event) {
  let val = event.target.value;
  console.log(val);
  let data = datos.filter(
    (lista) =>
      lista.name.toLowerCase().includes(val.toLowerCase()) ||
      lista.date.includes(val)
  );
  console.log(datos);
  displayFicha(data);
  console.log(data);
}

function displayFicha(data) {
  let toDisplay = [];

  if (data && data.length > 0) {
    toDisplay.push(...data);
  } else {
    toDisplay.push(...datos);
  }

  var html = "";

  toDisplay.map((lista) => {
    html += `
        <div class="tarjeta">
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
        </div>    
        `;
  });

  document.querySelector("#mainCards").innerHTML = html;
}

/* Checkbox */

function dataCheck(checkboxSelected) {
  let data = [...datos];
  let filtroFechas = [];

  console.log(checkboxSelected)

  if (checkboxSelected.length > 0) {
      console.log(checkboxSelected)
    checkboxSelected.forEach((fecha) => {
      let filtrado = data.filter((evento) => {
        return evento.category == fecha;
      });
      filtroFechas.push(...filtrado);
    });
  }
  displayFicha(filtroFechas);
}

var datos2 = [];
var fechaActual = [];
var pasados = [];

async function getData2() {
  await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then((response) => response.json())
    .then((json) => {
      datos2.push(json);
    });
  console.log(datos2);
  console.log(datos2[0].fechaActual);
  fechaActual.push(datos2[0].fechaActual);
  pasados.push(...datos2[0].eventos.filter((item) => item.date < fechaActual));
  console.log(pasados);
}
getData2();

select.addEventListener("change", function (evento) {
  console.log(evento);
  if (evento.target.value == "pasados") {
    elementosFiltrados = [];
    elementosFiltrados.push(
      ...datos2[0].eventos.filter((item) => item.date > fechaActual)
    );
    console.log(elementosFiltrados);
  } else if (evento.target.value == "proximos") {
    elementosFiltrados = [];
    elementosFiltrados.push(
      ...datos2[0].eventos.filter((item) => item.date < fechaActual)
    );
    console.log(elementosFiltrados);
  } else {
    console.log("todos");
    elementosFiltrados = [];
    elementosFiltrados.push(...datos2[0].eventos);
    console.log(elementosFiltrados);
  }
  displayFicha(elementosFiltrados);
});

function noPisar() {}
