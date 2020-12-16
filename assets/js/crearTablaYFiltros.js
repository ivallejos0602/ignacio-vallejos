let idGral = vehiculos.length;  // ESTA VARIABLE SIRVE PARA GENERAR IDENTIFICADORES DE VEHICULOS

//let vehiculosBak=[];  // SE USA CUANDO SE APLICAN FILTROS

let vehiculosBak = vehiculos;

//ELEMENTOS DE LA TABLA - DEFINICION DEL CUERPO DE TABLA
let tbodyEl = document.createElement("tbody");

tbodyEl.id = "bodyMiTabla";

switchEl.v

let idABorrar; // en el listenner del botón Borrar cuando se crea la fila, se seteará está variable

let idAeditar;   // esta variable es para discernir en el botón aceptar si el aceptar
// es por agregar una fila mas en la tabla, o false en caso que edite una fila  
// si editar=-1 entonces AGREGAR. SI editar >=0 entonces EDITAR 

let borrarVehiculo = (vehiculos, idVehiculo) => {

  let resultado;
  resultado = vehiculos.filter(vehiculo => vehiculo.id !== idVehiculo);
  return resultado;

}

/*****  funcion para crear filas en la tabla    ***** */

let crearFila = (tbodyEl, posicion, vehiculo) => {

  let fila = document.createElement("tr");
  fila.id = vehiculo.id;   // Importante : el id de la fila será el id del objeto Vehiculo
  let td;

  /* itero sobre  las claves de un objeto, itero sobre todas
  y armo cada atributo de la fila con la ref. del vehiculo en esa clave */

  Object.keys(vehiculo).forEach(clave => {
    td = document.createElement("td");
    td.innerHTML = `${vehiculo[clave]}`;
    fila.appendChild(td);
  });

  td = document.createElement("td");
  td.classList.add('td-btn');
  let botonE = document.createElement("button");
  botonE.innerText = "edit";
  botonE.classList.add('button','button1');

  botonE.addEventListener("click", (ev) => {

    ev.preventDefault();
    idAeditar = vehiculo.id;   // la posicion será >= 0
    inputMarcaEl.value = vehiculo.marca;
    inputModeloEl.value = vehiculo.modelo;
    inputColorEl.value = vehiculo.color;
    inputPrecioEl.value = vehiculo.precio;
    inputAgeEl.value = vehiculo.age;
    inputKilometrajeEl.value = vehiculo.kilometraje;
    inputCombustibleEl.value = vehiculo.combustible;
    showModal();

  });   // FIN EVENTLISTENNER

  // CREO EL BOTON DE BORRADO DE LA FILA
  let botonD = document.createElement("button");
  botonD.setAttribute("type", "button");
  botonD.setAttribute("data-toggle", "modal");
  botonD.setAttribute("data-target", "#myConfirmAction");
  botonD.innerText = "delete";
  botonD.classList.add('button');
  botonD.classList.add('button3');

  botonD.addEventListener("click", (ev) => {

    ev.preventDefault();
    idABorrar = vehiculo.id;  // SETEA LA POSICION DE LA FILA A BORRAR


  });  //FIN LISTENNER BOTON BORRAR

  td.appendChild(botonE);
  td.appendChild(botonD);
  fila.appendChild(td);
  tbodyEl.appendChild(fila);

}

btnModalBorrarEl.addEventListener("click", (ev) => {
  //let posicionABorrar=getPosicionId(idABorrar,vehiculos);
  vehiculos = vehiculos.filter(vehiculo => vehiculo.id != idABorrar);
  borrarElementosTabla();
  crearCuerpoTabla(vehiculos);
  $('#myConfirmAction').modal('hide');
  $('#progressBarModal').modal('show');
  radAllEl.checked = true;
  displayProgressBar();
});

/* funcion para crear los elementos th en la tabla */

let crearEncabezadoTabla = (vehiculo, tabla) => {
  let th, tr, theadEl;

  theadEl = document.createElement("thead");
  theadEl.id = "encMiTabla";

  tr = document.createElement("tr");

  Object.keys(vehiculo).forEach(clave => {
    th = document.createElement("th");
    th.innerHTML = `${clave}`;
    tr.appendChild(th);
  });

  th = document.createElement("th");
  th.innerHTML = "edit / delete Car Data";
  tr.appendChild(th);
  theadEl.appendChild(tr);
  tabla.appendChild(theadEl);
}

let crearCuerpoTabla = (mobilidades) => {
  // i es la posicion del vector, que se pasa como parametro en la funcion crearFila
  for (let i = 0; i < mobilidades.length; i++) {
    crearFila(tbodyEl, i, mobilidades[i]); //paso i como parámetro porque es la posicion en el array
  }
}

let crearTabla = (vehiculos, tabla) => {

  crearEncabezadoTabla(vehiculos[0], tabla);
  crearCuerpoTabla(vehiculos);
  tabla.appendChild(tbodyEl);
}

/*Al cargar la tabla, debe quedar :
   habilitar filtro disable
   filtro all checked porque muestra valores sin filtrar
   todas las demás opciones de filtro deshabilitadas
   mientras habilitar filtro esté en "NO"
 */  
let setearValoresInicialesAFiltros=()=> {
  switchEl.checked=false;
  radAllEl.checked=true;
  radGncEl.disabled=true;
  radDieselEl.disabled=true;
  radNaftaEl.disabled=true;
}

switchEl.addEventListener("click",()=>{

  //console.log("click:"+switchEl.checked);
  if (switchEl.checked){
    radAllEl.checked=true;
    radNaftaEl.disabled=false;
    radGncEl.disabled=false;
    radDieselEl.disabled=false;
  }
  else{
       if (!radAllEl.checked){
        borrarElementosTabla();
        crearCuerpoTabla(vehiculos);
       }
           

      setearValoresInicialesAFiltros();
  }


});

window.addEventListener("load", () => {
  crearTabla(vehiculos, tabla);
  setearValoresInicialesAFiltros();  
});

let borrarElementos = (elementos) => {

  while (elementos.firstChild) {
    elementos.removeChild(elementos.firstChild);
  }
}

let borrarElementosTabla = () => {

  let elementosTD = document.getElementById("bodyMiTabla");
  borrarElementos(elementosTD);
  //borro los elementos TD
  let elementosTR = document.querySelectorAll("tr");
  borrarElementos(elementosTR);
}

radNaftaEl.addEventListener("click", () => {
  //  vehiculosBak = vehiculos;
  let vehiculosFilt = vehiculos.filter(auto =>
    auto.combustible == "nafta");
  // console.table(vehiculosFilt);
  borrarElementosTabla();
  crearCuerpoTabla(vehiculosFilt);
});

radGncEl.addEventListener("click", () => {
  // vehiculosBak = vehiculos;
  let vehiculosFilt = vehiculos.filter(auto =>
    auto.combustible == "gnc");
  borrarElementosTabla();
  crearCuerpoTabla(vehiculosFilt);
});

radDieselEl.addEventListener("click", () => {
  //  vehiculosBak = vehiculos;
  let vehiculosFilt = vehiculos.filter(auto =>
    auto.combustible == "diesel");
  borrarElementosTabla();
  crearCuerpoTabla(vehiculosFilt);
});

radAllEl.addEventListener("click", () => {
  //  vehiculos=vehiculosBak;  
  borrarElementosTabla();
  crearCuerpoTabla(vehiculos);
});

function showModal() {
  overlayEl.classList.remove('display-none');
}

/* Aca tengo el manejador del evento click */
btnAddVehiculoEl.addEventListener('click', () => {
  //ev.preventDefault();
  idAeditar = -1;
  clearInputs();
  showModal();
})

/* eventos de los botones del modal */

formInputVehiculoEl.addEventListener("submit", (ev) => {

  ev.preventDefault();
  //creo el objeto vehiculo
  let vehiculo = {
    id: idAeditar == -1 ? idGral : idAeditar,
    marca: inputMarcaEl.value,
    modelo: inputModeloEl.value,
    age: inputAgeEl.value,
    color: inputColorEl.value,
    kilometraje: inputKilometrajeEl.value,
    combustible: inputCombustibleEl.value,
    precio: inputPrecioEl.value,
  }

  //let tbodyEl = document.getElementById("bodyMiTabla");

  if (idAeditar == -1) {   // AGREGAR FILA AL FINAL
    //agrego el vehiculo al arreglo de objetos vehiculo
    vehiculos.push(vehiculo);
    idGral++;
  } else {  // EDITAR UNA FILA
    let posicionAeditar = getPosicionId(idAeditar, vehiculos);
    vehiculos[posicionAeditar] = vehiculo;
  }

  setTimeout(() => {
    borrarElementosTabla();
    crearCuerpoTabla(vehiculos);
  }, 2200);

  radAllEl.checked = true;

  overlayEl.classList.add('display-none');

  $("#progressBarModal").modal('show');
  displayProgressBar();
});   // CIERRE DEL ADDEVENLISTENNER   

btnCancelarAgregarVehiculo.addEventListener("click", () => {
  overlayEl.classList.add('display-none');
});

let getPosicionId = (idVehiculo, vehiculos) => {
  let hallado = false;

  let i = 0;
  while (i < vehiculos.length && !hallado) {
    if (vehiculos[i].id == idVehiculo)
      hallado = true;
    else
      i++;
  }
  return i;
}

function clearInputs() {
  inputMarcaEl.value = 'none';
  inputModeloEl.value = '';
  inputAgeEl.value = '';
  inputColorEl.value = 'none';
  inputKilometrajeEl.value = '';
  inputCombustibleEl.value = 'none';
  inputPrecioEl.value = '';
}

function displayProgressBar() {

  let percent = 0;
  percentStyleEl.style.width = "0%";
  const timerPB = setInterval(function () {
    percent += 10;
    percentStyleEl.style.width = percent + "%";
    if (percent > 100) {
      clearInterval(timerPB);
      $("#progressBarModal").modal('hide');
    }
  }, 200);

}

//Cuando se activa o desactiva el filtro con el botón toggle

switchEl.addEventListener("click",() => {

  console.log("filtro activo");
  /*radNaftaEl  radGncEl  radDieselEl   radAllEl*/

});