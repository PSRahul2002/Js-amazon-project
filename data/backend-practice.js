import { cart } from "../data/cart.js";
// const r1 = new XMLHttpRequest();

// r1.addEventListener('load', () => {
//     console.log (r1.response);
// });

// r1.open ('GET', 'https://supersimplebackend.dev');
// r1.send();

function createRequest (command, url){
    const name = new XMLHttpRequest();

    name.addEventListener('load', () => {
        console.log(name.response);
    })

    name.open(`${command}`, `${url}`);
    name.send();
}

// createRequest ('GET', 'https://supersimplebackend.dev/hello');
// createRequest ('GET', 'https://supersimplebackend.dev/products/first');
// createRequest ('GET', 'https://supersimplebackend.dev');
// createRequest ('GET', 'https://supersimplebackend.dev/images/apple.jpg');



// async function placeOrder() {
//     document.querySelector('.js-place-order').addEventListener('click', async () => {
//         try {
//             const response = await fetch('https://supersimplebackend.dev/orders', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     cart: cart  // Assuming 'cart' is a defined object
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const order = await response.json();
//             console.log(order);
//         } catch (error) {
//             console.error('Error placing order:', error);
//         }
//     });
// }

// placeOrder();
