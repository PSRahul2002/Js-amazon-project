import { cart, getCartQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function renderPaymentSummary (){
    const cartQuantity = getCartQuantity(cart);
    document.querySelector('.js-payment-summary-row').innerHTML = `Items (${cartQuantity})`;

    let totalCost = 0;
    let ShippingCost = 0;
    

    cart.forEach((product) => {    
        const price = parseFloat(getPrice(product.productId));
        const quantity = parseFloat(product.quantity);
        const shipping = parseFloat(getShippingCost(product.deliveryOptionId))

        
        totalCost += (price * quantity);
        ShippingCost += shipping;
    });

    let totalBeforeTax = totalCost + ShippingCost;
    let estimatedTax = (totalCost/10);
    let orderTotal = totalBeforeTax + estimatedTax;

    totalCost = totalCost.toFixed(2);
    ShippingCost = ShippingCost.toFixed(2);
    totalBeforeTax = totalBeforeTax.toFixed(2);
    estimatedTax = estimatedTax.toFixed(2);
    orderTotal = orderTotal.toFixed(2);
    

    
    document.querySelector('.payment-summary-money').innerHTML = `$${totalCost}`;
    document.querySelector('.payment-summary-money-shipping').innerHTML = `$${ShippingCost}`;
    document.querySelector('.payment-summary-money-total-before-tax').innerHTML = `$${totalBeforeTax}`;
    document.querySelector('.payment-summary-money-estimated-tax').innerHTML = `$${estimatedTax}`;
    document.querySelector('.payment-summary-money-order-total').innerHTML = `$${orderTotal}`;
}

export function getPrice (productId){
    let matchingItem;

    for (const product of products){
        if (product.id === productId){
            matchingItem = product;
            break;
        }
    }
    return (matchingItem.priceCents/100);
}

export function getShippingCost (deliveryOptionId){
    let matchingDelivery;

    deliveryOptions.forEach((deliveryOption) => {
        if (deliveryOptionId === deliveryOption.id){
            matchingDelivery = deliveryOption;
        }
    })

    return (matchingDelivery.priceCents/100);
}
