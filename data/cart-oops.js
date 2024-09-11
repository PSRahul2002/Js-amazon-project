const cart = {
    cartItems: undefined,

    loadFromStorage () {
        this.cartItems = JSON.parse(localStorage.getItem("cart-oops"));

        if (!this.cartItems){
            this.cartItems = [];
        }
    },

    saveToStorage() {
        localStorage.setItem('cart-oops', JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
        let matchingItem;
      
        this.cartItems.forEach((item) => {
          if (productId === item.productId) {
            matchingItem = item;
          }
        });
      
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1',
          });
        }
      
        let cartQuantity = this.getCartQuantity (this.cartItems);
        document.querySelector(".cart-quantity").innerHTML = cartQuantity;
      
        this.saveToStorage();
    },

    getCartQuantity(cart) {
        let cartQuantity = 0;
      
        this.cartItems.forEach((cartItem) => {
          cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    },

    deleteFromCart(array, id) {
        const index = array.findIndex((obj) => obj.productId === id); 
        if (index !== -1) {
          array.splice(index, 1); 
        }
    },

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
      
        this.cartItems.forEach((item) => {
          if (item.productId === productId){
            matchingItem = item;
            matchingItem.deliveryOptionId = deliveryOptionId;
            
          }
        });
      
        this.saveToStorage();
      }
};

cart.loadFromStorage();