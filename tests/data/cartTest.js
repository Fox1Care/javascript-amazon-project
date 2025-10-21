import { cart, addToCart, loadFromStorage, removeFromCart, updateDeliveryOption } from '../../data/cart.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage.__proto__, 'setItem');
  })

  it('adds an existing product to the cart', () => {
    
    spyOn(localStorage.__proto__, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 1,
        deliveryOptionId: '1',
      }]);
    });
    loadFromStorage();

    addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', `${JSON.stringify(cart)}`);
    expect(cart[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage.__proto__, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', `${JSON.stringify(cart)}`);
    expect(cart[0].productId).toEqual('3ebe75dc-64d2-4137-8860-1f5a963e534b');
    expect(cart[0].quantity).toEqual(1);
  });
});

describe('test suite: removeFromCart', () => {
  const productId = '3ebe75dc-64d2-4137-8860-1f5a963e534b';

  beforeEach(() => {
    spyOn(localStorage.__proto__, 'setItem');
    spyOn(localStorage.__proto__, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 1,
        deliveryOptionId: '1',
      }]);
    });
    loadFromStorage();
  });

  it('remove a productId that is in the cart', () => {
    removeFromCart(productId);

    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });

  it('doesn\'t do anything if productId isn\'t found', () => {
    removeFromCart('123');

    expect(cart[0].productId).toEqual(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
      {
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 1,
        deliveryOptionId: '1',
      }
    ]));
  });

});

describe('test suite: updateDeliveryOption', () => {
  const productId = '3ebe75dc-64d2-4137-8860-1f5a963e534b';
  beforeEach(() => {
    spyOn(localStorage.__proto__, 'setItem');
    spyOn(localStorage.__proto__, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 1,
        deliveryOptionId: '1',
      }]);
    });
    loadFromStorage();
  });

  it('update delivery option of a product in the cart', () => {
    updateDeliveryOption(productId, '3');
    expect(cart.length).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(cart[0].productId).toEqual(productId);
  });

  it('doesn\'t update delivery option if product/option isn\'t found', () => {
    updateDeliveryOption('none', '2');
    updateDeliveryOption(productId, '0');
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});