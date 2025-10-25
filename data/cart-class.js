class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  
  #loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

      // comment assigment if testing needed to be done.
      if (!this.cartItems || this.cartItems.length === 0) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
        }];
      }
    };

    saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };


    addToCart(productId) {
      /*add quantity parameter to the method 
        if testing needed to be done(or just insert value directly)
      */
      let matchingItem;
      const selectObject = document.querySelector(`.js-select-quantity-${productId}`);

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (!matchingItem) {
        matchingItem.quantity += 1;
      } else {
          this.cartItems.push({
          productId,
          quantity: 1,
          deliveryOptionId: '1',
        });
      }
      this.saveToStorage();
    };

    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach( (cartItem) => {
        if (cartItem.productId != productId) 
          {
            newCart.push(cartItem);
          }
      });
    this.cartItems = newCart;

    this.saveToStorage();
    };

    updateDeliveryOption(productId, deliveryOptionId) {
      if (deliveryOptionId !== '1' && deliveryOptionId !== '2' && deliveryOptionId !== '3') {
        return;
      }

      let matchingItem = null;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (!matchingItem) {
        return;
      }

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    };

    editCartItemQuantity(productId, newQuantity) {
      this.cartItems.forEach( (cartItem) => {
          if (cartItem.productId === productId) {
            cartItem.quantity = +newQuantity;
          }
      })
      this.saveToStorage();
    };

    calculateCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach( (cartItem) => {
        cartQuantity += cartItem.quantity;
      })
      return cartQuantity;
    };

    updateCartQuantity(className, optionalText = '') {
      const cartQuantity = calculateCartQuantity();

      const element = document.querySelector(`.${className}`);

      if (element) {
        element.textContent = `${cartQuantity} ${optionalText}`
      }
    };
};

const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
