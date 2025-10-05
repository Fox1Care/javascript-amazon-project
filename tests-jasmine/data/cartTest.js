import { cart, addToCart, loadFromStorage } from '../../data/cart.js';

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage.__proto__, 'setItem');
    spyOn(localStorage.__proto__, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 1,
        deliveryOptionId: '1',
      }]);
    });
    console.log(localStorage.getItem('cart'));
    loadFromStorage();

    addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
    expect(cart[0].quantity).toEqual(2);
  });


  it('adds a new product to the cart', () => {
    spyOn(localStorage.__proto__, 'setItem');
    spyOn(localStorage.__proto__, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
    expect(cart[0].quantity).toEqual(1);
  });
});