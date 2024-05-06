const db = require("../db");

class ProductController {
  async createProduct(req, res) {
    const { name, price, categoryName, mater, color, art, text, img_urls } =
      req.body;

    try {
      let categoryId;

      // Проверяем, существует ли категория с заданным именем
      const existingCategory = await db.query(
        `SELECT id FROM categories WHERE name = $1`,
        [categoryName]
      );

      if (existingCategory.rows.length > 0) {
        // Используем существующую категорию
        categoryId = existingCategory.rows[0].id;
      } else {
        // Если категория не существует, создаем новую
        const newCategory = await db.query(
          `INSERT INTO categories (name) VALUES ($1) RETURNING id`,
          [categoryName]
        );
        categoryId = newCategory.rows[0].id;
      }

      // Создаем новый продукт, привязанный к категории
      const newProduct = await db.query(
        `INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *`,
        [name, price, categoryId]
      );

      const productId = newProduct.rows[0].id;

      // Добавляем описание продукта
      await db.query(
        `INSERT INTO description (product_id, mater, color, art, text) VALUES ($1, $2, $3, $4, $5)`,
        [productId, mater, color, art, text]
      );

      // Добавляем изображение продукта
      await db.query(
        `INSERT INTO product_images (product_id, img_urls) VALUES ($1, $2)`,
        [productId, img_urls]
      );

      // Отправляем успешный ответ с данными о созданном продукте
      res.status(201).json(newProduct.rows);
    } catch (error) {
      console.error("Ошибка при создании продукта:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }

  async getProduct(req, res) {
    try {
      // Запрос к базе данных для получения списка продуктов с дополнительными данными
      const productsQuery = `
      SELECT p.id, p.name,p.price,d.mater,d.color,d.art,d.text,pi.img_urls
      FROM products p
      LEFT JOIN 
          description d ON p.id = d.product_id
      LEFT JOIN 
          product_images pi ON p.id = pi.product_id

            
    `;

      const productsResult = await db.query(productsQuery);

      // Проверяем, были ли найдены продукты
      if (productsResult.rows.length === 0) {
        return res.status(404).json({ message: "Продукты не найдены" });
      }

      // Извлекаем список продуктов из результата запроса
      const products = productsResult.rows;

      // Отправляем список продуктов клиенту
      res.status(200).json(products);
    } catch (error) {
      console.error("Ошибка при получении списка продуктов:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }

  async getOneProduct(req, res) {
    const id = req.params.id;
    const product = await db.query(
      `
    SELECT 
    p.id,
    p.name,
    p.price,
    d.mater,
    d.color,
    d.art,
    d.text,
    pi.img_urls
FROM 
    products p
LEFT JOIN 
    description d ON p.id = d.product_id
LEFT JOIN 
    product_images pi ON p.id = pi.product_id
WHERE 
    p.id = $1; `,
      [id]
    );
    res.json(product.rows[0]);
  }

  async updateProduct(req, res) {
    const { id, name } = req.body;
    const product = await db.query(
      `UPDATE categories set name = $1 where id = $2 RETURNING *`,
      [name, id]
    );
    res.json(product.rows[0]);
  }

  async deleteProduct(req, res) {
    const id = req.params.id;
    const product = await db.query(`DELETE FROM categories where id = $1 `, [
      id,
    ]);
    res.json(product.rows[0]);
  }
}

module.exports = new ProductController();
