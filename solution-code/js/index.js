function deleteItem(e){
    selectedRow = e.currentTarget.parentNode.parentNode;
    nodoPadre = selectedRow.parentNode;
    nodoPadre.removeChild(selectedRow);
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


function createDeleteButton(){
    let element = document.createElement('div');
    element.className='col';
    let buttonNode = document.createElement('button');

    buttonNode.className ='btn btn-delete';
    buttonNode.innerHTML ='Delete';
    buttonNode.addEventListener('click',deleteItem);

    element.appendChild(buttonNode);

    return element;

}

function createQuantityNode(){
    let element = document.createElement('div');
    element.className = 'col';

    label = document.createElement('label');
    label.for = 'qty';
    label.innerHTML = 'qty';

    let inputNode = document.createElement('input');
    inputNode.name = 'quantity';
    inputNode.value=0;

    element.appendChild(label);
    element.appendChild(inputNode);

    return element;

}

function createItemNode(dataType, itemData="0€"){

    let element = document.createElement('div');
    let span = document.createElement('span');
    let textnode = document.createTextNode(itemData);

    span.appendChild(textnode);
    element.appendChild(span);

    element.className="item-"+dataType+ " col";

    return element;
    


}

function createNewItemRow(itemName, itemUnitPrice){
    itemRow = document.createElement('div');
    itemRow.className = 'row';

    itemRow.appendChild(createItemNode('name', itemName));
    itemRow.appendChild(createItemNode('price', itemUnitPrice));
    itemRow.appendChild(createQuantityNode());
    itemRow.appendChild(createItemNode('total'));
    itemRow.appendChild(createDeleteButton());

    return itemRow;
}

function createNewItem(e){







}

addEventListener('DOMContentLoaded', ()=>{
    let btnCalculatePrice = document.querySelector('.btn-success');
    btnCalculatePrice.addEventListener('click',getTotalPrice);
    let rows = document.getElementsByClassName('row');
        for(let i=0;i<rows.length;i++){
            rows[i].querySelector('.btn-delete')
                        .addEventListener('click',deleteItem);
        }
});
