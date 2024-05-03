const db = require("../db");

class ProductController {
  async createProduct(req, res) {
    const { name } = req.body;
    const newProduct = await db.query(
      `INSERT INTO categories (name) values ($1) RETURNING *`,
      [name]
    );
    res.json(newProduct.rows[0]);
  }

  async getProduct(req, res) {
    const products = await db.query("SELECT * FROM categories");
    res.json(products.rows);
  }

  async getOneProduct(req, res) {
    const id = req.params.id;
    const product = await db.query(`SELECT * FROM categories where id = $1 `, [
      id,
    ]);
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
