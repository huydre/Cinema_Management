import API from "./APIServices";

export const getEmployees = async (auth) => {
    try {
        const response = await API.get("employees", {
            headers: {
                'user': auth.USERNAME,
                'password': auth.PASSWORD,
                'server': auth.SERVERNAME
              }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const createEmployee = async (data) => {
    try {
        const response = await API.post("employees", data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const deleteEmployee = async (id) => {
    try {
        const response = await API.delete(`employees/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const updateEmployee = async (id, data) => {
    try {
        const response = await API.put(`employees/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getEmployeeById = async (id) => {
    try {
        const response = await API.get(`employees/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
