//llamada de los elementos html
/*
eventos onClick
recogida datos campos input
lectura y pintado de datos input
añadido de más productos
suma productos :¿array?
pintado final: suma y productos en div
reset y todo en blanco

*/
/* Lo mejor del ejercicio es que habías empezado muy bien!!
let button1 = document.getElementById("boton1");
let button2 = document.getElementById("boton2");

//recogida inputs

//let recogeDatos1 = document.getElementById("name");
//let recogeDatos2 = document.getElementById("money");
let lista = document.getElementById("productos");

Comentamos mi recogida de los inputs por que vamos a ponerlas al final del documento
*/

let button1 =   null;
let button2 =   null;
let button3 =   null;
let btnanyadir = null;
let lista   =   null;
let tabla   =   null;


//creacion array base datos

let baseDeDatos = [
    {
        id: 1,
        nombre: 'Zapatos',
        precio: 39.95,//array paralelos mirar
        iva: 8,
        Total: 47.95
    },
    {
        id: 2,
        nombre: 'Bolsos',
        precio: 29.95,
        iva: 6,
        Total: 35.95
    },
    {
        id: 3,
        nombre: 'Cinturones',
        precio: 19.95,
        iva: 4,
        Total: 23.95
    },
    {
        id: 4,
        nombre: 'Chaquetas',
        precio: 69.95,
        iva: 12,
        Total: 81.95
    }

];

let productosAnhadidos = [];

function anyadirProducto (){
lista.innerHTML = " ";
lista.options[0] = new Option("--selecciona---");
lista.options[0].value = 0;// indice de datos seleccionados

    for (let producto of baseDeDatos){
        let option = new Option(producto.nombre);
        option.value = producto.id;
        lista.add(option);
    }
}
function leerArchivo(e) {
    let archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    let lector = new FileReader();
    lector.onload = function(e) {
      let contenido = e.target.result;
     productosAnhadidos = JSON.parse(contenido);
        printTabla();//no parametros por tener la array already
    };
    lector.readAsText(archivo);
  }
  function descargarArchivo(){
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(productosAnhadidos));
    let dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "array.txt");
    dlAnchorElem.click();
  }
  
function quitarProducto(){

}

function anyadoCarro(){

}

function quitarCarro(){

}

function sumarProducto(){

}

function restarProducto(){
   
}
function anhadirProducto(){
    let idx = lista.selectedIndex - 1;
    let id = lista[lista.selectedIndex].value;// cogemos dato seleccionado  y recogemos su valor
    let nombre = baseDeDatos[idx].nombre;//corchetes al mirar declaracion ayuda a saber siu es un array de objetos
    let precio = baseDeDatos[idx].precio;
// null and false staments in javascript  buscar
    let iva = baseDeDatos[idx].iva;

    productosAnhadidos.push( { nombre : nombre, precio : precio, id : id, iva : iva});
    printTabla();
}
function clearTabla(){
   //let tabla = document.querySelector('table:nth child(1)');//mientras exista el primer hijo, evaluacion booleana, if**frist null=false, se cierra bucle,
   //if tabla.first != true: verdadero
    while(tabla.firstChild){
        tabla.removeChild(tabla.firstChild);
    }
}

function printTabla(){
    clearTabla();//callback de la funcion de borrado
    let trheader = document.createElement('tr');
    //declaracion de creacion elementos html
    let tdh1 = document.createElement('td');
    let tdh2 = document.createElement('td');
    let tdh3 = document.createElement('td');

//pintado de los elemntos HTML
    tdh1.innerHTML ='Concepto';
    tdh2.innerHTML = 'Cuantia';
    tdh3.innerHTML = 'Borrar';
    //declaramos que introducir en la cabecera
    trheader.appendChild(tdh1);
    trheader.appendChild(tdh2);
    trheader.appendChild(tdh3);//boton eliminar
    //todo dentro de la tabla
    tabla.appendChild(trheader);

    //declaracion de let = 0 para que siempre haya un valor

    let sumIva = 0;
    let sumTotal = 0;

    //creacion del loop

    for (let prod of productosAnhadidos){
        let tr          = document.createElement('tr');
        let tdnombre    = document.createElement('td');
        let tdprecio    = document.createElement('td');
        let tdborrar    = document.createElement('td');

        let botonBorrar = document.createElement('button');
        botonBorrar.innerHTML = 'Borrar';//dentrpo boton
        botonBorrar.addEventListener('click', function(){
            eliminarElemento(prod.id);
        });
        tdborrar.appendChild(botonBorrar);
        // lo que tienen que pintar
        tdnombre.innerHTML = prod.nombre;//declaracion del prod en for
        tdprecio.innerHTML = parseFloat(prod.precio).toFixed(2);
    
        //donde?
        tr.appendChild(tdnombre);
        tr.appendChild(tdprecio);
        tr.appendChild(tdborrar);
        tabla.appendChild(tr);
        //iva , formula sacada de StackFlow
        let iva     = parseFloat(prod.iva / 100.0) *prod.precio;
        sumIva      += iva;
        sumTotal    += (prod.precio + iva);

    }
    //creacion contenedores para el iva
    let triva   = document.createElement('tr');
    let tdiva2  = document.createElement('td');
    let tdiva1  = document.createElement('td');
    //pintado
    tdiva1.innerHTML ='IVA';
    tdiva2.innerHTML = parseFloat(sumIva).toFixed(2);
    //introduccion en la tablas
    triva.appendChild(tdiva1);
    triva.appendChild(tdiva2);
    
    //contenedores total

    let trtotal = document.createElement('tr');
    let tdtotal1 = document.createElement('td');
    let tdtotal2 = document.createElement('td');
    //pintado
    tdtotal1.innerHTML = 'TOTAL + IVA';
    tdtotal2.innerHTML = parseFloat(sumTotal).toFixed(2);
    //introduccion tabla
    trtotal.appendChild(tdtotal1);
    trtotal.appendChild(tdtotal2);

    //pintado tabla
    tabla.appendChild(triva);
    tabla.appendChild(trtotal);

}
function eliminarElemento(id){
    for(let i = 0; i < productosAnhadidos.length; i++){
        if(parseInt(productosAnhadidos[i].id) == id){
            //tabla.deleteRow(i+1);
            productosAnhadidos.splice(i, 1);//realizar ejercicios!
            printTabla();//volvemos a pintar los elementos e la tabla
            return; //return vacio sale del metodo
            //al salir no volveremos a usarlo!Mirar libreta
        }
    }
}
function anyadirProductoBBDD(){

    let id       = document.getElementById('txtid').value;//nos coge el valor 
    let nombre   = document.getElementById('txtnombre').value;//nos coge el valor 
    let precio   = document.getElementById('txtprecio').value;//nos coge el valor 
    let iva      = document.getElementById('txtiva').value;//nos coge el valor 
    let total    = precio +parseFloat((precio* iva)/100);
    baseDeDatos.push({id:id, nombre:nombre, precio:precio, iva:iva, total:total});
    anyadirProducto();
}

function init(){
    button1 = document.getElementById("boton1");
    button2 = document.getElementById("boton2");
    button3 = document.getElementById("boton3");
    btnanyadir = document.getElementById("btnanyadir");
    lista = document.getElementById("productos");
    tabla = document.querySelector('table:nth-child(1)');
    button1.addEventListener('click', anhadirProducto);
    button3.addEventListener('click', descargarArchivo);
    btnanyadir.addEventListener('click', anyadirProductoBBDD);
    try{
        baseDeDatos = JSON.parse(localStorage.getItem('bbdd'));
       if( baseDeDatos == null)
       baseDeDatos = [];
    }catch(exc){
        
        console.log(exc);
    }
    document.getElementById('file-input')
  .addEventListener('change', leerArchivo, false);

    anyadirProducto();
    

}
function destroy(){
    try{
        localStorage.setItem('bbdd', JSON.stringify(baseDeDatos));
    }catch(exc){

    }
}
window.addEventListener( 'load', init);
window.addEventListener( 'unload', destroy);
