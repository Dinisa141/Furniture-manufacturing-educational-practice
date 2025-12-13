const db = require('../config/database');

class ProductWorkshop {
  static async findAll() {
    const result = await db.query(`
      SELECT pw.*, p.product_name, w.workshop_name 
      FROM product_workshops pw
      LEFT JOIN products p ON pw.product_id = p.id
      LEFT JOIN workshops w ON pw.workshop_id = w.id
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM product_workshops WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { product_id, workshop_id, production_time } = data;
    const result = await db.query(
      'INSERT INTO product_workshops (product_id, workshop_id, production_time) VALUES ($1, $2, $3) RETURNING *',
      [product_id, workshop_id, production_time]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { product_id, workshop_id, production_time } = data;
    const result = await db.query(
      'UPDATE product_workshops SET product_id = $1, workshop_id = $2, production_time = $3 WHERE id = $4 RETURNING *',
      [product_id, workshop_id, production_time, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM product_workshops WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = ProductWorkshop;