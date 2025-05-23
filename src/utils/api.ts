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

export const productsAPI = () => {
    const url = `/products`;
    return axios.get<IBackendRes<IProduct[]>>(url);
}


export const currencyFormatter = (value: any) => {
    const options = {
        significantDigits: 2,
        thousandsSeparator: '.',
        decimalSeparator: ',',
        symbol: 'đ'
    }

    if (typeof value !== 'number') value = 0.0
    value = value.toFixed(options.significantDigits)

    const [currency, decimal] = value.split('.')
    return `${currency.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        options.thousandsSeparator
    )}${options.symbol}`
}

