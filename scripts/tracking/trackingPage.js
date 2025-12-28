import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getOrder } from "../../data/orders.js";
import { loadProductsFetch, getProduct } from '../../data/products.js';
import { formatDate, isWeekend } from '../../utils/date.js'
import { renderHeader } from '../amazon/header.js';

export async function renderTrackingPage() {
  await loadProductsFetch();
  renderHeader();
  
  let trackingHTML;

  const orderId = new URLSearchParams(window.location.search).get('orderId');
  const productId = new URLSearchParams(window.location.search).get('productId');
  const matchingOrder = getOrder(orderId);
  const matchingProduct = getProduct(productId);
  
  let matchingOrderItem;

  matchingOrder.products.forEach((product) => {
      if (product.productId === productId) {
        matchingOrderItem = product;
      }
    });
      
      trackingHTML =
        `
          <div class="delivery-date">
            ${formatDate(isWeekend(matchingOrderItem.estimatedDeliveryTime, matchingOrder.orderTime))}
          </div>

          <div class="product-info">
            ${matchingProduct.name}
          </div>

          <div class="product-info">
            Quantity: ${matchingOrderItem.quantity}
          </div>

          <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
        `
  
  const currentTime = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime)
  const deliveryTime = dayjs(isWeekend(matchingOrderItem.estimatedDeliveryTime, matchingOrder.orderTime));

  const progressDelivery = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;
  
  document.querySelector('.order-tracking').innerHTML += trackingHTML;

  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = `${progressDelivery}%`;
  
}