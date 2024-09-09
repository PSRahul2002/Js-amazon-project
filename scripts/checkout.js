import { cart, deleteFromCart, getCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "./deliveryOptions.js";

// Initialize the freeDelivery and paidDelivery dates
const today = dayjs();
const freeDelivery = today.add(7, 'day').format('dddd, MMMM D');

function displayCartItems() {
  document.querySelector(".order-summary").innerHTML = ""; // Clear existing items

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = products.find(product => product.id === productId);

    const cartItemHtml = `
      <div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: ${freeDelivery}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;

    document.querySelector(".order-summary").innerHTML += cartItemHtml;
  });

  attachDeleteListeners(); // Attach the delete listeners after rendering the items
}

function attachDeleteListeners() {
  document.querySelectorAll(".delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      deleteFromCart(cart, productId);

      localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage

      displayCartItems(); // Re-render the cart after deletion
    });
  });
}

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = ``;

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? "FREE" : `${(deliveryOption.priceCents) / 100} - `;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option">
        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-1-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>`;
  });

  return html;
}

displayCartItems(); // Initial rendering of cart items

// Update total items in cart display
const totalItemsInCart = getCartQuantity(cart);
const returnToHomeLink = document.querySelector('.return-to-home-link');
returnToHomeLink.innerHTML = totalItemsInCart > 1 ? `${totalItemsInCart} items` : `${totalItemsInCart} item`;

function removeObjectById(array, id) {
  const index = array.findIndex((obj) => obj.productId === id); // Find the index of the object with the given id
  if (index !== -1) {
    array.splice(index, 1); // Remove the object at the found index
  }
}