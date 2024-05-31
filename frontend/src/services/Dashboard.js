import API from "./APIServices";

export const getStatistics = async () => {
    try {
        const res = await API.get("/helper/statistics");
        return res?.data[0];
    } catch (error) {
        console.error(error);
    }
};

export const getRevenueLast30Days = async () => {
    try {
        const res = await API.get("/helper/revenue30");
        return res?.data;
    } catch (error) {
        console.error(error);
    }
}