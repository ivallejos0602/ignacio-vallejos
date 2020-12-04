

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

let posicionAeditar=-1;   // esta variable es para discernir en el botón aceptar si el aceptar
                    // es por agregar una fila mas en la tabla, o false en caso que edite una fila  
                    // si editar=-1 entonces AGREGAR. SI editar >=0 entonces EDITAR 
var tabla=document.createElement("table");

tabla.id = "MiTabla";


/************************************************************* */
/*****  funcion para crear filas en la tabla    ***** */

let crearFila = (vehiculos,tbodyEl,posicion) => {

let fila = document.createElement("tr");

fila.id=posicion;

let td;

/* itero sobre  las claves de un objeto, itero sobre todas
y armo cada atributo de la fila con la ref. del vehiculo en esa clave */

Object.keys(vehiculos[posicion]).forEach(clave => {
  td = document.createElement("td");
  td.innerHTML = `${vehiculos[posicion][clave]}`;
  fila.appendChild(td); 
});

  td = document.createElement("td");

  td.classList.add('td-btn');

  let botonE = document.createElement("button");
  botonE.innerText="edit";  

  botonE.id=posicion; 

  botonE.classList.add('button');
  botonE.classList.add('button1');

  botonE.addEventListener("click", (ev) => {

        ev.preventDefault();

        posicionAeditar=posicion;   // la posicion será >= 0

        inputMarcaEl.value=vehiculos[posicion].marca;
        inputModeloEl.value=vehiculos[posicion].modelo;
        inputColorEl.value=vehiculos[posicion].color;
        inputPrecioEl.value=vehiculos[posicion].precio;
        inputAgeEl.value=vehiculos[posicion].age;
        inputKilometrajeEl.value=vehiculos[posicion].kilometraje;      
        inputCombustibleEl.value=vehiculos[posicion].combustible;

        //debugger;

       //TENGO QUE SEGUIR ACA, ESTOY EN LA PARTE QUE TENGO QUE RECUPERAR LA FILA DE LA TABLA
       // Y ASIGNARLE LOS VALORES QUE MODIFICO
         
       ///   BORRAR TABLA 

       // LLENARLA CON EL VECTOR MODIFICADO

       //vehiculos[posicion]['marca']=inputMarcaEl.value;     

        showModal();

     });
 
  let botonD = document.createElement("button");

  botonD.id=posicion;

  botonD.innerText="delete";

  botonD.classList.add('button');
  botonD.classList.add('button3');

  botonD.addEventListener("click", () => {
    //alert("el boton tiene el id :"+posicion);
    borrarFila(posicion);
  });
  
  td.appendChild(botonE);
  td.appendChild(botonD);

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
// i es la posicion del vector, que se pasa como parametro en la funcion crearFila
  for (let i = 0; i < vehiculos.length; i++) {
    crearFila(vehiculos,tbodyEl,i); //paso i como parámetro porque es la posicion en el array
     
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
function showModal() {
  

 overlayEl.classList.remove('display-none');
}

/* Aca tengo el manejador del evento click */
btnAddVehiculoEl.addEventListener('click', (ev) => {
    ev.preventDefault();

    clearInputs();
     
    showModal();
})

/*********************************************** */

/* eventos de los botones del modal */

btnAceptarAgregarVehiculo.addEventListener("click", () => {

  
 //creo el objeto vehiculo
  let vehiculo= {
      marca: inputMarcaEl.value,
      modelo: inputModeloEl.value,
      age: inputAgeEl.value,
     // : inputColorElcolor.options[inputColorEl.selectedIndex].value,
      color: inputColorEl.value,
      kilometraje: inputKilometrajeEl.value,
     // combustible: inputCombustibleEl.options[inputCombustibleEl.selectedIndex].value,
      combustible: inputCombustibleEl.value, 
      precio: inputPrecioEl.value,
    }
 
 //agrego el vehiculo al arreglo de objetos vehiculo
 
 // console.log(vehiculos); 

 let tbodyEl=document.getElementById("bodyMiTabla");

if (posicionAeditar==-1) {   // AGREGAR FILA
  
  vehiculos.push(vehiculo);
  
  let posicionFinal=vehiculos.length -1 ;

  crearFila(vehiculos,tbodyEl,posicionFinal);

} else {  // en este caso estaría editando una fila
  
 vehiculos[posicionAeditar].marca=inputMarcaEl.value;
 vehiculos[posicionAeditar].modelo=inputModeloEl.value;
 vehiculos[posicionAeditar].age=inputAgeEl.value;
 vehiculos[posicionAeditar].color=inputColorEl.value;
 vehiculos[posicionAeditar].kilometraje=inputKilometrajeEl.value;
 vehiculos[posicionAeditar].combustible=inputCombustibleEl.value;
 vehiculos[posicionAeditar].precio=inputPrecioEl.value;

 borrarElementosTabla();
debugger;
 crearCuerpoTabla(vehiculos,tbodyEl);
 

 //console.log(vehiculos);

 /////////////////////
/*
 inputMarcaEl.value=vehiculo['marca'];
 inputModeloEl.value=vehiculo['modelo'];
 inputColorEl.value=vehiculo['color'];
 inputPrecioEl.value=vehiculo['precio'];
 inputAgeEl.value=vehiculo['age'];
 inputKilometrajeEl.value=vehiculo['kilometraje'];      
 inputCombustibleEl.value=vehiculo['combustible'];
 */
 //////////////////////
    

}


  overlayEl.classList.add('display-none');


  // ATENCION : DEBE VALIDARSE QUE NO SE INGRESE UN VEHICULO EN LA TABLA
  // SOLO PULSANDO ACEPTAR EN EL OVERLAY

  });   

btnCancelarAgregarVehiculo.addEventListener("click", () => {
  //clearInputs();
  overlayEl.classList.add('display-none');
      });  


function clearInputs()  {
  inputMarcaEl.value='none';
  inputModeloEl.value='';
  inputAgeEl.value='';
  inputColorEl.value='none';
  inputKilometrajeEl.value='';
  inputCombustibleEl.value='none';
  inputPrecioEl.value='';
  
}









