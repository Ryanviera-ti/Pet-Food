const c = (e) => document.querySelector(e);
const cl = (el) => document.querySelectorAll(el);
let cart = 1;
let modalKey = 0;
let modalInfo = [];

productsJson.map((item, index) => {
  let productItem = c(".store-products .products-card").cloneNode(true);
  productItem.setAttribute("data-key", index);
  productItem.querySelector(".products-image img").src = item.img;
  productItem.querySelector(".products-price").innerHTML = item.price;
  productItem.querySelector(".products-brand").innerHTML = item.brand;
  productItem.querySelector(".products-name").innerHTML = item.name;
  productItem.querySelector(".link").addEventListener("click", (e) => {
    e.preventDefault();

    let key = e.target.closest(".products-card").getAttribute("data-key");
    cart = 1;
    modalKey = key;

    c(".productsBig img").src = productsJson[key].img;
    c(".productsInfo h1").innerHTML = productsJson[key].name;
    c(".productsInfo p").innerHTML = item.description;
    c(".productsInfo--actualPrice").innerHTML = productsJson[key].price.toFixed(2);
    c(".productsInfo--size.selected").classList.remove("selected");
    cl(".productsInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add("selected");
      }
      size.querySelector("p").innerHTML = productsJson[key].sizes[sizeIndex];
    });
    c(".productsInfo--qt").innerHTML = cart;
    c(".productsWindowArea").style.opacity = 0;
    c(".productsWindowArea").style.display = "flex";
    setTimeout(() => {
      c(".productsWindowArea").style.opacity = 1;
    }, 300);
  });
  c(".products-area").append(productItem);
});

c(".productsInfo--qtmenos").addEventListener("click", () => {
  if (cart > 1) {
    cart--;
    c(".productsInfo--qt").innerHTML = cart;
  }
});
c(".productsInfo--qtmais").addEventListener("click", () => {
  cart++;
  c(".productsInfo--qt").innerHTML = cart;
});

c(".productsInfo--cancelButton").addEventListener("click", closeModal);

function closeModal() {
  c(".productsWindowArea").style.opacity = 0;
  setTimeout(() => {
    c(".productsWindowArea").style.display = "none";
  }, 500);
}
cl(".productsInfo--size").forEach((item) => {
  item.addEventListener("click", () => {
    c(".productsInfo--size.selected").classList.remove("selected");
    item.classList.add("selected");
  });
});

c(".productsInfo--addButton").addEventListener("click", () => {
  let size = parseInt(c(".productsInfo--size.selected").getAttribute("data-key"));

  let indentifier = `${productsJson[modalKey].id} - ${size}`;

  let key = modalInfo.findIndex((item) => item.indentifier == indentifier);
  if (key > -1) {
    modalInfo[key].qt += cart;
  } else {
    modalInfo.push({
      indentifier,
      id: productsJson[modalKey].id,
      size,
      qt: cart,
    });
    
  }
  updateCart();
  closeModal();
});

function updateCart() {
  c(".cart-modal").classList.add("closed");
let total = 0;
let freightFree = 99;
  if (modalInfo.length > 0) {
    c(".cart-modal").classList.remove("closed");
    c(".cart-product-area").innerHTML = "";

    for (const info of modalInfo) {
      const byId = (item) => item.id === info.id;
      const productItem = productsJson.find(byId);
      total += productItem.price * info.qt

     
      let cartProduct = c("#template-cart").content.cloneNode(true);

      cartProduct.querySelector(".cart-image").src = productItem.img;
      cartProduct.querySelector(".products-cart--brand").innerHTML =
        productItem.brand;
      cartProduct.querySelector(".products-cart--name").innerHTML =
        productItem.name;
      cartProduct.querySelector(".products-cart--price").innerHTML =
        productItem.price;
      cartProduct.querySelector('.cart--qt').innerHTML = info.qt;

      cartProduct.querySelector(".cart--qtmenos").addEventListener("click", () => {
     if(info.qt > 1){
      info.qt--;
     }else{
       modalInfo.splice(info, 1)
     }
     updateCart()
      });
      cartProduct.querySelector(".cart--qtmais").addEventListener("click", () => {
      info.qt++;
        updateCart();
     
      });
      freightFree = freightFree - total
       c('.cart-info--price').innerHTML = `R$ ${total.toFixed(2)}`
       
      let freight= c('.cart-info--freight')
      if(total < 100){
        freight.innerHTML = `Faltam R$ ${freightFree.toFixed(2)} para receber frete grátis`
      }else{
        freight.innerHTML = `Parabéns! Frete grátis aplicado`
      }
      c(".cart-product-area").appendChild(cartProduct)
      
    }
  }
}

c('.cart-container--area i').addEventListener('click', (e) => {
e.preventDefault()
  let cartArea = c('.cart-modal');

  if(cartArea.classList.contains('closed')) {
      cartArea.classList.remove('closed');
  } else {
      cartArea.classList.add('closed');
  }
  
});


c('.menuImg-mobile button').addEventListener('click', ()=>{
  let menuMobile = c('.menuMobile')
  if(menuMobile.classList.contains('closed')) {
    menuMobile.classList.remove('closed');
} else {
    menuMobile.classList.add('closed');
}
})