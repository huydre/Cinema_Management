import API from "./APIServices";


export const getDSPM = async () => {
    try {
        const res = await API.get("/helper");
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const getLoginInfo = async (auth) => {
    try {
        const res = await API.get("/auth/getlogininfo", {
            headers: {
                'user': auth.USERNAME,
                'password': auth.PASSWORD,
                'server': auth.SERVERNAME
              }
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const checkLogin = async (auth) => {
    try {
        const res = await API.post("/auth/checklogin", auth);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}