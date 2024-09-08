export const cart = [];

export function addToCart (productId) {
    let matchingItem;
  
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += 1;
    //   cartQuantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
      });
    //   cartQuantity += 1;
    }
  
    // document.querySelector(".cart-quantity").innerHTML = cartQuantity;
  }

  export function getCartQuantity (cart){
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })

    return cartQuantity;
  }