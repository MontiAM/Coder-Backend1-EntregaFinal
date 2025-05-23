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
const postCart = async () => {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
        try {
            const response = await fetch("/api/carts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            const data = await response.json();
            if (response.ok) {
                cartId = data._id || data.id;
                localStorage.setItem("cartId", cartId);
                console.log("Carrito creado con ID:", cartId);
            } else {
                console.error("Error al crear carrito:", data.error);
            }
        } catch (err) {
            console.error("Error al crear carrito:", err);
        }
    }
};
const fetchProducts = (page = 1, category = "", status = "") => {
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
};
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

const addToCart = async (id) => {
    const storedProducts =
        JSON.parse(localStorage.getItem("cartProducts")) || [];

    const existingProduct = storedProducts.find((p) => p._id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        storedProducts.push({ _id: id, quantity: 1 });
    }

    localStorage.setItem("cartProducts", JSON.stringify(storedProducts));

    // try {
    //     const response = await fetch(`/api/carts/${cartId}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ products: storedProducts }),
    //     });

    //     if (!response.ok) {
    //         const errorData = await response.json();
    //         console.log(errorData);
    //         return;
    //     }

    //     const data = await response.json();
    //     console.log("Carrito actualizado:", data);
    // } catch (error) {
    //     console.error("Error al agregar producto al carrito:", error);
    // }
};
