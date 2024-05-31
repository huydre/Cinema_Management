var config = require('../config');
const sql = require('mssql');
const getUserConfig = require('../config');

async function getAllSchedule(data) {
    try {
        let pool = await sql.connect(getUserConfig(data.user, data.password, data.server, data.server).sql);
        let schedules = await pool.request().execute('GetAllSchedule');
        return schedules.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getScheduleById(id) {
    try {
        let pool = await sql.connect(config.sql);
        let schedule = await pool.request()
            .input('ScheduleID', sql.VarChar, id)
            .execute('GetScheduleById');
        return schedule.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addSchedule(schedule) {
    try {
        let pool = await sql.connect(config.sql);
        let insertSchedule = await pool.request()
            .input('StartTime', sql.DateTime, schedule.StartTime)
            .input('EndTime', sql.DateTime, schedule.EndTime)
            .input('FilmID', sql.VarChar, schedule.FilmID)
            .input('RoomID', sql.VarChar, schedule.RoomID)
            .execute('InsertSchedule');
        return insertSchedule.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function updateSchedule(id, schedule) {
    try {
        let pool = await sql.connect(config.sql);
        let updateSchedule = await pool.request()
            .input('ScheduleID', sql.VarChar, id)
            .input('StartTime', sql.DateTime, schedule.StartTime)
            .input('EndTime', sql.DateTime, schedule.EndTime)
            .input('FilmID', sql.VarChar, schedule.FilmID)
            .input('RoomID', sql.VarChar, schedule.RoomID)
            .execute('UpdateSchedule');
        return updateSchedule.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function deleteSchedule(id) {
    try {
        let pool = await sql.connect(config.sql);
        let deleteSchedule = await pool.request()
            .input('ScheduleID', sql.VarChar, id)
            .execute('DeleteSchedule');
        return deleteSchedule.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getScheduleByFilmId(id) {
    try {
        let pool = await sql.connect(config.sql);
        let schedule = await pool.request()
            .input('filmId', sql.VarChar, id)
            .execute('GetScheduleByFilmId');
        return schedule.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllSchedule: getAllSchedule,
    getScheduleById: getScheduleById,
    addSchedule: addSchedule,
    updateSchedule: updateSchedule,
    deleteSchedule: deleteSchedule,
    getScheduleByFilmId: getScheduleByFilmId
}