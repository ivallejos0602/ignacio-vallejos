

let divContenedor = document.getElementById("div-contenedor");
let btnAddVehiculoEl=document.getElementById("btnAddVehiculo");
let overlayEl = document.getElementsByClassName('overlay')[0];
let radNaftaEl = document.getElementById("nafta");
let radGncEl = document.getElementById("gnc");
let radDieselEl = document.getElementById("diesel");
let radAllEl = document.getElementById("all");

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

let subjectObject = {
  "Front-end": {
    "HTML": ["Links", "Images", "Tables", "Lists"],
    "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
    "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]    
  },
  "Back-end": {
    "PHP": ["Variables", "Strings", "Arrays"],
    "SQL": ["SELECT", "UPDATE", "DELETE"]
  }
}
window.onload = function() {
  let subjectSel = document.getElementById("subject");
  let topicSel = document.getElementById("topic");
  let chapterSel = document.getElementById("chapter");
  for (let x in subjectObject) {
    subjectSel.options[subjectSel.options.length] = new Option(x, x);
  }
  subjectSel.onchange = function() {
    //display correct values
    for (let y in subjectObject[this.value]) {
      topicSel.options[topicSel.options.length] = new Option(y, y);
    }
  }
  topicSel.onchange = function() {
    //display correct values
    let z = subjectObject[subjectSel.value][this.value];
    for (let i = 0; i < z.length; i++) {
      chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
    }
  }
}