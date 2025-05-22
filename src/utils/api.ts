import axios from "@/utils/axios.customize";
import { Platform } from "react-native";

export const registerAPI = (email: string, password: string, name: string, phone: string) => {

    const url = `/users/register`
    return axios.post<IBackendRes<IRegister>>(url, { email, password, name, phone });
}


export const loginAPI = (email: string, password: string, phone: string) => {
    const url = `/users/login`;
    return axios.post<IBackendRes<ILogin>>(url, { email, password, phone });
}

export const bannerAPI = () => {
    const url = `/banners`;
    return axios.get<IBackendRes<IBanner[]>>(url);
}

export const getURLBaseBackEnd = () => {
    const backend = Platform.OS === 'android'
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;
    return backend;
}