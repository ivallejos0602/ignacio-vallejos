
let idGral=vehiculos.length;  // ESTA VARIABLE SIRVE PARA GENERAR IDENTIFICADORES DE VEHICULOS

//ELEMENTOS DE LA TABLA - DEFINICION DEL CUERPO DE TABLA
let tbodyEl=document.createElement("tbody");
tbodyEl.id = "bodyMiTabla";

let divContenedor = document.getElementById("div-contenedor");
let btnAddVehiculoEl=document.getElementById("btnAddVehiculo");
let overlayEl = document.getElementsByClassName('overlay')[0];   //overlay del input de carga y edicion
let radNaftaEl = document.getElementById("nafta");
let radGncEl = document.getElementById("gnc");
let radDieselEl = document.getElementById("diesel");
let radAllEl = document.getElementById("all");
//let ConfirmEl = document.getElementsByClassName('overlay')[0];



/****************************/
/* elementos del modal para agregar un Vehiculo en la tabla*/ 

let inputMarcaEl=document.getElementById("inputMarca");
let inputModeloEl=document.getElementById("inputModelo");
let inputKilometrajeEl=document.getElementById("inputKilometraje");
let inputAgeEl=document.getElementById("inputAge");
let inputColorEl=document.getElementById("inputColor");
let inputCombustibleEl=document.getElementById("inputCombustible");
let inputPrecioEl=document.getElementById("inputPrecio");

let btnModalBorrarEl=document.getElementById("btn-modal-borrar");


/****************************/

let posicionABorrar; // en el listenner del botón Borrar cuando se crea la fila, se seteará está variable

let posicionAeditar=-1;   // esta variable es para discernir en el botón aceptar si el aceptar
                    // es por agregar una fila mas en la tabla, o false en caso que edite una fila  
                    // si editar=-1 entonces AGREGAR. SI editar >=0 entonces EDITAR 
var tabla=document.createElement("table");

tabla.id = "MiTabla";

let borrarVehiculo = (vehiculos,idVehiculo) => {

  let resultado;

  resultado=vehiculos.filter(vehiculo => vehiculo.id !== idVehiculo);
   
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

   // CREO EL BOTON DE BORRADO DE LA FILA
  let botonD = document.createElement("button");
  botonD.setAttribute("type","button");

  /*
  botonD.classList.add('btn');
  botonD.classList.add('btn-primary');
  */
 
  botonD.setAttribute("data-toggle","modal");
  botonD.setAttribute("data-target","#myConfirmAction");

  botonD.innerText="delete";

  botonD.classList.add('button');
  botonD.classList.add('button3');

  botonD.addEventListener("click", (ev) => {

    ev.preventDefault();
    debugger;
    posicionABorrar=posicion;  // SETEA LA POSICION DE LA FILA A BORRAR

    console.log("borrar posicion :"+posicionABorrar);

    /*

    vehiculos=[...borrarVehiculo(vehiculos,parseInt(fila.id))];
 
    borrarElementosTabla();
  
     crearCuerpoTabla(vehiculos,tbodyEl);

    */ 
  
     
  });  //FIN LISTENNER BOTON BORRAR

  
  td.appendChild(botonE);
  td.appendChild(botonD);

  fila.appendChild(td); 

tbodyEl.appendChild(fila);

}


btnModalBorrarEl.addEventListener("click", (ev) => {

    vehiculos=vehiculos.filter((vehiculo,indice) => indice != posicionABorrar);
 
    borrarElementosTabla();
  
     crearCuerpoTabla(vehiculos);

     $('#myConfirmAction').modal('hide');
});

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

let crearCuerpoTabla = (mobilidades) => {
// i es la posicion del vector, que se pasa como parametro en la funcion crearFila
  
  for (let i = 0; i < mobilidades.length; i++) {
    crearFila(tbodyEl,i); //paso i como parámetro porque es la posicion en el array
  }
  
}

/********************************************************* **/

let crearTabla = (vehiculos,tabla) => {

//let tbodyEl=document.createElement("tbody");
  
//tbodyEl.id = "bodyMiTabla";

 crearEncabezadoTabla(vehiculos[0],tabla);

  crearCuerpoTabla(vehiculos);

  tabla.appendChild(tbodyEl);

  divContenedor.appendChild(tabla);


}

/********************************************************* **/

window.addEventListener("load", () => {
       crearTabla(vehiculos,tabla);
});

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
                                              console.table(vehiculosANafta );
                                              crearCuerpoTabla(vehiculosANafta);
                                              
                                               });
 
   radGncEl.addEventListener("click", () => {
                                                vehiculosAGnc = vehiculos.filter(auto => 
                                                    auto.combustible=="gnc");
                                                 borrarElementosTabla();
                                                 console.table(vehiculosAGnc);
                                                 crearCuerpoTabla(vehiculosAGnc);
                                                 
                                                 });
    radDieselEl.addEventListener("click", () => {
                                                  vehiculosADiesel = vehiculos.filter(auto => 
                                                  auto.combustible=="diesel");
                                                  borrarElementosTabla();
                                                  crearCuerpoTabla(vehiculosADiesel);
                                                   });   
                                                   
    radAllEl.addEventListener("click", () =>  {
                                                 // console.log("arreglo backup:"+vehiculosBak);
                                                  borrarElementosTabla();
                                                  crearCuerpoTabla(vehiculos);
                                                   } );                                               
                                              

/*********************************************** */


function showModal() {
   overlayEl.classList.remove('display-none');
}

/* Aca tengo el manejador del evento click */
btnAddVehiculoEl.addEventListener('click', () => {
    //ev.preventDefault();
    posicionAeditar=-1; 
    clearInputs();
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

              crearCuerpoTabla(vehiculos);

      } else {  // EDITAR UNA FILA
             
              vehiculos[posicionAeditar].marca=inputMarcaEl.value;
              vehiculos[posicionAeditar].modelo=inputModeloEl.value;
              vehiculos[posicionAeditar].age=inputAgeEl.value;
              vehiculos[posicionAeditar].color=inputColorEl.value;
              vehiculos[posicionAeditar].kilometraje=inputKilometrajeEl.value;
              vehiculos[posicionAeditar].combustible=inputCombustibleEl.value;
              vehiculos[posicionAeditar].precio=inputPrecioEl.value;

              borrarElementosTabla();

              crearCuerpoTabla(vehiculos);
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

// FUNCION PARA EL MODAL DE CONFIRMACION DE UNA ACCION

/*
function confirmAgregarVehiculo() {
  var txt;
  var r = confirm("Press a button!");
  if (r == true) {
    txt = "You pressed OK!";
  } else {
    txt = "You pressed Cancel!";
  }
  console.log("ACCION CONFIRMADA --> "+txt);
  alert(txt);
  
}
*/

/*
btnConfirmAceptar.addEventListener("click", () => {
  //clearInputs();
  overlayConfirmEl.classList.add('display-none');
        
      });  
*/




