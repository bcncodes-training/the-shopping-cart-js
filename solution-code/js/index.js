function deleteItem(e){

}

function getPriceByProduct(itemNode){
return    (parseInt(itemNode.getElementsByClassName('item-price')[0].innerHTML)*(parseInt(itemNode.querySelector('#qty').value)||1))
}

function updatePriceByProduct(productPrice, index){
    let totalItem = document.getElementsByClassName('total-item')[index];
    totalItem.innerHTML=productPrice +'€';
}

/* Recupera el precio unitario del producto
    1. buscar el item padre
    2. Recupero el item que tiene precio 
Recupera la cantidad de ítems deseados
Calcula el precio total según los datos anteriores
Actualiza el precio toal del DOM */

function getTotalPrice() {
    let items = document.getElementsByClassName('row');
    let total=0;
    for (let i=0;i<items.length; i++){
        let pricePerProduct = getPriceByProduct(items[i]);
        updatePriceByProduct(pricePerProduct,i);
        total+=pricePerProduct;
    }
    document.querySelector('h2>span').innerHTML=total+' €'
}

function createQuantityInput(){

}

function createDeleteButton(){

}

function createQuantityNode(){

}

function createItemNode(dataType, itemData){

}

function createNewItemRow(itemName, itemUnitPrice){

}

function createNewItem(){

}

addEventListener('load', ()=>{
    let btnCalculatePrice = document.querySelector('.btn-success');
    btnCalculatePrice.addEventListener('click',getTotalPrice);
});
