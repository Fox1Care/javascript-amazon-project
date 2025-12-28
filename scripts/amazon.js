import * as cartModule from "../data/cart.js";
import { products, loadProductsFetch } from "../data/products.js";
import { renderHeader } from "./amazon/header.js";

await Promise.all([
  loadProductsFetch(),
]);

renderHeader();
renderProductsGrid();

export function renderProductsGrid() {
  let productsHTML = '';
  let newProducts = [];

  const searchValue = new URLSearchParams(window.location.search).get('search');

  if (searchValue) {
    products.forEach((product) => {
      console.log(product);
      const productName = (product.name).toLowerCase();
      const productKeywords = product.keywords;
          if (productName.includes(searchValue.toLowerCase()) 
            || productKeywords.includes(searchValue)) {
            newProducts.push(product);        
        }
    });
  }
  else {
    newProducts = products;
  }

  newProducts.forEach(product => {
      productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-select-quantity-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button 
      button-primary js-add-to-cart"
      data-product-id='${product.id}'>
        Add to Cart
      </button>
    </div>
    `; 
    });

  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart').forEach( (btn) => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.productId;
      cartModule.addToCart(productId);
      cartModule.updateCartQuantity('js-cart-quantity');
    });
  });
} 