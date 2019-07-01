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
lista.options[0] = new Option("--selecciona---");
lista.options[0].value = 0;// indice de datos seleccionados

    for (let producto of baseDeDatos){
        let option = new Option(producto.nombre);
        option.value = producto.id;
        lista.add(option);
    }
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
//pintado de los elemntos HTML
    tdh1.innerHTML ='Concepto';
    tdh2.innerHTML = 'Cuantia';
    //declaramos que introducir en la cabecera
    trheader.appendChild(tdh1);
    trheader.appendChild(tdh2);
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
        // lo que tienen que pintar
        tdnombre.innerHTML = prod.nombre;//declaracion del prod en for
        tdprecio.innerHTML = prod.precio.toFixed(2);
        //donde?
        tr.appendChild(tdnombre);
        tr.appendChild(tdprecio);
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
    tdiva2.innerHTML = sumIva.toFixed(2);
    //introduccion en la tablas
    triva.appendChild(tdiva1);
    triva.appendChild(tdiva2);
    
    //contenedores total

    let trtotal = document.createElement('tr');
    let tdtotal1 = document.createElement('td');
    let tdtotal2 = document.createElement('td');
    //pintado
    tdtotal1.innerHTML = 'TOTAL + IVA';
    tdtotal2.innerHTML = sumTotal.toFixed(2);
    //introduccion tabla
    trtotal.appendChild(tdtotal1);
    trtotal.appendChild(tdtotal2);

    //pintado tabla
    tabla.appendChild(triva);
    tabla.appendChild(trtotal);

}

function init(){
    button1 = document.getElementById("boton1");
    button2 = document.getElementById("boton2");
    lista = document.getElementById("productos");
    tabla = document.querySelector('table:nth-child(1)');
    button1.addEventListener('click', anhadirProducto);
    anyadirProducto();
    

}
window.addEventListener( 'load', init);