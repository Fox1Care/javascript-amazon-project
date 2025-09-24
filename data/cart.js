export let cart = JSON.parse(localStorage.getItem('cart'))

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  const selectObject = document.querySelector(`.js-select-quantity-${productId}`);

  cart.forEach( (cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
      
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(selectObject.value);
  } else {
      cart.push({
      productId,
      quantity: Number(selectObject.value),
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach( (cartItem) => {
    if (cartItem.productId != productId) 
      {
        newCart.push(cartItem);
      }
  });

cart = newCart;
console.log(cart);

saveToStorage();
}

export function editCartItemQuantity(productId, newQuantity) {
  cart.forEach( (cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = +newQuantity;
      }
  })
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach( (cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
}

export function updateCartQuantity(className, optionalText = '') {
  const cartQuantity = calculateCartQuantity();

  const element = document.querySelector(`.${className}`);

  if (element) {
    element.textContent = `${cartQuantity} ${optionalText}`
  }
}