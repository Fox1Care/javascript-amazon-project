export let cart = JSON.parse(localStorage.getItem('cart'))

if (cart.length === 0) {
  cart = 
  [
    {
      productId:
      'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1',
    },
    {
      productId:
      '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2',
    },
  ]
}

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