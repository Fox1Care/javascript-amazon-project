import { updateCartQuantity } from '../data/cart.js';
import { renderTrackingPage } from '../scripts/tracking/trackingPage.js'

updateCartQuantity('js-cart-quantity');

async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
  ]);

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  renderTrackingPage();
}
loadPage();



