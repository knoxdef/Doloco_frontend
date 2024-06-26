import axios from 'axios';

const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://doloco.my.id/api/',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const getRequest = async (endpoint) => {
        try {
            const response = await axiosInstance.get(endpoint);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const postRequest = async (endpoint, content) => {
        try {
            const response = await axiosInstance.post(endpoint, content);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const updateRequest = async () => { };

    const deleteRequest = async (endpoint) => {
        try {
            const response = await axiosInstance.delete(endpoint);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        getRequest,
        postRequest,
        updateRequest,
        deleteRequest,
    };
};

export default useAxios;
