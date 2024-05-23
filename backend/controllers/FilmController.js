var config = require('../config');
const sql = require('mssql');

async function getAllFilms() {
    try {
        let pool = await sql.connect(config.sql);
        let films = await pool.request().execute('GetAllFilms');
        return films.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getFilmById(filmId) {
    try {
        let pool = await sql.connect(config.sql);
        let film = await pool.request()
            .input('Id', sql.VarChar, filmId)
            .execute('GetFilmById');
        return film.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function insertFilm(film) {
    try {
        let pool = await sql.connect(config.sql);
        let insertFilm = await pool.request()
            .input('Name', sql.NVarChar, film.name)
            .input('Duration', sql.Int, film.duration)
            .input('PosterPath', sql.NVarChar, film.poster_path)
            .input('Country', sql.NVarChar, film.country)
            .input('Overview', sql.NVarChar, film.overview)
            .execute('InsertFilm');
        return insertFilm.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function updateFilm(id, film) {
    try {
        let pool = await sql.connect(config.sql);
        let updateFilm = await pool.request()
            .input('Id', sql.VarChar, id)
            .input('Name', sql.NVarChar, film.name)
            .input('Duration', sql.Int, film.duration)
            .input('PosterPath', sql.NVarChar, film.poster_path)
            .input('Country', sql.NVarChar, film.country)
            .input('Overview', sql.NVarChar, film.overview)
            .execute('UpdateFilm');
        return updateFilm.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function deleteFilm(filmId) {
    try {
        let pool = await sql.connect(config.sql);
        let film = await pool.request()
            .input('Id', sql.VarChar, filmId)
            .execute('DeleteFilm');
        return film.recordsets;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllFilms,
    getFilmById,
    insertFilm,
    updateFilm,
    deleteFilm
}