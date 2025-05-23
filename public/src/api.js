const updatePaginationControls = (data) => {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const pageIndicator = document.getElementById("page-indicator");

    if (!prevButton || !nextButton || !pageIndicator) return;

    prevButton.disabled = !data.hasPrevPage;
    nextButton.disabled = !data.hasNextPage;

    pageIndicator.textContent = data.page
        ? `Página ${data.page}`
        : "Sin páginas";

    prevButton.dataset.page = data.prevPage || data.page;
    nextButton.dataset.page = data.nextPage || data.page;
};

function fetchProducts(page = 1, category = "", status = "") {
    let url = `/api/products?page=${page}`;

    if (category) {
        url += `&category=${encodeURIComponent(category)}`;
    }

    if (status !== "") {
        url += `&status=${status}`;
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            renderProducts(data.payload);
            updatePaginationControls(data);
        })
        .catch(() => {
            renderProducts([]);
            updatePaginationControls({});
        });
}

const postProduct = async (product) => {
    try {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData);
            return;
        }
        const data = await response.json();
        return data;
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
