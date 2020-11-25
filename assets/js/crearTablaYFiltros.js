let vehiculos = [

  {
    marca: "Chevrolet",
    modelo: "Meriva",
    age: "2012",
    color: "Negro",
    kilometraje: "180000",
    combustible: "nafta",
    precio: "$380000"
  },

  {
    marca: "Renault",
    modelo: "Logan Intense",
    age: "2019",
    color: "Blanco Tiza",
    kilometraje: "2000",
    combustible: "nafta",
    precio: "$1229000"
  },

  {
    marca: "Ford",
    modelo: "Ka sel",
    age: "2018",
    color: "Rojo",
    kilometraje: "20000",
    combustible: "nafta",
    precio: "$1150000"
  },

  {
    marca: "Ford",
    modelo: "Fiesta Kinetic",
    age: "2015",
    color: "Azul",
    kilometraje: "89000",
    combustible: "nafta",
    precio: "$900000"
  },

  {
    marca: "Ford",
    modelo: "Focus",
    age: "2017",
    color: "gris plata",
    kilometraje: "55000",
    combustible: "diesel",
    precio: "$1250000"
  },

  {
    marca: "Toyota",
    modelo: "Corolla",
    age: "2013",
    color: "blanco perlado",
    kilometraje: "78000",
    combustible: "nafta",
    precio: "$955000"
  },

  {
    marca: "Renault",
    modelo: "Kwid",
    age: "2019",
    color: "blanco esmeralda",
    kilometraje: "5000",
    combustible: "nafta",
    precio: "$975000"
  },

  {
    marca: "Ford",
    modelo: "EcoSport",
    age: "2011",
    color: "gris oscuro",
    kilometraje: "120000",
    combustible: "gnc",
    precio: "$500000"
  }
];


let divContenedor = document.getElementById("div-contenedor");

let radNaftaEl = document.getElementById("nafta");
let radGncEl = document.getElementById("gnc");
let radDieselEl = document.getElementById("diesel");
let radAllEl = document.getElementById("all");

var tabla=document.createElement("table");

tabla.id = "MiTabla";

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

tbodyEl.appendChild(fila);

}

/**++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

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
                                              