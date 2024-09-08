export let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartQuantity(cart) {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function deleteFromCart(array, id) {
  let matchingItem;

  const index = array.findIndex((obj) => obj.productId === id); // Find the index of the object with the given id
  if (index !== -1) {
    array.splice(index, 1); // Remove the object at the found index
  }
}
