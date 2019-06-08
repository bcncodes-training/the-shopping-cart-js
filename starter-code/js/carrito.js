let contadorProd=0;
function creaContentNouProduct(){
    contadorProd++;
    let prod=document.getElementById('addedProducte');
    let newProd=creaAddedProduct(prod,'div','','nouProd');
    newProd.classList.add( `prod${contadorProd}`);
    createProduct(newProd);
    let imp=createImport(newProd);
    let qty=createQuantity(newProd);
    creaSubTotal(newProd,imp,qty);
    createDeleteButton(newProd);
    getTotalPrice();
}
function createProduct(father){
    let prod=document.getElementById('nouProducte');
    let newProd=creaAddedProduct(father,'div',prod.value,'');
    //newProd.setAttribute('class','nouDescripcio');
    newProd.setAttribute('class',`nouDescripcio prod${contadorProd}`);
}
function createImport(father){
    let prod=document.getElementById('nouImport');
    let newProd=creaAddedProduct(father,'div',prod.value,'');
    newProd.setAttribute('class',`nouImport  prod${contadorProd}`);
    return newProd;
}
function createQuantity(father){
    let newProd=creaAddedProduct(father,'input','','');
    newProd.value=1;
    newProd.setAttribute('class',`nouQuantitat prod${contadorProd}`);
    newProd.setAttribute('type','number');
    newProd.addEventListener('change',calculSubtotal);
    return newProd;
}
function calculSubtotal(e){
    let classProd=document.getElementsByClassName(e.target.classList[1]);
    console.log(classProd[2].innerText);
    console.log(classProd[3].value);
    classProd[4].innerText=(parseInt(classProd[2].innerText)*classProd[3].value)+' €';
    console.log(classProd[4].innerText);
    getTotalPrice();
}
function creaSubTotal(father,imp,qty){
    let subt=parseInt(imp.innerText)*parseInt(qty.value);
    let newProd=creaAddedProduct(father,'div',subt+' €','');
    newProd.value=1;
    newProd.setAttribute('class',`nouSubtotal prod${contadorProd}`);
    return newProd;
}
function createDeleteButton(father){
    let newProd=creaAddedProduct(father,'div','Delete','');
    newProd.setAttribute('class',`deleteButton prod${contadorProd} btn btn-delete`);
    newProd.addEventListener('click',deleteItem);

}
function creaAddedProduct(father,child,text,clas){
    //let contenedorNous=document.getElementById(father);
    let producte=document.createElement(child);
    producte.innerText=text;
    producte.setAttribute('class',clas);
    father.appendChild(producte);
    return producte;    
}
function deleteItem(e){
    let classProd=document.getElementsByClassName(e.target.classList[1]);
    let prod=document.getElementById('addedProducte');
    prod.removeChild(classProd[0]); 
    getTotalPrice();  
}
/*
function getPriceByProduct(itemNode){

}

function updatePriceByProduct(productPrice, index){

}
*/
function getTotalPrice() {
   let nouProd=document.getElementsByClassName('nouProd');
   let Total=0;
   for (let index = 0; index < nouProd.length; index++) {
       let subTotal=document.getElementsByClassName(nouProd[index].classList[1]);
    console.log(parseInt(subTotal[4].innerText));
        Total+=parseInt(subTotal[4].innerText);
        console.log(Total);
}
let tPrice=document.getElementById('totalPrice');
tPrice.innerText=`Total Price: ${Total} €`;

}

function createQuantityInput(){

}


function createQuantityNode(){

}

function createItemNode(dataType, itemData){

}

function createNewItemRow(itemName, itemUnitPrice){

}

function createNewItem(){

}

addEventListener('load', ()=>{});

