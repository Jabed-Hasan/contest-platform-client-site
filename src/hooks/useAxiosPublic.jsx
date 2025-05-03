import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://b8a12-server-side-jabed-hasan.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;