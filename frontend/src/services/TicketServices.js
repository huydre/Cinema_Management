import API from "./APIServices";

export const purchaseTicket = async (req) => {
    try {
        const response = await API.post("tickets", req);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}