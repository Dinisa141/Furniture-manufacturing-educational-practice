const db = require('../config/database');

class ProductType {
  static async findAll() {
    const result = await db.query('SELECT * FROM product_types');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM product_types WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(typeData) {
    const { type_name, type_factor } = typeData;
    const result = await db.query(
      'INSERT INTO product_types (type_name, type_factor) VALUES ($1, $2) RETURNING *',
      [type_name, type_factor]
    );
    return result.rows[0];
  }

  static async update(id, typeData) {
    const { type_name, type_factor } = typeData;
    const result = await db.query(
      'UPDATE product_types SET type_name = $1, type_factor = $2 WHERE id = $3 RETURNING *',
      [type_name, type_factor, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM product_types WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = ProductType;