import { cart, clearCart } from "../data/cart.js";
import { products } from "../data/products.js";

export let orders = JSON.parse(localStorage.getItem('orders')) || [];

document.addEventListener('DOMContentLoaded', function() {
    displayOrders();
});

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
    console.log("Order added:", order);
    console.log("Orders saved to localStorage:", JSON.parse(localStorage.getItem('orders')));
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function clearOrders() {
    orders = [];  // Clear the array
    localStorage.removeItem('orders');  // Clear localStorage
}

export function displayOrders() {
    const ordersGrids = document.querySelector('.orders-grid');
    if (!ordersGrids) {
        // console.error("orders-grid element not found.");
        return;
    } else {
        // console.log("orders-grid element found:", ordersGrids);
    }

    if (!orders || orders.length === 0) {
        console.log("No orders found.");
        return;
    }

    const ordersGrid = document.querySelector(".orders-grid");

    orders.forEach(order => {
        let order_price = (order.totalCostCents / 100).toFixed(2);
        // let order_date = new Date(order.orderTime).toLocaleDateString();
        let order_date = getOrderDate(order);

        let orderContainerHtml = `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order_date}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${order_price}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
        </div>`;

        ordersGrid.innerHTML += orderContainerHtml;

        order.products.forEach(productOrdered => {
            const matchingProduct = products.find(product => product.id === productOrdered.productId);
            const productArrival = getDateFromISO(productOrdered.estimatedDeliveryTime);
            if (matchingProduct) {
                let productHtml = `
                <div class="order-details-grid">
                  <div class="product-image-container">
                    <img src="${matchingProduct.image}">
                  </div>
                  <div class="product-details">
                    <div class="product-name">${matchingProduct.name}</div>
                    <div class="product-delivery-date">Arriving on: ${productArrival}</div>
                    <div class="product-quantity">Quantity: ${productOrdered.quantity}</div>
                    <button class="buy-again-button button-primary">
                      <img class="buy-again-icon" src="images/icons/buy-again.png">
                      <span class="buy-again-message">Buy it again</span>
                    </button>
                  </div>
                  <div class="product-actions">
                    
                      <button class="track-package-button button-secondary" data-product-id="${productOrdered.productId}", data-product-name = " ${matchingProduct.name}", data-product-arrival = "${productArrival}" data-product-quantity = "${productOrdered.quantity}">Track package</button>
                    
                  </div>
                </div>`;

                ordersGrid.innerHTML += productHtml;
            }
        });
    });

    saveToStorage();
    clearCart();
    document.querySelector(".cart-quantity").innerHTML = 0;

    document.querySelectorAll('.track-package-button').forEach(button => {
        button.addEventListener('click', function(event) {
            const productId = button.dataset.productId;
            const productName = button.dataset.productName;
            const productArrival = button.dataset.productArrival;
            const productQuantity = button.dataset.productQuantity;
            
            localStorage.setItem('productId', productId);
            localStorage.setItem('productArrival', productArrival);
            localStorage.setItem('productQuantity', productQuantity);
            localStorage.setItem('productName', productName);

            window.location.href = 'tracking.html';
        });
    });
}

function getOrderDate(order) {
    const orderDate = new Date(order.orderTime);
    const options = { month: 'long', day: 'numeric' };
    return orderDate.toLocaleDateString('en-US', options);
}

function getDateFromISO(isoDateString) {
    const date = new Date(isoDateString);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}