const db = require('../config/database');

class MaterialType {
  static async findAll() {
    const result = await db.query('SELECT * FROM material_types');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM material_types WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(materialData) {
    const { material_name, loss_percentage } = materialData;
    const result = await db.query(
      'INSERT INTO material_types (material_name, loss_percentage) VALUES ($1, $2) RETURNING *',
      [material_name, loss_percentage]
    );
    return result.rows[0];
  }

  static async update(id, materialData) {
    const { material_name, loss_percentage } = materialData;
    const result = await db.query(
      'UPDATE material_types SET material_name = $1, loss_percentage = $2 WHERE id = $3 RETURNING *',
      [material_name, loss_percentage, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM material_types WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = MaterialType;