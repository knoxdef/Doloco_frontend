import axios from 'axios';

const useAxios = () => {
    const axiosInstance = axios.create({ baseURL: 'https://doloco.my.id/api/' });

    const getRequest = async (table) => {
        try {
            const response = await axiosInstance.get(table);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const postRequest = async (table, content) => {
        try {
            const response = await axiosInstance.post(table, content);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const updateRequest = async () => { };

    const deleteRequest = async () => { };

    return {
        getRequest,
        postRequest,
        updateRequest,
        deleteRequest,
    };
};

export default useAxios;
