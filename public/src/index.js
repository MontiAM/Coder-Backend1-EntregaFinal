const productForm = document.getElementById("product-form");

if (productForm) {
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const code = document.getElementById("code").value;
        const price = document.getElementById("price").value;
        const stock = document.getElementById("stock").value;
        const category = document.getElementById("category").value;
        const status = document.getElementById("status").checked;
        const thumbnailsInput = document.getElementById("thumbnails");
        const thumbnails = Array.from(thumbnailsInput.files).map(
            (file) => file.name
        );

        const product = {
            title,
            description,
            code,
            price: parseFloat(price),
            stock: parseFloat(stock),
            category,
            status,
            thumbnails,
        };
        postProduct(product);
    });
}

const filterButton = document.getElementById("filter-button");
let currentCategory = "";
let currentStatus = "";

if (filterButton) {
    filterButton.addEventListener("click", () => {
        currentCategory = document.getElementById("filter-category").value;
        currentStatus = document.getElementById("filter-status").value;
        fetchProducts(1, currentCategory, currentStatus);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();

    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", () => {
            const page = parseInt(prevButton.dataset.page, 10);
            fetchProducts(page, currentCategory, currentStatus);
        });

        nextButton.addEventListener("click", () => {
            const page = parseInt(nextButton.dataset.page, 10);
            fetchProducts(page, currentCategory, currentStatus);
        });
    }
});
