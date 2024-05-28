var config = require('../config');
const sql = require('mssql');

async function getAllRooms() {
    try {
        let pool = await sql.connect(config.sql);
        let rooms = await pool.request().execute('GetAllRooms');
        return rooms.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getRoomById(roomId) {
    try {
        let pool = await sql.connect(config.sql);
        let room = await pool.request()
            .input('roomId', sql.VarChar, roomId)
            .execute('GetRoomById');
        return room.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function insertRoom(room) {
    try {
        let pool = await sql.connect(config.sql);
        let insertRoom = await pool.request()
            .input('roomId', sql.VarChar, room.roomId)
            .input('name', sql.NVarChar, room.name)
            .input('status', sql.Int, room.status)
            .input('cinemaId', sql.VarChar, room.cinemaId)
            .execute('InsertRoom');
        return insertRoom.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function updateRoom(id, room) {
    try {
        let pool = await sql.connect(config.sql);
        let updateRoom = await pool.request()
            .input('roomId', sql.VarChar, id)
            .input('name', sql.NVarChar, room.name)
            .input('status', sql.Bit, room.status)
            .execute('UpdateRoom');
        return updateRoom.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function deleteRoom(roomId) {
    try {
        let pool = await sql.connect(config.sql);
        let room = await pool.request()
            .input('roomId', sql.VarChar, roomId)
            .execute('DeleteRoom');
        return room.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllRooms,
    getRoomById,
    insertRoom,
    updateRoom,
    deleteRoom
};