import { cart } from "../../data/cart.js"

export default function renderCheckoutHeader() {
  
  let totalCartItemsQuantity = 0;
  cart.forEach((cartItem) => {
    totalCartItemsQuantity += cartItem.quantity;
  });

  const checkoutHTML = 
  `
    <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="amazon.html">
          <img class="amazon-logo" src="images/amazon-logo.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
        </a>
      </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-return-link"
            href="amazon.html">${totalCartItemsQuantity}</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
    </div>
  `

  document.querySelector('.checkout-header')
    .innerHTML = checkoutHTML;
}