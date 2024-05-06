// Выполняем GET запрос к серверу для получения списка товаров
$.ajax({
  url: "http://localhost:8080/api/product",
  type: "GET",
  success: function (products) {
    // Обработка успешного ответа от сервера
    displayProductList(products);
  },
  error: function (error) {
    // Обработка ошибки запроса
    console.error("Ошибка при получении списка товаров:", error);
  },
});

// Функция для отображения списка товаров на странице
function displayProductList(products) {
  const productListContainer = document.getElementById("productList");

  // Очищаем контейнер перед добавлением новых элементов
  productListContainer.innerHTML = "";

  // Перебираем каждый товар и добавляем его в список
  products.forEach((product) => {
    // Формируем HTML для отображения информации о товаре
    const productHTML = `
            <div class="product">
                <h2>${product.name}</h2>
                <p><strong>Цена:</strong> ${product.price} руб.</p>
                <p><strong>Бренд:</strong> ${product.brand}</p>
                <p><strong>Цвет:</strong> ${product.color}</p>
                <p><strong>Артикул:</strong> ${product.art}</p>
                <p><strong>Описание:</strong> ${product.text}</p>
                <img src="${
                  "/img/" + product.img_url
                }" alt="Изображение продукта">
            </div>
        `;

    // Добавляем HTML товара в контейнер списка
    productListContainer.innerHTML += productHTML;
  });
}
