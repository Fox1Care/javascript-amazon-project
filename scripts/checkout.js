import {cart, removeFromCart, updateCartQuantity, editCartItemQuantity, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import formatCurrency from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
hello();

const today = dayjs();
const deliveryDate = today.add(7, 'day');
console.log(deliveryDate.format('dddd, MMMM D'));

let cartSummaryHTML = '';

cart.forEach( (cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach( (product) => {
    if (product.id === productId)
      matchingProduct = product;
  })

  const deliveryOptionId = cartItem.deliveryOptionId;

  const dateString = updateDateDelivery(deliveryOptionId);

  cartSummaryHTML +=
  `
    <div class="cart-item-container js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label"
              data-product-id="${productId}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link"
            data-product-id="${productId}">
              Update
            </span>
            <input class="quantity-input js-quantity-input"
            data-product-id="${productId}"></input>
            <span class="save-quantity-link link-primary js-save-link"
            data-product-id="${productId}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id="${productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(productId, cartItem)}
        </div>
      </div>
    </div>
  `
});

function deliveryOptionsHTML(productId, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0 
    ? 'FREE' 
    : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html +=
    `
            <div class="delivery-option js-delivery-option"
            data-product-id="${productId}"
            data-delivery-option-id="${deliveryOption.id}">
              <input type="radio" 
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${productId}">
              <div>
                <div class="delivery-option-date">
                  ${dateString} 
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
            </div>
    `
  });
  return html;
}

function updateDateDelivery(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  })

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

updateCartQuantity('js-return-link', 'items');

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      itemContainer.remove();
      updateCartQuantity('js-return-link', 'items');
  })
});

document.querySelectorAll('.js-update-link')
  .forEach ((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      toggleEditing(productId, true);
    })
  })
  

document.querySelectorAll('.js-save-link').forEach((link) => {
  const productId = link.dataset.productId;
  const inputElement = document.querySelector(`.js-quantity-input[data-product-id="${productId}"]`);

  inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      link.click();
    }
  });

  link.addEventListener('click', () => {
    const newQuantity = +inputElement.value;

    if (Number.isNaN(newQuantity) || newQuantity <= 0 || newQuantity >= 1000) 
      return;

    editCartItemQuantity(productId, newQuantity);

    document.querySelector(`.quantity-label[data-product-id="${productId}"]`)
      .textContent = `${inputElement.value}`;
    inputElement.value = '';

    toggleEditing(productId, false);
    updateCartQuantity('js-return-link', 'items');
  });
});

document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
    })
  })

function toggleEditing(productId, shouldEdit) {
  const cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
  cartItem.classList.toggle('is-editing-quantity', shouldEdit);
}
  




