const updatePaginationControls = (data) => {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const pageIndicator = document.getElementById("page-indicator");

    if (!prevButton || !nextButton || !pageIndicator) return;

    prevButton.disabled = !data.hasPrevPage;
    nextButton.disabled = !data.hasNextPage;

    pageIndicator.textContent = `Página ${data.page}`;

    prevButton.dataset.page = data.prevPage || data.page;
    nextButton.dataset.page = data.nextPage || data.page;
};

const fetchProducts = async (page = 1) => {
    try {
        const response = await fetch(`/api/products?page=${page}`);
        const data = await response.json();

        const products = data.payload || [];
        renderProducts(products);
        updatePaginationControls(data);
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

const postProduct = async (product) => {
    try {
        console.log(product);

        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        console.log("Producto creado:", data);
    } catch (error) {
        console.error("Error al crear producto:", error);
    }
};

const deleteProduct = async (id) => {
    try {
        await fetch(`/api/products/${id}`, { method: "DELETE" });
        fetchProducts();
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
};

document.addEventListener("DOMContentLoaded", fetchProducts);
