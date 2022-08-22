let carrito = []
const addToCardButtons = document.querySelectorAll(`.cardProduct__btn`);
const productoCardContainer = document.querySelector(`.container-carrito`)
//FOR EACH
addToCardButtons.forEach(addToCardButtons => {
    addToCardButtons.addEventListener(`click`, addToCardclicked);
})

//LOCAL STORAGE
function carritoHTML() {
    localStorage.setItem(`carrito`, JSON.stringify(carrito));

}


document.addEventListener('DOMContentLoaded', () => {
    let carritoLocal = localStorage.getItem('carrito')
    if (carritoLocal !== null) {
        let carritoArray = JSON.parse(carritoLocal)
        carrito = carritoArray
        carritoArray.forEach(producto => {
            const productoCardRow = document.createElement(`div`);
            productoCardRow.innerHTML = producto
            productoCardContainer.append(productoCardRow)
            productoCardRow.querySelector(`.buttonDelete`)
                .addEventListener(`click`, removeShoppingCartItem);

            productoCardRow.querySelector(`.shoppingCartItemQuantity`)
                .addEventListener(`change`, quantityChanged);
        })
        updateShoppingCartTotal();
    }
});


function addToCardclicked(event) {

    event.preventDefault()
    const button = event.target;
    const item = button.closest(`.cardProducto`)
    const itemProducto = item.querySelector(`.cardProduct__description`).textContent;
    const itemPrecio = item.querySelector(`.cardPrecio`).textContent;
    const itemImage = item.querySelector(`.cardProduct__image`).src;
    
    
    addItemCardProduct(itemProducto, itemPrecio, itemImage);
    carritoHTML()
}

function checkCarrito(itemProducto) {
    
    console.log(carrito.includes(itemProducto))
    let control = carrito.filter(producto => producto.includes(itemProducto))
    console.log(control)
    if (control.length > 0) {
        return false
    } else { return true }

}
//FUNCION PARA AGREGAR PRODUCTOS AL CARRITO
function addItemCardProduct(itemProducto, itemPrecio, itemImage) {
    let response = checkCarrito(itemProducto)
    console.log(response)
    
    if (response) {
        const elementsTitle = productoCardContainer.getElementsByClassName(
            `shoppingCartItemTitle`);
        for (let i = 0; i < elementsTitle.length; i++) {
            if (elementsTitle[i].innerText === itemProducto) {
                let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector(
                    `.shoppingCartItemQuantity`);
                elementQuantity.value++;
                $(`.toast`).toast(`show`);
                updateShoppingCartTotal();
                return;
            }
        }
        //SE CREA EL DIV DEL CARRITO
        const productoCardRow = document.createElement(`div`);
        const prodcutoContent = `
        <div class="row shoppingCartItem">
        <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <img src=${itemImage} class="shopping-cart-image">
                  <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemProducto}</h6>
              </div>
          </div>
          <div class="col-2">
          <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="item-price mb-0 shoppingCartItemPrice">${itemPrecio}</p>
              </div>
          </div>
          <div class="col-4">
          <div
          class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
          <input class="shopping-cart-quantity-input shoppingCartItemQuantity" id="${itemProducto}"type="number"
                      value="1" >
                  <button class="btn btn-danger buttonDelete" id="${itemProducto}"="button">X</button>
                  </div>
                  </div>
                  </div>`;
                  
                  productoCardRow.innerHTML = prodcutoContent
                  productoCardContainer.append(productoCardRow)
                  carrito.push(prodcutoContent)
                  productoCardRow.querySelector(`.buttonDelete`)
                  .addEventListener(`click`, removeShoppingCartItem);
                  
                  productoCardRow.querySelector(`.shoppingCartItemQuantity`)
                  .addEventListener(`change`, quantityChanged);
                  
                  updateShoppingCartTotal();
                //USAMOS SWEET ALERT
                } else { swal("Este producto ya se encuentra en el carrito");}
                
            }
            
//CALCULAR EL TOTAL CARRITO
function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector(`.shoppingCartTotal`);
    
    const shoppingCartItems = document.querySelectorAll(`.shoppingCartItem`);
    
    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            `.shoppingCartItemPrice`
            );
            const shoppingCartItemPrice = Number(
                shoppingCartItemPriceElement.textContent.replace(`$`, "")
                );
                const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
                    `.shoppingCartItemQuantity`
                    );
                    const shoppingCartItemQuantity = Number(
                        shoppingCartItemQuantityElement.value
                        );
                       return total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
                    });
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}
//FUNCION PARA REMOVER PRODUCTOS DEL CARRITO
function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    carrito = carrito.filter(productos => !productos.includes(event.target.id))
    localStorage.setItem('carrito', JSON.stringify(carrito))
    buttonClicked.closest(`.shoppingCartItem`).remove();
    updateShoppingCartTotal();
}

function quantityChanged(event) {
    
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    
    productItem = carrito.filter(productos => productos.includes(event.target.id))[0]
    let data = productItem.split("value=")[1].split('"')[1]
    
    
    let nuevoProd = productItem.replace(`value="${data}"`, `value="${input.value}"`)
    carrito = carrito.filter((productos,index) =>!productos.includes(event.target.id))
    carrito.push(nuevoProd)
    //LOCAL STORAGE 
    localStorage.setItem('carrito',JSON.stringify(carrito))
    updateShoppingCartTotal();
    
}

//FETCH 
async function getDataFromJSON (){
  await fetch('./data.json')
  .then((response) => response.json())
  .then((data) => console.log(data))}
   
  getDataFromJSON()

    
let btnComprar = document.getElementById("btnComprar")

btnComprar.addEventListener("click", function(){
      swal({
        title: "Tu compra fue exitosa",
        text: "Gracias por tu compra!",
        icon: "success",
      });
    localStorage.removeItem("carrito");
    carrito = [];
    const shoppingCartItems = document.querySelectorAll(`.shoppingCartItem`);
    let borrar =document.querySelectorAll(".shoppingCartItem");
    console.log (borrar)
    for ( let i= 0; 1< borrar.length; i++) {
        borrar[i].remove()
    }
    updateShoppingCartTotal();
})

  

