import axios from "@/utils/axios.customize";
import { Platform } from "react-native";

export const registerAPI = (email: string, password: string, name: string, phone: string) => {

    const url = `/users/register`
    return axios.post(url, { email, password, name, phone });
}