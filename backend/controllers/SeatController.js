var config = require('../config');
const sql = require('mssql');

async function getAllSeat() {
    try {
        let pool = await sql.connect(config.sql);
        let seats = await pool.request().execute('GetAllSeat');
        return seats.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getSeatById(id) {
    try {
        let pool = await sql.connect(config.sql);
        let seat = await pool.request()
            .input('SeatID', sql.VarChar, id)
            .execute('GetSeatById');
        return seat.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addSeat(seat) {
    try {
        let pool = await sql.connect(config.sql);
        let insertSeat = await pool.request()
            .input('SeatID', sql.VarChar, seat.SeatID)
            .input('RoomID', sql.VarChar, seat.RoomID)
            .input('SeatNumber', sql.VarChar, seat.SeatNumber)
            .input('SeatRow', sql.VarChar, seat.SeatRow)
            .execute('InsertSeat');
        return insertSeat.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function updateSeat(id, seat) {
    try {
        let pool = await sql.connect(config.sql);
        let updateSeat = await pool.request()
            .input('SeatID', sql.VarChar, id)
            .input('RoomID', sql.VarChar, seat.RoomID)
            .input('SeatType', sql.VarChar, seat.SeatType)
            .input('SeatStatus', sql.VarChar, seat.SeatStatus)
            .execute('UpdateSeat');
        return updateSeat.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function deleteSeat(id) {
    try {
        let pool = await sql.connect(config.sql);
        let deleteSeat = await pool.request()
            .input('SeatID', sql.VarChar, id)
            .execute('DeleteSeat');
        return deleteSeat.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getSeatByRoomIdAndScheduleId(roomId, scheduleId) {
    try {
        let pool = await sql.connect(config.sql);
        let seat = await pool.request()
            .input('roomId', sql.VarChar, roomId)
            .input('scheduleId', sql.VarChar, scheduleId)
            .execute('GetSeatsByRoomIdAndScheduleId');
            console.log(seat);
        return seat.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllSeat: getAllSeat,
    getSeatById: getSeatById,
    addSeat: addSeat,
    updateSeat: updateSeat,
    deleteSeat: deleteSeat,
    getSeatByRoomIdAndScheduleId: getSeatByRoomIdAndScheduleId
}