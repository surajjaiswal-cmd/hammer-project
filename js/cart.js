let bagCount = JSON.parse(localStorage.getItem("bagcount")) || [];
let bag = document.querySelector(".bag-count");
let cartPage = document.querySelector(".cart-page");
let cartPart = document.querySelector(".cart-part");
let cartPartBorder = document.querySelector(".cart-part-border");
let blankPart = document.querySelector(".blank-part");

// function to copy product full details from items.js by id
function getCartItems() {
  return bagCount.map((item) => {
    for (let i = 0; i < items.length; i++) {
      if (item.id == items[i].id) return items[i];
    }
  });
}

let cartItem = getCartItems();
// adding one more property(quantity) and value in every object
addQunatityToCartItem();
function addQunatityToCartItem() {
  cartItem.forEach((item1) => {
    bagCount.forEach((item2) => {
      if (item1.id === item2.id) {
        item1.quantity = item2.itemQuantity;
      }
    });
  });
}

// updading number of product on page bag icon
updateBagCount();
function updateBagCount() {
  if (bagCount.length > 0) {
    bag.style.display = "block";
    bag.innerHTML = bagCount.length;
  } else {
    bag.style.display = "none";
  }
}

// function to add product,s ids to local storage
function addToCart(itemId) {
  if (!bagCount.some((item) => item.id === itemId)) {
    bagCount.push({ id: itemId, itemQuantity: 1 });
    updateBagCount();
    localStorage.setItem("bagcount", JSON.stringify(bagCount));
    cartItem = getCartItems();
    addQunatityToCartItem();
    updateTotalPrice(cartItem);
  }
}

// function to open cart and close on click
cartOpenAndClose();

function cartOpenAndClose() {
  let opencart = document.querySelectorAll(".s2-buyitnow,.shoppingbag");
  opencart.forEach((btn) => {
    btn.addEventListener("click", openCart);
  });

  // for open cart
  function openCart() {
    let numberOfItem = document.querySelector(".number-of-item");
    numberOfItem.innerHTML = `Total Item In Your Cart : ${bagCount.length}`;
    cartPage.style.display = "flex";
    setTimeout(() => {
      cartPartBorder.classList.add("visible");
      cartPart.classList.add("visible");
      blankPart.classList.add("visible");
      cartPage.style.position = "fixed";
      document.body.style.overflow = "hidden";
    }, 10);
    // function to add product cart daynamically in cart
    showTotalItem();
    // function to update price in cart
    updateTotalPrice();
  }

  let closecart = document.querySelectorAll(".blank-part,.cart-close");
  closecart.forEach((btn) => {
    btn.addEventListener("click", closeCart);
  });

  // to close open cart
  function closeCart() {
    cartPartBorder.classList.remove("visible");
    cartPart.classList.remove("visible");
    blankPart.classList.remove("visible");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      cartPage.style.position = "unset";
      cartPage.style.display = "none";
    }, 200);
  }
}

// adding product daynamically on cart
function showTotalItem() {
  let cartItemPart = document.querySelector(".carts-items-part");
  cartItemPart.innerHTML = "";
  cartItem.forEach((item) => {
    cartItemPart.innerHTML += `
    <div class="row cart-item m-3" id="${item.id}">
      <div class="col-4"><img class="cart-item-img" src="${item.image}" alt="cart img">
      </div>
      <div class="col-8 cart-item-details ">
          <p class="name m-0 ">${item.name}</p>
          <p class="extrainfo  ">${item.extrainfo}</p>
          <div class="mt-3 price-part">
              <div class="price">Rs. ${item.price}</div>
              <div class=" border inc-dec-part">
                  <button class="add-remove px-2 border-0 increment" >+</button>
                  <span class="add-remove quantity ">${item.quantity}</span>
                  <button class="add-remove px-2 border-0 decrement">-</button>
              </div>
          </div>
      </div>
      <hr class="my-4">
    </div>
    `;
  });
  // for total price and number of product quantity
  priceAndQuantity();
}

function priceAndQuantity() {
  let increment = document.querySelectorAll(".increment");
  let decrement = document.querySelectorAll(".decrement");
  increment.forEach((btn) => {
    btn.addEventListener("click", () => {
      let quantity = btn.nextElementSibling;
      let currentQuantity = parseInt(quantity.innerText);
      let currentCardId = btn.closest(".cart-item").id;
      let newQuantity = currentQuantity + 1;
      quantity.innerText = newQuantity;
      updateCart(currentCardId, newQuantity);
    });
  });

  decrement.forEach((btn) => {
    btn.addEventListener("click", () => {
      let quantity = btn.previousElementSibling;
      let currentQuantity = parseInt(quantity.innerText);
      let currentCardId = btn.closest(".cart-item").id;
      let newQuantity = currentQuantity - 1;
      if (newQuantity >= 0) {
        quantity.innerText = newQuantity;
        updateCart(currentCardId, newQuantity);
        if (newQuantity < 1) {
          removeItem(currentCardId);
          btn.closest(".cart-item").remove();
        }
      }
    });
  });

  function updateCart(cardId, newQuantity) {
    let cardIndex = bagCount.findIndex((item) => item.id === cardId);
    bagCount[cardIndex].itemQuantity = newQuantity;
    localStorage.setItem("bagcount", JSON.stringify(bagCount));

    addQunatityToCartItem();
    updateTotalPrice();
  }

  function removeItem(cardId) {
    bagCount = bagCount.filter((item) => item.id !== cardId);
    localStorage.setItem("bagcount", JSON.stringify(bagCount));
    cartItem = cartItem.filter((item) => item.id !== cardId);
    updateBagCount();
    let numberOfItem = document.querySelector(".number-of-item");
    numberOfItem.innerHTML = `Total Item In Your Cart : ${bagCount.length}`;
  }
}

// update prise when you add product in cart and when you incress of decerese quantity in cart
function updateTotalPrice() {
  let totalPriceEle = document.querySelector(".total-price");
  totalPriceEle.innerText = "";
  let totalprice = 0;
  cartItem.forEach((item1) => {
    let totalQuantity = bagCount.find((item2) => item2.id == item1.id);
    if (totalQuantity) {
      totalprice += parseInt(item1.price * totalQuantity.itemQuantity);
    }
  });
  totalPriceEle.innerText = `Rs. ${totalprice}.00`;
}
