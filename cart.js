document.addEventListener('DOMContentLoaded', () => {
  var cartContainer = document.getElementById('cart-container');

  // Retrieve the cart array from localStorage
  var storedCart = localStorage.getItem('cart');
  var cart = storedCart ? JSON.parse(storedCart) : [];

  function renderCart() {
    cartContainer.innerHTML = '';

      // Display the last 5 products added to the cart
      var startIndex = Math.max(0, cart.length - 5);
      var endIndex = cart.length;
    
      if (cart.length > 0) {
        for (var index = startIndex; index < endIndex; index++) {
          var product = cart[index];
  
          var productElement = document.createElement('div');
          productElement.classList.add('product');
          productElement.innerHTML = `
            <img src="${product.image_link}" alt="${product.name}" width="200" height="200">
            <h3>${product.name}</h3>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <label for="quantity-${index}"><strong>Quantity:</strong></label>
            <input type="number" id="quantity-${index}" value="${product.quantity}" min="1">
            <button class="edit-button" onclick="editProduct(${index})">Update</button>
            <button class="delete-button" onclick="deleteProduct(${index})">Delete</button>`;
  
          cartContainer.appendChild(productElement);

          (function (currentIndex) {
            var editButton = productElement.querySelector(".edit-button");
            editButton.addEventListener("click", function () {
              editProduct(currentIndex);
            });
    
            var deleteButton = productElement.querySelector(".delete-button");
            deleteButton.addEventListener("click", function () {
              deleteProduct(currentIndex);
            });
          })(index);
        }
      } else {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      }
    }

  renderCart();

  function editProduct(index) {
    var quantityInput = document.getElementById(`quantity-${index}`);
    var newQuantity = parseInt(quantityInput.value, 10);
  
    if (newQuantity >= 1) {
      cart[index].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    } else { 
      alert('Please enter a valid quantity (minimum 1).');
    }
  }

  function deleteProduct(index){
    cart.splice(index,1);
    localStorage.setItem('cart',JSON.stringify(cart));
    renderCart();
  }
  
  // Calculate and display the total price
  var total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  var cartTotalPrice = document.querySelector('.cart-total-price');
  cartTotalPrice.textContent = `$${total.toFixed(2)}`;
});
