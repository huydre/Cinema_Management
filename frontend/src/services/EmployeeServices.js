import API from "./APIServices";

export const getEmployees = async () => {
    try {
        const response = await API.get("employee");
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employee', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data', error);
      throw error;
    }
  };