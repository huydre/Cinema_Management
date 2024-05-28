import API from "./APIServices";

export const getFilms = async () => {
    try {
        const response = await API.get("films");
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getFilmById = async (id) => {
    try {
        const response = await API.get(`films/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const createFilm = async (film) => {
    try {
        const response = await API.post("films", film);
        if (response.status === 201) {
            return response.data;
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const updateFilm = async (id, film) => {
    try {
        const response = await API.put(`films/${id}`, film);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const deleteFilm = async (id) => {
    try {
        const response = await API.delete(`films/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
