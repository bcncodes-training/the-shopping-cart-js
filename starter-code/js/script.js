
function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function creaContenedorList() {
    // Titulo
    let contenedor = document.getElementsByTagName('body');
    let element = document.createElement('h1');
    element.innerText = "Gestión de Stock";
    contenedor[0].appendChild(element);
    // Contenedor de Linea del Producto
    element = document.createElement('div');
    contenedor[0].appendChild(element);
    element.setAttribute('class','lpcontainer');
}

function listStock() {
    document.getElementsByTagName('body')[0].innerText = '<script type="text/javascript" src="./js/script.js"></script>';
    creaContenedorList();
    creaCabecera();
    let contenedor = document.getElementsByClassName('lpcontainer');
    let element, subcontenedor;
    let i=0;
    mData.forEach(e => {
        // contenedor div.linea
        element = document.createElement('div');
        element.setAttribute('class','linea');
        contenedor[0].appendChild(element);
        subcontenedor = contenedor[0].getElementsByClassName('linea');
        // _id
        elementoListStock(subcontenedor[i],e._id);
        // name
        elementoListStock(subcontenedor[i],e.name);
        // category
        elementoListStock(subcontenedor[i],e.category);
        // quantity
        elementoListStock(subcontenedor[i],e.quantity);
        // Casilla para marcar borrado
        elementoDeleteStock(subcontenedor[i])
        // demand
        if(mPedidos.length == mData.length)
            elementoListStock(subcontenedor[i],mPedidos[i].demand);
        else   
            elementoListStock(subcontenedor[i],"-");
        // input demand
        elementoDemandStock(subcontenedor[i]);
        i++;
    });
    // botones demand y Add Product
    // Contenedor de Linea del Producto
    element = document.createElement('div');
    contenedor[0].appendChild(element);
    element.setAttribute('class','botones');
    creaBotonDemand(document.getElementsByClassName('botones')); 
    creaBotonAddProduct(document.getElementsByClassName('botones'),"id-btn-addprod1"); 
    creaBotonDeleteProduct(document.getElementsByClassName('botones')); 
}

function creaCabecera() { 
    let contenedor = document.getElementsByClassName('lpcontainer');
    let element = document.createElement('div');
    element.setAttribute('class','cabecera');
    contenedor[0].appendChild(element);
    let subcontenedor = contenedor[0].getElementsByClassName('cabecera');
    // _id
    elementoListStock(subcontenedor[0],"ID");
    // name
    elementoListStock(subcontenedor[0],"NAME");
    // category
    elementoListStock(subcontenedor[0],"CATEGORY");
    // quantity
    elementoListStock(subcontenedor[0],"QUANTITY");
    // Casilla para marcar borrado
    elementoListStock(subcontenedor[0],"DELETE");
    // demand
    elementoListStock(subcontenedor[0],"DEMAND");
}

function elementoListStock(conten,campo) {
    let element = document.createElement('span');
    element.innerText = campo;
    conten.appendChild(element);
}

function elementoDemandStock(conten) {
    // input demand
    let element = document.createElement('input');
    conten.appendChild(element);
    element.setAttribute('class','input demand');
    element.setAttribute('type','text');
}

function elementoDeleteStock(conten) {
    // Casilla para marcar borrado
    let element = document.createElement('input');
    conten.appendChild(element);
    element.setAttribute('type','checkbox');
    element.setAttribute('name','erasebox');
    element.setAttribute('class','input delete');
}

function creaBotonDemand(contenedor) {
    let element = document.createElement('div');
    element.setAttribute('class','btn btn-demand');
    element.innerText = 'Demand';
    contenedor[0].appendChild(element);
    // Genero un evento para el boton Demand
    element.addEventListener('click', loadStock);
}

function creaBotonAddProduct(contenedor,suid) {
    let element = document.createElement('div');
    element.setAttribute('class','btn btn-addprod');
    element.setAttribute("id",suid);
    element.innerText = 'Add Product';
    contenedor[0].appendChild(element);
    // Genero un evento para el boton AddProd
    element.addEventListener('click', addProduct);
}

function creaBotonDeleteProduct(contenedor) {
    let element = document.createElement('div');
    element.setAttribute('class','btn btn-delete');
    element.innerText = 'Delete';
    contenedor[0].appendChild(element);
    // Genero un evento para el boton AddProd
    element.addEventListener('click', deleteProduct);
}

function demandProduct(pro,cantidad) {
    //if(cantidad == 0 || cantidad === '' || cantidad == undefined) {
    //    cantidad = (Math.floor(Math.random()*10)+1).toString();
    //}
    let obj = {demand: cantidad};
    newObject = Object.assign({},pro, obj);
    return newObject;
}

function creaContenedorAddProduct() {
    let contenedor = document.getElementsByTagName('body');
    let element = document.createElement('fieldset');
    contenedor[0].appendChild(element);
    //
    let contenedor1 = document.getElementsByTagName('fieldset');
    element = document.createElement('legend');
    element.innerText = "Add Product";
    contenedor1[0].appendChild(element);
    // NOMBRE
    element = document.createElement('span');
    contenedor1[0].appendChild(element);
    element.innerText = "Nombre:";
    //
    element = document.createElement('input');
    contenedor1[0].appendChild(element);
    element.setAttribute('type','text');
    element.setAttribute('name','nombre');
    element.setAttribute('id','nombre1');
    // CATEGORIA
    element = document.createElement('span');
    contenedor1[0].appendChild(element);
    element.innerText = "Categoría:";
    //
    element = document.createElement('input');
    contenedor1[0].appendChild(element);
    element.setAttribute('type','text');
    element.setAttribute('name','categoria');
    element.setAttribute('id','categoria1');
    // CANTIDAD
    element = document.createElement('span');
    contenedor1[0].appendChild(element);
    element.innerText = "Cantidad:";
    //
    element = document.createElement('input');
    contenedor1[0].appendChild(element);
    element.setAttribute('type','number');
    element.setAttribute('name','cantidad');
    element.setAttribute('id','cantidad1');
    // PRECIO
    element = document.createElement('span');
    contenedor1[0].appendChild(element);
    element.innerText = "Precio:";
    //
    element = document.createElement('input');
    contenedor1[0].appendChild(element);
    element.setAttribute('type','text');
    element.setAttribute('name','precio');
    element.setAttribute('id','precio1');
    // BOTON ADD PRODUCT del add product
    creaBotonAddProduct(contenedor1,"id-btn-addprod2"); 
}

function verifNewProduct() {
    return (document.getElementById('nombre1').value !=="" && 
            document.getElementById('categoria1').value !=="" && 
            document.getElementById('cantidad1').value >0 &&
            parseFloat(document.getElementById('precio1').value) > 0);
}

function addNewProduct() {
    let f = new Date();
    let cadenaFech = f.getFullYear()+"-"+f.getMonth()+"-"+f.getDate()+"T";
    cadenaFech+= f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" -01:00";
    let producto = {
            _id: "5ced8cb9new"+contNewProduct.toString().padStart(13,"0"),
            index: mData.length,
            guid: "",
            isActive: false,
            price: parseFloat(document.getElementById('precio1').value),
            picture: "",
            quantity: parseInt(document.getElementById('cantidad1').value),
            name: document.getElementById('nombre1').value,
            registered: cadenaFech,
            category: document.getElementById('categoria1').value,
            tags: []
    }
    contNewProduct++;
    mData.push(producto);
    if(mPedidos.length !== 0) {
        let newProduct = demandProduct(producto,'');
        mPedidos.push(newProduct);
    }
}

// Llamado desde evento
function loadStock(e) {
    let i=0;
    let contenedor = document.getElementsByClassName('linea');
    let cantidad;
    let newPedido, producto;
    // Los arrays mData y mPedidos siemre tienen las mismas dimensiones, salvo la primera vez
    mData.forEach(element => {
        producto = mData.find( prod => prod._id === element._id );
        cantidad = contenedor[i].lastChild.value; // Cantidad a Pedir nueva
        newPedido = mPedidos.find(prod => prod._id === element._id);

        if(cantidad == 0 || cantidad === '' || cantidad == undefined)
            cantidad = ((newPedido !== undefined) ? newPedido.demand : cantidad);

        newProduct = demandProduct(producto,cantidad);
        if(newPedido !== undefined) {
            // Si que existe, lo substituimos
            mPedidos[i] = newProduct;
        } else {
            // Si no existe
            mPedidos.push(newProduct);
        } 
        i++;  
    });
    // Volvemos a listar stock
    listStock();
    console.log(mPedidos);
}

// Llamado desde evento
function addProduct(e) {
    // Averiguamos de que evento venimos
    if(e.target.id==="id-btn-addprod1") {
        document.getElementsByClassName('botones')[0].innerHTML = "";
        creaContenedorAddProduct();
    } else {
        if(verifNewProduct()) {
            addNewProduct()
            listStock();
        }
    }
}

// Llamado desde evento
function deleteProduct(e) {
    let contenedor = document.getElementsByClassName('linea');
    let subcontenedor;
    // Los arrays mData y mPedidos siemre tienen las mismas dimensiones, salvo la primera vez
    for(let i=0; i<contenedor.length; i++) {
        subcontenedor = contenedor[i].getElementsByClassName('delete');
        if(subcontenedor[0].checked) {
            mData[i] = "";
            if(mPedidos.length !== 0)
                mPedidos[i] = "";
        }
    }
    i = 0;
    while (i< mData.length) {
        if(mData[i] == '') {
            mData.splice(i,1);
            if(mPedidos.length !== 0)
                mPedidos.splice(i,1);
        } else
            i++;
    }
    // Volvemos a listar stock
    listStock();
}

///////////////////////////////////////////////
let termino = 0;
let newObject = [];
let mData = []; // BD de Productos
let mPedidos =[]; // BD de Pedidos
let contNewProduct = 1;

readTextFile("../starter-code/data/products.json", function(text){
    mData = JSON.parse(text);
    listStock();
    

});

/*
Ordenar productos según el stock

La función orderProduct() debe permitir ordenar los productos según el stock que tienen. Los productos con poco stock serán los primeros. La función deberá:

    Ordenar el array de productos por el campo quantity en orden ascendente.
    Invocar la función verStock() para actualizar el listado

*/