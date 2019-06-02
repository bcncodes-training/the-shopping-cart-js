function creaLineaProducto() {
    if(verificaLineaProducto()) {
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
}

function verificaLineaProducto() {
    let producto = document.getElementById('producto');
    let precio = document.getElementById('precio');
    if(producto.value === '' || precio.value === '')
        return false;
    return true;
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
    element.setAttribute('class','bDelete');
    contenedor.appendChild(element);
    // Genero un evento para el boton Delete
    mBotonesDelete.push(element.addEventListener('click', borraLineaProducto));
    // Solo existe uno
    let SubContenedor = contenedor.getElementsByTagName('div'); 
    element = document.createElement('span');
    SubContenedor[0].appendChild(element);
    element.innerText = 'Delete';
    element.setAttribute('class','btn btn-delete');
}

function borraLineaProducto(e) {
    let evento = e.currentTarget;
    let elementoPadre = document.getElementById("lpcontainer");
    let elementoHijo = document.getElementById(evento.parentNode.id);
    elementoPadre.removeChild(elementoHijo);
}

function calculaPrecios() {
    let contenedor = document.getElementById('lpcontainer');
    let mLineas = contenedor.getElementsByClassName('linea');
    let cantidad = 0;
    let precio = 0;
    let totalLinea = 0;
    totalCompra = 0;
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
        totalCompra+= totalLinea;
    }  
    creaTotalCompra();
}

function creaTotalCompra() {
    let contenedor = document.getElementById('totalCompra');
    if(contenedor == null) {
        contenedor = document.getElementsByTagName('body');
        let element = document.createElement('h2');
        element.innerText = 'Total Price:';
        contenedor[0].appendChild(element);
        //
        contenedor = document.getElementsByTagName('h2');
        element = document.createElement('span');
        element.innerText = totalCompra + '€';
        element.setAttribute('id','totalCompra');
        contenedor[0].appendChild(element);
    } else
        contenedor.innerText = totalCompra + '€';
}

let contLineas = 0;
let totalCompra = 0;
let mBotonesDelete = new Array;

addEventListener('load', ()=>{
    // Lanza Evento Boton Create
    let botonCreate = document.getElementById('bCreate');
    botonCreate.addEventListener('click', creaLineaProducto);
    // Lanza Evento Boton bCalculate
    let botonCalculate = document.getElementById('bCalculate');
    botonCalculate.addEventListener('click', calculaPrecios);

});
