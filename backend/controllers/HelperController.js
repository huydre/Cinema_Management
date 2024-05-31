var config = require('../config');
const sql = require('mssql');
const getUserConfig = require('../config');

async function getDSPM() {
  try {
    await sql.close();
    let pool = await sql.connect(getUserConfig("sa","123", "DESKTOP-ENIOI3O\\CINEMA_N19", "DESKTOP-ENIOI3O\\CINEMA_N19").sql);
    let result = await pool.request().query('select * from view_DanhSachPhanManh');
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
  }
}

async function getStatistics() {
  try {
    let pool = await sql.connect(getUserConfig().sql);
    let result = await pool.request().execute('GetStatistics');
    return result.recordset;
  } catch (error) {
    console.error('SQL error', err);
  }
}

async function getRevenueLast30Days() {
  try {
    let pool = await sql.connect(getUserConfig().sql);
    let result = await pool.request().execute('GetRevenueLast30Days');
    return result.recordset;
  } catch (error) {
    console.error('SQL error', err);
  }
}

module.exports = {
    getDSPM: getDSPM,
    getStatistics: getStatistics,
    getRevenueLast30Days: getRevenueLast30Days
};