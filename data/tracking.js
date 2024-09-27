import { products } from "../data/products.js";
import { setCartQuantity} from "../data/cart.js";

setCartQuantity();

document.addEventListener('DOMContentLoaded', function() {
    const productArrival = localStorage.getItem('productArrival');
    const productName = localStorage.getItem('productName');
    const productQuantity = localStorage.getItem('productQuantity');
    const productId = localStorage.getItem('productId');

    let matchingProduct = products.find(product => product.id === productId);
    const productImage = matchingProduct.image

    // Check if the data exists before inserting HTML
    if (productArrival && productName && productQuantity && productImage) {
        trackingInfo(productArrival, productName, productQuantity, productImage);
    }
});


export function trackingInfo (productArrival, productName, productQuantity, productImage){
    let trackingHtml = `
    <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
    </a>

    <div class="delivery-date">
        Arriving on ${productArrival}
    </div>

    <div class="product-info">
        ${productName}
    </div>

    <div class="product-info">
        Quantity: ${productQuantity}
    </div>

    <img class="product-image" src="./${productImage}">

    <div class="progress-labels-container">
        <div class="progress-label">
        Preparing
        </div>
        <div class="progress-label current-status">
        Shipped
        </div>
        <div class="progress-label">
        Delivered
        </div>
    </div>

    <div class="progress-bar-container">
        <div class="progress-bar"></div>
    </div>`;

    document.querySelector('.order-tracking').innerHTML = trackingHtml;
}
