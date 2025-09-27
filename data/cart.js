export let cart = JSON.parse(localStorage.getItem('cart'))

if (!cart || cart.length === 0) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '2',
  }]
}

export function addToCart(productId) {
  let matchingItem;
  const selectObject = document.querySelector(`.js-select-quantity-${productId}`);

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += +selectObject.value;
  } else {
      cart.push({
      productId,
      quantity: +selectObject.value,
      deliveryOptionId: '1',
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

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}