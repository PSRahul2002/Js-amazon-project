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

export function getCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function setCartQuantity (){
  let cartQuantity = getCartQuantity()
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
}

export function deleteFromCart(array, id) {
  const index = array.findIndex((obj) => obj.productId === id);
  if (index !== -1) {
    array.splice(index, 1); 
  }
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
    if (item.productId === productId){
      matchingItem = item;
      matchingItem.deliveryOptionId = deliveryOptionId;
      
    }
  });

  saveToStorage();
}

export function clearCart ()
{
  cart = []
  localStorage.setItem('cart', JSON.stringify(cart));
}