var config = require('../config');
const sql = require('mssql');

async function getPublications() {
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool.request().query('select * from view_DanhSachPhanManh');
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
  }
}

module.exports = {
    getPublications,
};