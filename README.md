# 🛍️ API REST de Productos

Este proyecto es una API REST desarrollada en Node.js con Express y MongoDB para la gestión de productos. Permite realizar operaciones CRUD, aplicar filtros por categoría y estado, e incluye paginación y ordenamiento.

---

## 🎯 Objetivo del Trabajo Práctico

El objetivo del trabajo práctico es diseñar y desarrollar una API REST que permita gestionar un catálogo de productos, aplicando buenas prácticas de desarrollo backend. Se buscó separar las responsabilidades en capas (controlador, servicio, validaciones), validar entradas del usuario y brindar respuestas claras.

---

## ⚙️ Tecnologías utilizadas

-   [Node.js](https://nodejs.org/)
-   [Express.js](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
-   [Postman](https://www.postman.com/) (para pruebas)

---

## 📬 Endpoints principales

### 🔍 Obtener todos los productos

`GET /api/products`

-   Query params:
    -   `limit`: cantidad de resultados por página (opcional)
    -   `page`: número de página (opcional)
    -   `sort`: `asc` o `desc` según el precio (opcional)
    -   `category`: filtra por categoría (opcional)
    -   `status`: `true` o `false` (opcional)

### 📦 Obtener un producto por ID

`GET /api/products/:pid`

### ➕ Crear un producto

`POST /api/products`

```json
{
    "title": "Laptop HP Pavilion 15",
    "description": "Laptop con procesador Intel Core i5, 8GB RAM y 512GB SSD",
    "code": "LHP155120",
    "price": 350000,
    "status": true,
    "stock": 10,
    "category": "Laptops",
    "thumbnails": ["laptop_hp_pavilion_15.jpg"]
}
```

### 🛠️ Actualizar un producto

`PUT /api/products/:pid`

### ❌ Eliminar un producto

`DELETE /api/products/:pid`

---

## 🧪 Pruebas con Postman

Incluí una colección de Postman con pruebas para todos los endpoints. Se encuentra en:

📁 `/postman/TP-Coderhouse_Entrega_Final.postman_collection.json`

Para usarla:

1. Abrí Postman
2. Hacé clic en _Import_
3. Seleccioná el archivo `.json` de la colección

---

## 📄 Estructura del proyecto

```
├── controllers/
│   └── product.controller.js
├── services/
│   └── product.service.js
├── validators/
│   ├── product.validator.js
│   └── objectId.validator.js
├── routes/
│   └── products.routes.js
├── models/
│   └── product.model.js
├── postman/
│   └── TP-Productos.postman_collection.json
├── .env
├── .gitignore
├── app.js
└── package.json
```

---

## 👤 Autor

Desarrollado por **[Tu Nombre]**

---

## ✅ Estado del proyecto

-   [x] CRUD de productos
-   [x] Validación de datos
-   [x] Paginación y ordenamiento
-   [x] Filtros por categoría y estado
-   [x] Colección de Postman incluida

---
