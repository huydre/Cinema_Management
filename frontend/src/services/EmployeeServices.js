import API from "./APIServices";

export const getEmployees = async () => {
    try {
        const response = await API.get("employees");
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
