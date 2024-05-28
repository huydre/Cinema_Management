import API from "./APIServices";

export const getSeatsByRoomAndSchedule = async (req) => {
    try {
        const response = await API.post("seats/room", req);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}