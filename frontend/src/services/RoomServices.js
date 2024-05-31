import API from "./APIServices";

export const getRooms = async (auth) => {
    try {
        const response = await API.get("rooms");
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}