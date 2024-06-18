import axios from 'axios';

const useAxios = () => {
    const baseURL = 'https://5snpq6f0-8080.asse.devtunnels.ms/';
    const axiosInstance = axios.create({
        baseURL: baseURL,
    })

    const findPin = () => {
        try {
            // fetch(`${baseURL}api/iot_tool`)
            //     .then(response => response.json())
            //     .then(json => console.log(json));
            axios.get('https://jsonplaceholder.typicode.com/users').then(response => console.log(response));
        } catch (error) {
            console.log(error);
        }
    };

    return {
        findPin,
    };
};


export default useAxios;
