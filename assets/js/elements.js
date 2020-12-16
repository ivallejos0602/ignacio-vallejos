
let tabla = document.getElementById("MiTabla");
let btnAddVehiculoEl=document.getElementById("btnAddVehiculo");
let overlayEl = document.getElementsByClassName('overlay')[0];   //overlay del input de carga y edicion
let radNaftaEl = document.getElementById("nafta");
let radGncEl = document.getElementById("gnc");
let radDieselEl = document.getElementById("diesel");
let radAllEl = document.getElementById("all");

/* elementos del modal para agregar un Vehiculo en la tabla*/ 

let inputMarcaEl=document.getElementById("inputMarca");
let inputModeloEl=document.getElementById("inputModelo");
let inputKilometrajeEl=document.getElementById("inputKilometraje");
let inputAgeEl=document.getElementById("inputAge");
let inputColorEl=document.getElementById("inputColor");
let inputCombustibleEl=document.getElementById("inputCombustible");
let inputPrecioEl=document.getElementById("inputPrecio");

let btnModalBorrarEl=document.getElementById("btn-modal-borrar");

//para la barra de progreso
let progressBarEl=document.getElementById("MyProgressBar");
let botonBarraProgresoEl=document.getElementById("botonBarraProgreso");
let percentStyleEl=document.querySelector(".progress-bar");

// Formulario de Inputs de Vehiculo

let formInputVehiculoEl=document.getElementById("formInputVehiculo");

//toggle button de filtro
let switchEl=document.getElementById("switch");



