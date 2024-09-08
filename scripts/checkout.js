import { cart, deleteFromCart, getCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

function displayCartItems() {
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
    });

    console.log(matchingProduct);

    const cartItemHtml = `
              <div class="cart-item-container">
                  <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                  </div>
      
                  <div class="cart-item-details-grid">
                    <img class="product-image"
                      src="${matchingProduct.image}">
      
                    <div class="cart-item-details">
                      <div class="product-name">
                        ${matchingProduct.name}
                      </div>
                      <div class="product-price">
                        $${(matchingProduct.priceCents / 100).toFixed(2)}
                      </div>
                      <div class="product-quantity">
                        <span>
                          Quantity: <span class="quantity-label">${
                            cartItem.quantity
                          }</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                          Update
                        </span>
                        <span class="delete-quantity-link link-primary" data-product-id = "${
                          matchingProduct.id
                        }">
                          Delete
                        </span>
                      </div>
                    </div>
      
                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      <div class="delivery-option">
                        <input type="radio" checked
                          class="delivery-option-input"
                          name="delivery-option-1-${matchingProduct.id}">
                        <div>
                          <div class="delivery-option-date">
                            Tuesday, June 21
                          </div>
                          <div class="delivery-option-price">
                            FREE Shipping
                          </div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input type="radio"
                          class="delivery-option-input"
                          name="delivery-option-1-${matchingProduct.id}">
                        <div>
                          <div class="delivery-option-date">
                            Wednesday, June 15
                          </div>
                          <div class="delivery-option-price">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input type="radio"
                          class="delivery-option-input"
                          name="delivery-option-1-${matchingProduct.id}">
                        <div>
                          <div class="delivery-option-date">
                            Monday, June 13
                          </div>
                          <div class="delivery-option-price">
                            $9.99 - Shipping
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          `;

    document.querySelector(".order-summary").innerHTML += cartItemHtml;
  });
}

displayCartItems ();
attachDeleteListeners();

function attachDeleteListeners() {
    document.querySelectorAll(".delete-quantity-link").forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;
  
        deleteFromCart(cart, productId);
  
        localStorage.setItem("cart", JSON.stringify(cart));
  
        document.querySelector(".order-summary").innerHTML = ""; // Clear existing items before re-rendering
        displayCartItems(); // Re-render the cart
      });
    });
  }

function removeObjectById(array, id) {
  const index = array.findIndex((obj) => obj.productId === id); // Find the index of the object with the given id
  if (index !== -1) {
    array.splice(index, 1); // Remove the object at the found index
  }
}

const totalItems = getCartQuantity(cart);
if (totalItems > 1)
{
    document.querySelector('.return-to-home-link').innerHTML = `${totalItems} items`;
}
else if (totalItems === 1)
{
    document.querySelector('.return-to-home-link').innerHTML = `${totalItems} item`;
}
