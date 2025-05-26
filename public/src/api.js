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

    if (cartId) {
        try {
            const response = await fetch(`/api/carts/${cartId}`);
            if (!response.ok) {
                console.warn(
                    "Carrito no encontrado en la base. Creando uno nuevo..."
                );
                localStorage.removeItem("cartId");
                cartId = null;
            }
        } catch (err) {
            console.error("Error al verificar carrito existente:", err);
            localStorage.removeItem("cartId");
            cartId = null;
        }
    }

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

            if (response.ok && (data._id || data.id)) {
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
const addToCart = async (proId) => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
        await postCart();
    }
    try {
        const response = await fetch(`/api/carts/${cartId}/product/${proId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: 1 }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
        }

        const data = await response.json();
        const newProduct = data.products.find(
            (product) => product.product._id.toString() === proId.toString()
        );
        alert(`Producto : ${newProduct.product.title} agregado con exito`);
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
    }
};
const deleteProductFromCart = async (prodId) => {
    const cartId = localStorage.getItem("cartId");
    try {
        const deletedProduct = await fetch(
            `/api/carts/${cartId}/product/${prodId}`,
            {
                method: "DELETE",
            }
        );
        const data = await deletedProduct.json();
        console.log("Producto eliminado del carrito:", data);
        window.location.reload();
    } catch (error) {
        console.error("Error al eliminar carrito:", error);
    }
};

const postProductsToCart = async (cartId, body) => {
    try {
        const response = await fetch(`/api/carts/${cartId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();
        if (response.ok) {
            console.log("Resultado de la compra:", result);
            alert("Compra finalizada con éxito");
            localStorage.removeItem("cartId");
            window.location.href = "/products";
        }
    } catch (error) {
        console.error("Error al finalizar compra:", error);
        alert("Ocurrió un error al finalizar la compra");
    }
};
