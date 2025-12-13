const db = require('../config/database');

class Workshop {
  static async findAll() {
    const result = await db.query('SELECT * FROM workshops');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM workshops WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(workshopData) {
    const { workshop_name, workshop_type, number_of_people } = workshopData;
    const result = await db.query(
      'INSERT INTO workshops (workshop_name, workshop_type, number_of_people) VALUES ($1, $2, $3) RETURNING *',
      [workshop_name, workshop_type, number_of_people]
    );
    return result.rows[0];
  }

  static async update(id, workshopData) {
    const { workshop_name, workshop_type, number_of_people } = workshopData;
    const result = await db.query(
      'UPDATE workshops SET workshop_name = $1, workshop_type = $2, number_of_people = $3 WHERE id = $4 RETURNING *',
      [workshop_name, workshop_type, number_of_people, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM workshops WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Workshop;