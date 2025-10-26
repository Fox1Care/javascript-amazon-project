import { cart, removeFromCart, editCartItemQuantity, updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import formatCurrency from '../../utils/money.js';
import { deliveryOptions, calculateDeliveryDate, getDeliveryOption } from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';
import renderCheckoutHeader from './checkoutHeader.js';

export function renderOrderSummary() {

let cartSummaryHTML = '';
cart.forEach( (cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);

  const deliveryOptionId = cartItem.deliveryOptionId;

  const dateString = calculateDeliveryDate(deliveryOptionId);

  cartSummaryHTML +=
  `
    <div class="cart-item-container 
    js-cart-item-container
    js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name 
          js-product-name"
          data-product-id="${productId}">
            ${matchingProduct.name}
          </div>
          <div class="product-price
          js-product-price"
          data-product-id="${productId}">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity 
          js-product-quantity-${productId}">
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
    const dateString = calculateDeliveryDate(deliveryOption.id);

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
          class="delivery-option-input
          js-delivery-option-input"
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

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
  })
});

document.querySelectorAll('.js-update-link')
  .forEach ((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      toggleEditing(productId, true);
    })
  });
  

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

    inputElement.value = '';

    toggleEditing(productId, false);

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});

document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  });

function toggleEditing(productId, shouldEdit) {
  const cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
  cartItem.classList.toggle('is-editing-quantity', shouldEdit);
}};
