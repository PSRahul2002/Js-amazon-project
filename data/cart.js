export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    });
  }

  let cartQuantity = getCartQuantity (cart);
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;

  saveToStorage();
}

export function getCartQuantity(cart) {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function deleteFromCart(array, id) {
  const index = array.findIndex((obj) => obj.productId === id); // Find the index of the object with the given id
  if (index !== -1) {
    array.splice(index, 1); // Remove the object at the found index
  }
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem = cart.find(cartItem => cartItem.productId === productId);;

  if (matchingItem){
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}