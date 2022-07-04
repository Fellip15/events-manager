import axios from "axios";
  
export const login = async (email, password) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const data = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );
        return data;
    } catch (error) {
        return null;
    }
};

export const logout = () => {
    return;
};

export async function register(email, password) {
    try {
        const config = {
        headers: {
            "Content-type": "application/json",
        },
        };

        const data = await axios.post(
        "/api/users",
        { email, password },
        config
        );

        return data;
    } catch (error) {
        return null;
    }
};