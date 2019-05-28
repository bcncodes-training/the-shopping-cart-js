function creaLineaProducto() {
    let contenedor = document.getElementById('lpcontainer');
    contLineas++;
    creaContenedor(contenedor);
    contenedor = document.getElementById('linea'+contLineas);
    creaProducto(contenedor);
    creaPrecio(contenedor);
    creaQTY(contenedor);
    creaQTYInput(contenedor);
    creaTotalLinea(contenedor);
    creaBotonDelete(contenedor);
}

function creaContenedor(contenedor) {
    // Contenedor de Linea del Producto
    let element = document.createElement('div');
    contenedor.appendChild(element);
    element.setAttribute('id','linea'+contLineas);
    element.setAttribute('class','linea');
}

function creaProducto(contenedor) {
    let producto = document.getElementById('producto');
    let element = document.createElement('span');
    contenedor.appendChild(element);
    element.innerText = producto.value;
}

function creaPrecio(contenedor) {
    let precio = document.getElementById('precio');
    let element = document.createElement('span');
    contenedor.appendChild(element);
    element.innerText = precio.value;
    element.setAttribute('class','precios');
}

function creaQTY(contenedor) {
    let element = document.createElement('span');
    contenedor.appendChild(element);
    element.innerText = 'QTY';
}

function creaQTYInput(contenedor) {
    let element = document.createElement('input');
    contenedor.appendChild(element);
    element.setAttribute('class','input');
    element.setAttribute('type','text');
}

function creaTotalLinea(contenedor) {
    let element = document.createElement('span');
    contenedor.appendChild(element);
    element.innerText = '€';
    element.setAttribute('class','eurosProducto');
}

function creaBotonDelete(contenedor) {
    let element = document.createElement('div');
    contenedor.appendChild(element);
    let SubContenedor = contenedor.getElementsByTagName('div'); 
    // Solo existe uno
    element = document.createElement('span');
    SubContenedor[0].appendChild(element);
    element.innerText = 'Delete';
    element.setAttribute('class','btn btn-delete');
}

function calculaPrecios() {
    let contenedor = document.getElementById('lpcontainer');
    let mLineas = contenedor.getElementsByClassName('linea');
    let cantidad, precio, totalLinea;
    for(let i=0; i<mLineas.length; i++) {
        // Cantidad de Producto
        contenedor = mLineas[i].getElementsByTagName('input'); 
        cantidad = contenedor[0].value;
        // Precio del Producto
        contenedor = mLineas[i].getElementsByClassName('precios'); 
        precio = contenedor[0].innerText;
        // Total Linea
        totalLinea = parseFloat(precio) * parseFloat(cantidad);
        contenedor = mLineas[i].getElementsByClassName('eurosProducto'); 
        contenedor[0].innerText = totalLinea;

    }  
}

let contLineas = 0;
addEventListener('load', ()=>{
    // Lanza Evento Boton Create
    let botonCreate = document.getElementById('bCreate');
    botonCreate.addEventListener('click', creaLineaProducto);
    // Lanza Evento Boton bCalculate
    let botonCalculate = document.getElementById('bCalculate');
    botonCalculate.addEventListener('click', calculaPrecios);

});
