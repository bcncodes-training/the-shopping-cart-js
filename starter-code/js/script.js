let myArr = [];
let demandArr = [];
let buyArr = [];
function listStock() {
    let xmlhttp = new XMLHttpRequest();
    let url = "../starter-code/data/products.json";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myArr = JSON.parse(this.responseText);
            printProducts(myArr, 'stockList');
            addListeners();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function addListeners() {
    document.getElementsByClassName('order')[0].addEventListener('click', orderMyArr);
    document.getElementsByClassName('buy')[0].addEventListener('click', buyProducts);
    document.getElementsByClassName('add')[0].addEventListener('click', hideShowAdd);
    document.getElementsByClassName('delete')[0].addEventListener('click', hideShowDelete);
    document.getElementsByClassName('addProduct')[0].addEventListener('click', addNewProduct);
    document.getElementsByClassName('control')[0].addEventListener('click', controlStock);
    }
function loadStock(demand) {
    let repe = false;
    demandArr.forEach(e => {
        if (e[0].product._id == (demand[0].product._id)) {
            e[0].demand = demand[0].demand;
            repe = 'true';
        }

    });
    if (repe === false) { demandArr.push(demand); }
    let demandList = document.getElementsByClassName('demandList');
    demandList[0].innerHTML = 'Nova Comanda<br>';
    demandArr.forEach(e => {
        demandList[0].innerHTML += `${(e[0].demand).toString().padStart(3, '0')}&emsp;-&emsp;${e[0].product.name}<br>`
    });
}
function printProducts(arr, list) {
    let contenedorNous = document.getElementById(list);
    contenedorNous.innerHTML = '';
    arr.forEach((e, i) => {
        let newadded = addProduct(list, 'stocked');
        newadded.setAttribute('class', `stocked stocked${i}`);
        creaAddedProduct(newadded, 'div', e._id, 'id');
        creaAddedProduct(newadded, 'div', e.name, 'nom');
        creaAddedProduct(newadded, 'div', e.category, 'category');
        creaAddedProduct(newadded, 'div', e.quantity, 'qty');
        createQuantity(newadded, i);
        createDemandButton(newadded, i);
        createDeleteButton(newadded, i);
    });
}
function addProduct(list, clase) {
    let contenedorNous = document.getElementById(list);
    return creaAddedProduct(contenedorNous, 'div', '', clase);
}
function addNewProduct(e) {
    let id = ''
    for (let index = 0; index < 12; index++) {
        let rnd1 = 0;
        while (rnd1 === 0) {
            const rnd = Math.floor((Math.random() * 123));
            if ((rnd < 65 || rnd > 90) || ((rnd < 97 || rnd > 122) && (rnd < 65 || rnd > 90))) { }
            else rnd1 = rnd;
        }
        let res = Number(rnd1).toString(16);
        id += res + '';
    }
    myArr.push({ _id: `${id}`, index: myArr.length, name: e.target.parentNode.children[1].value, category: e.target.parentNode.children[3].value, quantity: Math.floor(Math.random() * (200 - 2 + 1)) + 2 });
    printProducts(myArr, 'stockList');
    clearAddProd();
    hideShowAdd();
}
function creaAddedProduct(father, child, text, clas) {
    let contenedorNous = document.getElementById(father);
    let producte = document.createElement(child);
    producte.innerText = text;
    producte.setAttribute('class', clas);
    father.appendChild(producte);
    return producte;
}
function createQuantity(father, counter) {
    let newProd = creaAddedProduct(father, 'input', '', '');
    newProd.setAttribute('class', `nouQuantitat stocked${counter}`);
    newProd.setAttribute('type', 'number');
    return newProd;
}
function createDemandButton(father, counter) {
    let newProd = creaAddedProduct(father, 'div', 'Demand', '');
    newProd.setAttribute('class', `demandButton stocked${counter} btn btn-addNew`);
    newProd.addEventListener('click', function () { demandProduct(myArr[counter]) });

}
function createDeleteButton(father, counter) {
    let newProd = creaAddedProduct(father, 'div', 'Delete', '');
    newProd.setAttribute('class', `deleteButton stocked${counter} btn btn-delete hidden`);
    newProd.addEventListener('click', function () { deleteProduct(myArr[counter], myArr) });

}
function printListProducts(arr, list) {
    let contenedorNous = document.getElementById(list);
    contenedorNous.innerHTML = '';
    arr.forEach((e, i) => {
        let newadded = addProduct(list, 'listed');
        newadded.setAttribute('class', `listed listed${i}`);
        creaAddedProduct(newadded, 'div', e.product._id, 'id');
        creaAddedProduct(newadded, 'div', e.product.name, 'nom');
        creaAddedProduct(newadded, 'div', e.product.category, 'category');
        creaAddedProduct(newadded, 'div', e.demand, 'qty');
    });
}
function demandProduct(product, demand = Math.floor(Math.random() * (200 - 2 + 1)) + 2) {
    let prodIndex = product.index;
    let newQty = document.getElementsByClassName(`stocked${prodIndex}`);
    if (newQty[1].value != '') {
        demand = parseInt(newQty[1].value);
    }
    newQty[1].value = demand;
    loadStock([{ product, demand }]);
    return [{ product, demand }];
}
function clearAddProd() {
    let newProd = document.getElementsByClassName('addNewProduct');
    for (let index = 0; index < 3; index++) {
        newProd[0].children[index + 1].value = '';
    }
}
function hideShowAdd() {
    let newProd = document.getElementsByClassName('addNewProduct');
    let add = document.getElementsByClassName('add');
    if (newProd[0].classList[1] == 'hidden') {
        newProd[0].classList.remove('hidden');
        add[0].classList.add('hidden');
    }
    else {
        newProd[0].classList.add('hidden');
        add[0].classList.remove('hidden');
    }
}
function hideShowDelete() {
    let delBtn = document.getElementsByClassName('deleteButton');
    let delBtnArr = [].slice.call(delBtn);
    let del = document.getElementsByClassName('delete');
    if (del[0].classList[3] == 'hiddenAlt') {
        delBtnArr.forEach(e => {
            e.classList.add('hidden');
        });
        del[0].classList.remove('hiddenAlt');
    }
    else {
        delBtnArr.forEach(e => {
            e.classList.remove('hidden');
        });
        del[0].classList.add('hiddenAlt');
    }
}
function deleteProduct(e, a) {
    let i = a.indexOf(e);
    a.splice(i, 1);
    printProducts(a, 'stockList');
    hideShowDelete();
}
function orderMyArr() {
    orderProduct()
    printProducts(myArr, 'stockList');
}
function orderProduct() {//order asc
    myArr.sort(function (a, b) { return a.quantity - b.quantity });
}
function orderListProduct(arr) {//order desc
    arr.sort(function (b, a) { return a.demand - b.demand });
}
function buyProducts() {
    let buyBox = document.getElementsByClassName('buyProducts');
    buyBox[0].innerHTML = '';
    let prodSelection = document.createElement('div');
    prodSelection.classList.add('buyProduct');
    buyBox[0].appendChild(prodSelection);

    let select = document.createElement('select');
    select.classList.add('selProd');
    select.addEventListener('change', hideLabelWarning);
    fillProducts(select);
    prodSelection.appendChild(select);
    
    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.classList.add('qtyBuy');
    input.addEventListener('change', hideLabelWarning);
    prodSelection.appendChild(input);

    let buyButton = document.createElement('div');
    buyButton.classList.add('buyButton', 'btn', 'btn-addNew');
    buyButton.innerText = 'Añadir';
    buyButton.addEventListener('click', verificarCompra);
    prodSelection.appendChild(buyButton);

    let buyList = document.createElement('div');
    buyList.classList.add('buyList');
    prodSelection.appendChild(buyList);

    let buyListLabel = document.createElement('label');
    buyListLabel.classList.add('buyListLabel');
    buyListLabel.innerText = 'Cesta de productos';
    buyList.appendChild(buyListLabel);

    let buyListContent = document.createElement('div');
    buyListContent.classList.add('buyListContent');
    buyListContent.id = 'buyListContent';
    buyList.appendChild(buyListContent);
}
function fillProducts(select) {
    let option = document.createElement('option');
    option.value = 0;
    option.text = '-- elige un producto --';
    select.appendChild(option);
    myArr.forEach(e => {
        let option = document.createElement('option');
        option.value = e._id;
        option.text = e.name;
        select.appendChild(option);
    });
}
function verificarCompra(e) {
    myArr.forEach(el => {
        let idx = el._id.indexOf(e.currentTarget.parentElement.children[0].selectedOptions[0].value);
        let qty = e.currentTarget.parentElement.children[1].value;
        if ((idx != -1) && (qty > 0)) {
            if (el.quantity >= qty) {
                if (buyArr.length > 0) {
                    let included = false;
                    buyArr.forEach(ele => {
                        if (ele.product._id.indexOf(el._id) != -1) {
                            ele.demand = parseInt(ele.demand) + parseInt(qty);
                            included = true;
                        }
                    });
                    if (!included) addCart(el, qty);
                } else addCart(el, qty);
                el.quantity -= qty;
                orderProduct();
                printProducts(myArr, 'stockList');
                orderListProduct(buyArr);
                printListProducts(buyArr, 'buyListContent');
                controlStock();
            }
            else {
                let warning = document.getElementsByClassName('labelWarning');
                if (warning.length > 0) { }
                else {
                    let warning = document.createElement('label');
                    warning.innerText = `demanes massa...No hi ha prou a l'stock`;
                    warning.classList.add('warning','labelWarning');
                    e.currentTarget.parentElement.appendChild(warning);
                    let buyButton = document.getElementsByClassName('buyButton');
                    insertAfter(buyButton[0], warning);
                }
            }
        }
    })
}
function addCart(product, demand) {
    buyArr.push({ product, demand });
}
function verifyBuy(product, demand) {
    if (buyArr.indexOf(product._id) != -1) {
        buyArr.push({ product, demand });
    }
}
function insertAfter(e, i) {
    if (e.nextSibling) {
        e.parentNode.insertBefore(i, e.nextSibling);
    } else {
        e.parentNode.appendChild(i);
    }
}
function hideLabelWarning(){
    let label=document.getElementsByClassName('labelWarning');
    if (label.length>0) label[0].remove();
}
function controlStock(){
    if (filterControlStock().length>0){
    showControlStock();}
}
function showControlStock(){
    let listStock=document.getElementsByClassName('stockControl');
    listStock[0].innerHTML='';
    let label=document.createElement('label');
    label.innerText='Control de stock';
    listStock[0].appendChild(label);

    let list=document.createElement('div');
    list.classList.add('stockContent');
    listStock[0].appendChild(list);
    fillControlStock(list);
}
function filterControlStock(){
    let filter=myArr.filter(e=>{
        if (e.quantity<=10) return e;
    })    
    return filter;
}
function fillControlStock(father){
    let controlStockArr=filterControlStock();
    controlStockArr.forEach((e,i) => {
    let subfather=creaAddedProduct(father, 'div','', `controlStock controlStock${i}`);
    let qtyClass='';
    if (e.quantity<=5) qtyClass='alert'; 
    if (e.quantity==0) qtyClass='warning'; 
    creaAddedProduct(subfather, 'div', e._id, `id`);
    creaAddedProduct(subfather, 'div', e.name, `name ${qtyClass}`);
    creaAddedProduct(subfather, 'div', e.category, `category`);
    creaAddedProduct(subfather, 'div', e.quantity, `quantity ${qtyClass}`);
    });
}
document.addEventListener('onload', listStock());
