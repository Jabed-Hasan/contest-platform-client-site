// hooks/useMenu.js
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: 'menu',
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            const filteredMenu = user ? res.data.filter(item => item.email === user.email) : res.data;
            return filteredMenu;
        },
    });

    return [menu, loading, refetch];
};

export default useMenu;
