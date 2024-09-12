import { displayCartItems, updateDeliveryDate } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/backend-practice.js';

displayCartItems(); 
updateDeliveryDate();
renderPaymentSummary();

