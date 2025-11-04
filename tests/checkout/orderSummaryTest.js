import { loadFromStorage, cart } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadProducts } from "../../data/products.js";
describe('test suite: renderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productName1 = 'Black and Gray Athletic Cotton Socks - 6 Pairs';
  const productName2 = 'Intermediate Size Basketball';

  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  })

  beforeEach(() => {
    spyOn(localStorage.__proto__, 'setItem');

    document.querySelector('.js-test-container')
      .innerHTML = `
        <div class="js-checkout-header"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
      `;

    spyOn(localStorage.__proto__, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
        }]);
    });
    loadFromStorage();
    renderOrderSummary();
  });

  it('displays the cart', () => {

    expect(
      document.querySelectorAll('.js-cart-item-container')
        .length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-name[data-product-id="${productId1}"]`)
        .innerText
    ).toEqual(`${productName1}`);
    expect(
      document.querySelector(`.js-product-name[data-product-id="${productId2}"]`)
        .innerText
    ).toEqual(`${productName2}`);

    expect(
      document.querySelector(`.js-product-price[data-product-id="${productId1}"]`)
        .innerText
    ).toEqual('$10.90');
    expect(
      document.querySelector(`.js-product-price[data-product-id="${productId2}"]`)
        .innerText
    ).toEqual('$20.95');

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`)
        .textContent 
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`)
        .textContent
    ).toContain('Quantity: 1');
  });

  it('item is getting removed from cart', () => {
    document.querySelector(
      `.js-delete-link[data-product-id="${productId1}"]`
    ).click();

    expect(
      document.querySelectorAll('.js-cart-item-container')
        .length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toBeNull();

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toBeNull();

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    expect(
      document.querySelector(`.js-product-name[data-product-id="${productId2}"]`)
        .innerText
    ).toEqual(`${productName2}`);

    expect(
      document.querySelector(`.js-product-price[data-product-id="${productId2}"]`)
        .innerText
    ).toEqual('$20.95');

  });

  it('changes delivery option', () => {
    const product = document.querySelector(`.js-cart-item-container-${productId1}`);
    const deliveryOptionId = 
      product.querySelector(`.js-delivery-option[data-delivery-option-id="3"]`);
    const input = deliveryOptionId.querySelector(`.js-delivery-option-input`)

    input.click();

    expect(input.checked).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(cart[0].productId).toEqual(productId1);
    expect(
      document.querySelector('.js-shipping-summary-total').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$63.50')

  })

  afterEach(() => {
    document.querySelector('.js-test-container')
      .innerHTML = '';
  })
});