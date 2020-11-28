/* Se muestra el modal cuando finaliza la compra */
function showModal() {
    /*
    totalPriceEl.innerText = price;
    */
    console.log("llamado a la funcion showModal()"); 
    overlayEl.classList.remove('display-none');
}

/* Se limpian los inputs luego de agregar el producto, 
sencillamente cambiamos el value de precio y cantidad
por una cadena vacia y al select de los productos le volvemos a indicar 
que use el primer producto por defecto 
Esta funcion me vá a servir para agregar una fila, o para editar */

/*
function clearInputs(){
    inputPriceEl.value = '';
    inputProdEl.value = productos[0];
    inputQuantityEl.value = '';
}
*/