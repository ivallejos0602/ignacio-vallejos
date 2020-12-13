let idGral=vehiculos.length;  // ESTA VARIABLE SIRVE PARA GENERAR IDENTIFICADORES DE VEHICULOS

//let vehiculosBak=[];  // SE USA CUANDO SE APLICAN FILTROS

let vehiculosBak=vehiculos;

//ELEMENTOS DE LA TABLA - DEFINICION DEL CUERPO DE TABLA
let tbodyEl=document.createElement("tbody");

tbodyEl.id = "bodyMiTabla";

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
  botonD.setAttribute("data-toggle","modal");
  botonD.setAttribute("data-target","#myConfirmAction");
  botonD.innerText="delete";
  botonD.classList.add('button');
  botonD.classList.add('button3');

  botonD.addEventListener("click", (ev) => {

    ev.preventDefault();
    posicionABorrar=posicion;  // SETEA LA POSICION DE LA FILA A BORRAR
     
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
     $('#progressBarModal').modal('show');
     displayProgressBar();
});

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

 let crearCuerpoTabla = (mobilidades) => {
    // i es la posicion del vector, que se pasa como parametro en la funcion crearFila
    for (let i = 0; i < mobilidades.length; i++) {
        crearFila(tbodyEl,i); //paso i como parámetro porque es la posicion en el array
  }  
}

let crearTabla = (vehiculos,tabla) => {

    crearEncabezadoTabla(vehiculos[0],tabla);
    crearCuerpoTabla(vehiculos);
    tabla.appendChild(tbodyEl);
    divContenedor.appendChild(tabla);
}

window.addEventListener("load", () => {
       crearTabla(vehiculos,tabla);
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
                                               vehiculosBak = vehiculos;
                                               vehiculos = vehiculos.filter(auto => 
                                               auto.combustible=="nafta");
                                               borrarElementosTabla();
                                               crearCuerpoTabla(vehiculos);
                                              });
 
   radGncEl.addEventListener("click", () => {
                                                vehiculosBak = vehiculos;
                                                vehiculos = vehiculos.filter(auto => 
                                                auto.combustible=="gnc");
                                                borrarElementosTabla();
                                                crearCuerpoTabla(vehiculos);
                                              });

    radDieselEl.addEventListener("click", () => {
                                                  vehiculosBak = vehiculos;
                                                  vehiculos = vehiculos.filter(auto => 
                                                  auto.combustible=="diesel");
                                                  borrarElementosTabla();
                                                  crearCuerpoTabla(vehiculos);
                                                });   
                                                   
    radAllEl.addEventListener("click", () =>    {
                                                  vehiculos=vehiculosBak;  
                                                  borrarElementosTabla();
                                                  crearCuerpoTabla(vehiculos);
                                                });                                               

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

/* eventos de los botones del modal */

let validacionCorrectaInputs = (marcaI,modeloI,ageI,colorI,kilometrajeI,combustibleI,precioI) => {
 
  let valida=true;

  if (modeloI=="" || kilometrajeI=="" || precioI=="" || marcaI=="none" || ageI=="" || colorI=="none" || combustibleI=="none")
      valida=false;

  return valida;   

}
formInputVehiculoEl.addEventListener("submit", (ev) => {

  ev.preventDefault();
  
 let marcaI= inputMarcaEl.value;
 let modeloI= inputModeloEl.value;
 let ageI= inputAgeEl.value;
 let colorI= inputColorEl.value;
 let kilometrajeI= inputKilometrajeEl.value;
 let combustibleI= inputCombustibleEl.value;
 let precioI= inputPrecioEl.value;
 
 if (validacionCorrectaInputs(marcaI,modeloI,ageI,colorI,kilometrajeI,combustibleI,precioI)) {
 
       // displayProgressBar();  // Barra de Progreso
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
              let posicionFinal=vehiculos.length -1 ;
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
      
        $("#progressBarModal").modal('show');

        displayProgressBar();
        

   }   // IF DE LA VALIDACION
else  // SI HAY CAMPOS INVALIDOS EN EL OVERLAY
      alert("Existe al menos un Campo Inválido !");
    

     
  });   // CIERRE DEL ADDEVENLISTENNER   

btnCancelarAgregarVehiculo.addEventListener("click", () => {
     
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

function displayProgressBar() {

  let percent=0;
  percentStyleEl.style.width = "0%";
  const timerPB = setInterval(function(){  
      percent += 10; 
      percentStyleEl.style.width = percent + "%";
      if (percent == 110){
          clearInterval(timerPB);
          $("#progressBarModal").modal('hide');
      }    

  },200);

}