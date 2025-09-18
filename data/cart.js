export const cart = [];



export function addToCart(productId) {
  let matchingItem;
  const selectObject = document.querySelector(`.js-select-quantity-${productId}`);

  cart.forEach( (cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
      
    }
  })

  if (matchingItem) {
    matchingItem.quantity += Number(selectObject.value);
  } else {
      cart.push({
      productId: productId,
      quantity: Number(selectObject.value),
    });
  }
}