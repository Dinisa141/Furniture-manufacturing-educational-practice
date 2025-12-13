const db = require('../config/database');

class Product {
  static async findAll() {
    const result = await db.query(`
      SELECT p.*, m.material_name, pt.type_name 
      FROM products p
      LEFT JOIN material_types m ON p.main_material_id = m.id
      LEFT JOIN product_types pt ON p.product_type_id = pt.id
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async create(productData) {
    const { product_name, article, minimum_cost, main_material_id, product_type_id } = productData;
    const result = await db.query(
      'INSERT INTO products (product_name, article, minimum_cost, main_material_id, product_type_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [product_name, article, minimum_cost, main_material_id, product_type_id]
    );
    return result.rows[0];
  }

  static async update(id, productData) {
    const { product_name, article, minimum_cost, main_material_id, product_type_id } = productData;
    const result = await db.query(
      'UPDATE products SET product_name = $1, article = $2, minimum_cost = $3, main_material_id = $4, product_type_id = $5 WHERE id = $6 RETURNING *',
      [product_name, article, minimum_cost, main_material_id, product_type_id, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Product;