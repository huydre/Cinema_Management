import API from "./APIServices";

export const getSchedules = async () => {
    try {
        const response = await API.get("schedules");
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getScheduleById = async (id) => {
    try {
        const response = await API.get(`schedules/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const createSchedule = async (schedule) => {
    try {
        const response = await API.post("schedules", schedule);
        if (response.status === 201) {
            return response.data;
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const updateSchedule = async (id, schedule) => {
    try {
        const response = await API.put(`schedules/${id}`, schedule);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const deleteSchedule = async (id) => {
    try {
        const response = await API.delete(`schedules/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getScheduleByFilmId = async (id) => {
    try {
        const response = await API.get(`schedules/film/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}