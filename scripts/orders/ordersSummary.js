import { addToCart } from '../../data/cart.js';
import { orders } from '../../data/orders.js';
import { getProduct, loadProductsFetch } from '../../data/products.js';
import { formatDate, isWeekend } from '../../utils/date.js';
import formatCurrency from '../../utils/money.js';

export async function renderOrdersSummary() {
  await loadProductsFetch();

  let ordersSummaryHTML = '';

  orders.forEach((order) => {
    ordersSummaryHTML += 
    `
      <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsListHTML(order)}
          </div>
        </div>
    `;
  });
  document.querySelector('.orders-grid').innerHTML = ordersSummaryHTML;
  
  document.querySelectorAll('.js-buy-again-btn').forEach(element => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      addToCart(productId, 1);
      window.location.href = 'checkout.html';
    })
  });
}

  function productsListHTML(order) {
    let productsListHTML = '';
      order.products.forEach(product => {
        const matchingProduct = getProduct(product.productId);

        productsListHTML += 
        `
          <div class="product-image-container">
            <img src="${matchingProduct.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${formatDate(isWeekend(product.estimatedDeliveryTime, order.orderTime))}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-again-btn"
            data-product-id="${matchingProduct.id}"
            ">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
              <button class="track-package-button button-secondary js-track-package-btn">
                Track package
              </button>
            </a>
          </div>
        `
      });
      return productsListHTML;
}


