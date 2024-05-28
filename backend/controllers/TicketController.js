var config = require('../config');
const sql = require('mssql');

async function purchaseTicket(ticket) {
    try {
        let pool = await sql.connect(config.sql);
        let insertTicket = await pool.request()
            .input('filmId', sql.VarChar, ticket.filmId)
            .input('scheduleId', sql.VarChar, ticket.scheduleId)
            .input('seatNumber', sql.VarChar, ticket.seatNumber)
            .input('seatRow', sql.VarChar, ticket.seatRow)
            .input('roomId', sql.VarChar, ticket.roomId)
            .input('employeeId', sql.VarChar, ticket.employeeId)
            .input('price', sql.Int, ticket.price)
            .execute('MuaTicket');
        return { status: 'success', message: 'Ticket purchased successfully'};
    } catch (error) {
        console.log(error.message);
        return { status: 'error', message: error.message };
    }
}

module.exports = { purchaseTicket };