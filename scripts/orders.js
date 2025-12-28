import { renderOrdersSummary } from './orders/ordersSummary.js';

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



