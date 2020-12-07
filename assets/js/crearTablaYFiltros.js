
let idGral=vehiculos.length;  // ESTA VARIABLE SIRVE PARA GENERAR IDENTIFICADORES DE VEHICULOS

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

let borrarVehiculo = (vehiculos,idVehiculo) => {

  let resultado;

  resultado=vehiculos.filter(vehiculo => vehiculo.id !== idVehiculo);
   
  //console.log("sin el elemento borrado"+resultado);
  return resultado;

}


/************************************************************* */
/*****  funcion para crear filas en la tabla    ***** */

let crearFila = (tbodyEl,posicion) => {

let fila = document.createElement("tr");

fila.id=vehiculos[posicion].id;   // Importante : el id de la fila será el id del objeto Vehiculo

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

  //botonE.id=posicion; 

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
     
        showModal();

     });   // FIN EVENTLISTENNER
 
  let botonD = document.createElement("button");

  //botonD.id=posicion;
  botonD.id=fila.id;

  botonD.innerText="delete";

  botonD.classList.add('button');
  botonD.classList.add('button3');

  botonD.addEventListener("click", (ev) => {

    ev.preventDefault();
    //alert("el boton tiene el id :"+posicion);
    
    //borrarFila(posicion);

    // borrar el vehiculo, que tenga el id que se pasa como parametro
    //let resultado=borrarVehiculo(vehiculos,parseInt(fila.id));
    //vehiculos=resultado;

    vehiculos=[...borrarVehiculo(vehiculos,parseInt(fila.id))];
 

     borrarElementosTabla();
  
     crearCuerpoTabla(vehiculos,tbodyEl);
  
     console.table(vehiculos);

  });  //FIN LISTENNER BOTON BORRAR
  
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
  console.log("long del vector vehiculos dentro de la funcion crearCuerpoTabla :"+vehiculos.length);
  for (let i = 0; i < vehiculos.length; i++) {
    crearFila(tbodyEl,i); //paso i como parámetro porque es la posicion en el array
  }
  console.log("long del vector vehiculos despuesde crear todas las filas luego del borrado :"+vehiculos.length);
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
                                                 console.table(vehiculosAGnc);
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
btnAddVehiculoEl.addEventListener('click', () => {
    //ev.preventDefault();
    posicionAeditar=-1; 
    clearInputs();
    console.log("En el listener de add");
    console.table(vehiculos)
     
    showModal();
})

/*********************************************** */

/* eventos de los botones del modal */

let validacionCorrectaInputs = (marcaI,modeloI,ageI,colorI,kilometrajeI,combustibleI,precioI) => {
 
  let valida=true;

  if (modeloI=="" || kilometrajeI=="" || precioI=="" || marcaI=="none" || ageI=="" || colorI=="none" || combustibleI=="none")
      valida=false;

  return valida;   

}



btnAceptarAgregarVehiculo.addEventListener("click", () => {
  
//console.log("En el comienzo del listener de aceptar " + vehiculos.length);

 let marcaI= inputMarcaEl.value;
 let modeloI= inputModeloEl.value;
 let ageI= inputAgeEl.value;
 let colorI= inputColorEl.value;
 let kilometrajeI= inputKilometrajeEl.value;
 let combustibleI= inputCombustibleEl.value;
 let precioI= inputPrecioEl.value;
 
 if (validacionCorrectaInputs(marcaI,modeloI,ageI,colorI,kilometrajeI,combustibleI,precioI)) {
 
      //creo el objeto vehiculo
        let vehiculo= {
            id: idGral , 
            marca: inputMarcaEl.value,
            modelo: inputModeloEl.value,
            age: inputAgeEl.value,
            color: inputColorEl.value,
            kilometraje: inputKilometrajeEl.value,
            combustible: inputCombustibleEl.value, 
            precio: inputPrecioEl.value,
          }
      idGral=idGral+1;
      //agrego el vehiculo al arreglo de objetos vehiculo

      let tbodyEl=document.getElementById("bodyMiTabla");

      if (posicionAeditar==-1) {   // AGREGAR FILA AL FINAL
        
              vehiculos.push(vehiculo);
              console.table(vehiculos);
              let posicionFinal=vehiculos.length -1 ;
           
              //crearFila(vehiculos,tbodyEl,posicionFinal);
              borrarElementosTabla();

              crearCuerpoTabla(vehiculos,tbodyEl);

      } else {  // EDITAR UNA FILA
              console.log("la posicion a editar es :"+posicionAeditar);
              vehiculos[posicionAeditar].marca=inputMarcaEl.value;
              vehiculos[posicionAeditar].modelo=inputModeloEl.value;
              vehiculos[posicionAeditar].age=inputAgeEl.value;
              vehiculos[posicionAeditar].color=inputColorEl.value;
              vehiculos[posicionAeditar].kilometraje=inputKilometrajeEl.value;
              vehiculos[posicionAeditar].combustible=inputCombustibleEl.value;
              vehiculos[posicionAeditar].precio=inputPrecioEl.value;

              borrarElementosTabla();

              crearCuerpoTabla(vehiculos,tbodyEl);
        }
  
        overlayEl.classList.add('display-none');

   }   // IF DE LA VALIDACION
else  // SI HAY CAMPOS INVALIDOS EN EL OVERLAY
      alert("Existe al menos un Campo Inválido !");
  });   // CIERRE DEL ADDEVENLISTENNER

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








