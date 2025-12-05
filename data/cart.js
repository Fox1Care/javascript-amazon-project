export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  // comment assigment if testing needed to be done.
  if (!cart || cart.length === 0) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
    }];
  }
}

export function addToCart(productId, quantity) {

  let matchingItem;
  const selectObject = document.querySelector(`.js-select-quantity-${productId}`) || '';

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const finalQuantity = +selectObject.value || quantity;

    if (matchingItem) {
      matchingItem.quantity += finalQuantity;
    } else {
      cart.push({
      productId,
      quantity: finalQuantity,
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

  if (deliveryOptionId !== '1' && deliveryOptionId !== '2' && deliveryOptionId !== '3') {
    return;
  }

  let matchingItem = null;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (!matchingItem) {
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
  console.log(xhr.response);
  fun();
});

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartNew() {
  
}

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const value = await response.text();
  console.log(value);
}