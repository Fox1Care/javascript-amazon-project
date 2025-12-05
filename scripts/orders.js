import { updateCartQuantity } from '../data/cart.js';
import { renderOrdersSummary } from './orders/ordersSummary.js';

updateCartQuantity('js-cart-quantity');

async function loadPage() {
  try {
    // throw 'error1';
    await Promise.all([
      loadProductsFetch(),
  ]);

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  renderOrdersSummary();
}
loadPage();



