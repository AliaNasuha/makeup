function buttonclick() {
    var query = document.getElementById("searchMakeup").value;
    var query2 = document.getElementById("makeuptype").value;
  
    fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${query}&product_type=${query2}`
    )
      .then((response) => response.json())
      .then((data) => {
        var productcontainer = document.getElementById("product-container");
        var defaultProductsContainer = document.getElementById("product");
  
        // Clear previous products
        productcontainer.innerHTML = "";
  
        if (data.length > 0) {
          defaultProductsContainer.style.display = "none"; // Hide default products
  
          data.forEach((product) => {
            var productDiv = document.createElement("div");
            productDiv.innerHTML = `
                <img src="${product.image_link}" alt="${product.name}" width="300" height="300">
                <p>Brand: ${product.brand}</p>
                <p>Name: ${product.name}</p>
                <p>Type: ${product.product_type}</p>
                <p>Price: $${product.price}</p>
                <p><a href="${product.product_link}" target="_blank">${product.product_link}</a></p>
                <button class="cart-button" onclick="addtocart(${JSON.stringify(product)})">Add to Cart</button>`;
            productcontainer.appendChild(productDiv);
  
            // Apply event listener for the current button
            var cartButton = productDiv.querySelector(".cart-button");
            cartButton.addEventListener("click", function() {
              addtocart(product);
            });
          });
        } else {
          productcontainer.innerHTML = "No products found.";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

//===============================================================================================
//to display and fetch some Beauty Products
document.addEventListener('DOMContentLoaded', () => {
    var productsContainer = document.getElementById('product');

    var brand = 'maybelline';

    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
      .then(response => response.json())
      .then(data => {
        var products = data.slice(0, 15); // Display at least 15 products

        products.forEach(product => {
          var productElement = document.createElement('div');
          productElement.classList.add('product');
          productElement.innerHTML = `
          <img src="${product.image_link}" alt="${product.name}" width="200" height="200">
            <h3>${product.name}</h3>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Price:</strong> ${product.price}</p>`;
          productsContainer.appendChild(productElement);
        });
      })
    .catch(error => console.error('Error fetching products:', error));
});

//=============================================================================================
var cart = [];

function addtocart(product) {
    // Check if the product is already in the cart based on id
    var existingProduct = cart.find(item => item.id == product.id);
  
    if (existingProduct) {
      // If the product is already in the cart, update its quantity
      existingProduct.quantity++;
    } else {
      // Add the product to the cart with a unique ID
      var cartProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        quantity: 1,
      };
      cart.push(cartProduct);
    }

    // Store only the last 5 products in the cart
    if (cart.length > 5) {
        cart.shift(); // Remove the oldest product
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  }
  
