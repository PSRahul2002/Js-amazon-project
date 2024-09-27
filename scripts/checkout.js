import { displayCartItems, updateDeliveryDate } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary, placeOrder} from "./checkout/paymentSummary.js";
// import '../data/backend-practice.js';
import { clearOrders, orders } from "../data/orders.js";

displayCartItems(); 
updateDeliveryDate();
renderPaymentSummary();
placeOrder();
