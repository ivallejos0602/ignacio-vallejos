

let divContenedor = document.getElementById("div-contenedor");
let btnAddVehiculoEl=document.getElementById("btnAddVehiculo");
let overlayEl = document.getElementsByClassName('overlay')[0];
let radNaftaEl = document.getElementById("nafta");
let radGncEl = document.getElementById("gnc");
let radDieselEl = document.getElementById("diesel");
let radAllEl = document.getElementById("all");

/****************************/
/* elementos del modal para agregar un Vehiculo en la tabla*/ 

let inputMarcaEl=document.getElementById("inputMarca");
let inputModeloEl=document.getElementById("inputModelo");
let inputKilometrajeEl=document.getElementById("inputKilometraje");
let inputAgeEl=document.getElementById("inputAge");
let inputColorEl=document.getElementById("inputColor");
let inputCombustibleEl=document.getElementById("inputCombustible");
let inputPrecioEl=document.getElementById("inputPrecio");

/* botones de aceptar - cancelar del modal*/

/****************************/
var tabla=document.createElement("table");

tabla.id = "MiTabla";


/************************************************************* */
/*****  funcion para crear filas en la tabla    ***** */

let crearFila = (vehiculo,tbodyEl) => {

let fila = document.createElement("tr");

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
  /*
  td.innerHTML = "[borrar] -- [editar]";
  */
  let botonE = document.createElement("button");
  botonE.innerText="edit";  
  
  botonE.classList.add('button');
  botonE.classList.add('button1');
 
  let botonD = document.createElement("button");

  botonD.innerText="delete";
  botonD.classList.add('button');
  botonD.classList.add('button3');
  
  td.appendChild(botonE);
  td.appendChild(botonD);
 /*
  <td><button class="button button1">Green</button></td> 
   */
  fila.appendChild(td); 

tbodyEl.appendChild(fila);

}

/**++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* funcion para crear los elementos th en la tabla */

let crearEncabezadoTabla = (vehiculo,tabla) => {
  let th,tr,theadEl;

  theadEl=document.createElement("thead");
  theadEl.id = "encMiTabla";

  tr=document.createElement("tr");
  Object.keys(vehiculo).forEach(clave => {
    th=document.createElement("th");       
    th.innerHTML=`${clave}`;
    tr.appendChild(th);

  });
  th=document.createElement("th");
  th.innerHTML="edit / delete Car Data";
  tr.appendChild(th);
  
  theadEl.appendChild(tr);

  tabla.appendChild(theadEl);
 
 }

 /******************************************************** */

let crearCuerpoTabla = (vehiculos,tbodyEl) => {

  for (let i = 0; i < vehiculos.length; i++) {
    crearFila(vehiculos[i],tbodyEl);
     
}

}

/********************************************************* **/

let crearTabla = (vehiculos,tabla) => {

let tbodyEl=document.createElement("tbody");
  
tbodyEl.id = "bodyMiTabla";

 crearEncabezadoTabla(vehiculos[0],tabla);

  crearCuerpoTabla(vehiculos,tbodyEl);

  tabla.appendChild(tbodyEl);

  divContenedor.appendChild(tabla);


}

/********************************************************* **/

window.addEventListener("load", () => {
       crearTabla(vehiculos,tabla);
});

/*
btnFilterEl.addEventListener("click", () => { positiveArray = numsArray.filter((n) => n > 0);
*/

let borrarElementos = (elementos) => {

  while (elementos.firstChild) {
    elementos.removeChild(elementos.firstChild);
  }

}

/********************************************************* **/

let borrarElementosTabla = () => {

  //borro los elementos TD
  
 // let elementosTD = document.querySelectorAll("td");

 let elementosTD = document.getElementById("bodyMiTabla");  


  borrarElementos(elementosTD);

  //borro los elementos TD

  let elementosTR = document.querySelectorAll("tr");

  borrarElementos(elementosTR);

}

/********************************************************* **/

  radNaftaEl.addEventListener("click", () => {
                                              vehiculosANafta = vehiculos.filter(auto => 
                                                 auto.combustible=="nafta");
                                              borrarElementosTabla();
                                              crearCuerpoTabla(vehiculosANafta,document.getElementById("bodyMiTabla"));
                                              
                                               });
 
   radGncEl.addEventListener("click", () => {
                                                vehiculosAGnc = vehiculos.filter(auto => 
                                                    auto.combustible=="gnc");
                                                 borrarElementosTabla();
                                                 crearCuerpoTabla(vehiculosAGnc,document.getElementById("bodyMiTabla"));
                                                 
                                                 });
    radDieselEl.addEventListener("click", () => {
                                                  vehiculosADiesel = vehiculos.filter(auto => 
                                                  auto.combustible=="diesel");
                                                  borrarElementosTabla();
                                                  crearCuerpoTabla(vehiculosADiesel,document.getElementById("bodyMiTabla"));
                                                   });   
                                                   
    radAllEl.addEventListener("click", () =>  {
                                                 // console.log("arreglo backup:"+vehiculosBak);
                                                  borrarElementosTabla();
                                                  crearCuerpoTabla(vehiculos,document.getElementById("bodyMiTabla"));
                                                   } );                                               
                                              

/*********************************************** */

/* Se muestra el modal cuando finaliza la compra */
function showModal(price) {
  /*
  totalPriceEl.innerText = price;
  */
 console.log("MOSTRANDO PRECIO : "+parseInt(price));
  overlayEl.classList.remove('display-none');
}

/* Aca tengo el manejador del evento click */
btnAddVehiculoEl.addEventListener('click', (ev) => {
    ev.preventDefault();
    /* se calcula el precio total y se muestra el mismo en el modal */
    /*const totalPrice = calculateTotalPrice();*/
    let totalPrice=1000;
    showModal(totalPrice);
})

/*********************************************** */

/* eventos de los botones del modal */

btnAceptarAgregarVehiculo.addEventListener("click", () => {
 
 /* 
 console.log(inputMarcaEl.value);
 console.log(inputModeloEl.value);
 console.log(inputKilometrajeEl.value);
 console.log(inputAgeEl.value);
 console.log(inputColorEl.options[inputColorEl.selectedIndex].value);
 console.log(inputCombustibleEl.options[inputCombustibleEl.selectedIndex].value);
 console.log(inputColorEl.options);
 */

 //creo el objeto vehiculo
  let vehiculo= {
      marca: inputMarcaEl.value,
      modelo: inputModeloEl.value,
      age: inputAgeEl.value,
      color: inputColorEl.options[inputColorEl.selectedIndex].value,
      kilometraje: inputKilometrajeEl.value,
      combustible: inputCombustibleEl.options[inputCombustibleEl.selectedIndex].value,
      precio: inputPrecioEl.value,
    }
 
 //agrego el vehiculo al arreglo de objetos vehiculo
 
  console.log(vehiculos); 

  vehiculos.push(vehiculo);

  let tbodyEl=document.getElementById("bodyMiTabla");

  crearFila(vehiculo,tbodyEl);

  });   

btnCancelarAgregarVehiculo.addEventListener("click", () => {
    console.log("pepepe");
      });  







