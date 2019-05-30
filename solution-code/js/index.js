/*Elimina fila*/
function deleteItem(e){
    selectedRow = e.currentTarget.parentNode.parentNode;
    nodoPadre = selectedRow.parentNode;
    nodoPadre.removeChild(selectedRow);
}
/*Calcula el precio total por producto*/
function getPriceByProduct(itemNode){
return    (parseInt(itemNode.getElementsByClassName('item-price')[0].innerHTML)*(parseInt(itemNode.querySelector('#qty').value)||1))
}

/*Actualiza el valor del precio total por producto*/
function updatePriceByProduct(productPrice, index){
    let totalItem = document.getElementsByClassName('total-item')[index];
    totalItem.innerHTML=productPrice +'€';
}

/*Calcula el precio total por cada uno de los productos del carrito. Actualiza el precio total del carrito.*/
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

/*Función de creación del elemento botón delete*/
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

/*Función de creación del elemento quantity*/
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

/*Función de creación de elementos tipo div. Recibe por parámetros el tipo de datos que representa y el valor*/
function createItemNode(dataType, itemData="0€"){

    let element = document.createElement('div');
    let span = document.createElement('span');
    let textnode = document.createTextNode(itemData);

    span.appendChild(textnode);
    element.appendChild(span);

    element.className="item-"+dataType+ " col";

    return element;
    


}

/*Crea una fila nueva*/
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

/*Inserta la fila creada por encima de la última fila*/
function createNewItem(){
  let itemsList = document.querySelector('.container');
  let itemRowsLength = itemsList.getElementsByClassName('row').length;
  let lastItemRow = itemsList.getElementsByClassName('row')[itemRowsLength-1];

  let itemName = document.getElementById('item-name-create').value;
  let itemUnitPrice = document.getElementById('item-price-create').value;
  let itemRow = createNewItemRow(itemName, itemUnitPrice);

  itemsList.insertBefore(itemRow, lastItemRow);

}

/*Carga de la página. Realiza la asociación de los eventos de botón a las funciones 'Listeners' de los mismos.*/
addEventListener('DOMContentLoaded', ()=>{
    let btnCalculatePrice = document.querySelector('.btn-success');
    let btnCreateRow = document.querySelector('.btn-create');
    btnCalculatePrice.addEventListener('click',getTotalPrice);
    btnCreateRow.addEventListener('click', createNewItem);
    
    let rows = document.getElementsByClassName('row');
        for(let i=0;i<rows.length;i++){
            rows[i].querySelector('.btn-delete')
                        .addEventListener('click',deleteItem);
        }
});
