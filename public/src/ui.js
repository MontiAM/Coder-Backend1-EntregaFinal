const renderProductWithDelete = (product) => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
      <h3>${product.title}</h3>
      <p><strong>Descripción:</strong> ${product.description}</p>
      <p><strong>Código:</strong> ${product.code}</p>
      <p><strong>Precio:</strong> $${product.price}</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
      <p><strong>Categoría:</strong> ${product.category}</p>
      <p><strong>Estado:</strong> ${
          product.status ? "Disponible" : "No disponible"
      }</p>      
      <p><strong>Imagenes:</strong> ${
          product.thumbnails.length > 0
              ? product.thumbnails.map((url) => `${url}`).join(" - ")
              : "Sin imagenes"
      } </p>
      <div class="button-container">
        <button data-id="${
            product.id
        }" class="delete-button delete">Eliminar</button>
      </div>  
      `;

    const btnDelete = div.querySelector(".delete");
    btnDelete.addEventListener("click", () => {
        deleteProduct(btnDelete.dataset.id);
    });
    return div;
};

const renderProduct = (product) => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
      <h3>${product.title}</h3>
      <p><strong>Precio:</strong> $${product.price}</p>
      <p><strong>Imagenes:</strong> ${
          product.thumbnails.length > 0
              ? product.thumbnails.map((url) => `${url}`).join(" - ")
              : "Sin imagenes"
      } </p>
      <div class="button-container">
      <button data-id="${
          product.id
      }" class="add-button viewProduct">Ver</button>
        <button data-id="${product.id}" class="add-button addToCart">+</button>
      </div>  
      `;

    const btnAddToCart = div.querySelector(".addToCart");
    btnAddToCart.addEventListener("click", () => {
        addToCart(btnAddToCart.dataset.id);
    });

    const btnViewProduct = div.querySelector(".viewProduct");
    btnViewProduct.addEventListener("click", () => {
        const productId = btnViewProduct.dataset.id;
        window.location.href = `/products/${productId}`;
    });
    return div;
};

const renderProducts = (products) => {
    const list = document.getElementById("product-list");
    if (!list) return;

    list.innerHTML = "";
    products.forEach((product) => {
        const productElement = renderProduct(product);
        list.appendChild(productElement);
    });
};
