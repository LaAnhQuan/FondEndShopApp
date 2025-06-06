import axios from "@/utils/axios.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const registerAPI = (email: string, password: string, name: string, phone: string) => {

    const url = `/users/register`
    return axios.post<IBackendRes<IRegister>>(url, { email, password, name, phone });
}


export const loginAPI = (email: string, password: string, phone: string) => {
    const url = `/users/login`;
    return axios.post<IBackendRes<ILogin>>(url, { email, password, phone });
}

export const getAccountAPI = () => {
    const url = `/users`;
    return axios.get<IBackendRes<ILogin>>(url);
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

export const productsAPI = (query: string) => {
    const url = `/products?${query}`;
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

export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys!, (error, stores) => {
            let asyncStorage: any = {}
            stores?.map((result, i, store) => {
                asyncStorage[store[i][0]] = store[i][1]
            });
            console.log(JSON.stringify(asyncStorage, null, 2));
        });
    });
};

export const getProductByIdAPI = (id: number) => {
    const url = `/products/${id}`;
    return axios.get<IBackendRes<IProductId>>(url, {
        headers: { delay: 1500 }
    });
}

export const createCartAPI = (user_id: number) => {
    const url = `/carts`;
    return axios.post<IBackendRes<ICart>>(url, { user_id });
}

export const getCartByIdAPI = (id: number) => {
    const url = `/carts/${id}`;
    return axios.get<IBackendRes<ICartDetail>>(url);
}


export const addCartProductAPI = (cart_id: number, quantity: number, product_variant_id: number) => {
    const url = `/cart-items`;
    return axios.post<IBackendRes<IAddCart>>(url, { cart_id, quantity, product_variant_id });
}

export const checkOutCartAPI = (cart_id: number, note: string, phone: string, address: string) => {
    const url = `/carts/checkout`;
    return axios.post<IBackendRes<ICart>>(url, { cart_id, note, phone, address });
}

export const updateProfileUserAPI = (id: number, name: string, phone: string) => {
    const url = `/users/${id}/profile`;
    return axios.put<IBackendRes<ILogin>>(url, { id, name, phone });
}

export const updateUserPasswordAPI = (
    id: number,
    old_password: string,
    new_password: string,
    confirm_new_password: string
) => {
    const url = `/users/${id}/password`;
    return axios.put<IBackendRes<ILogin>>(url, { id, old_password, new_password, confirm_new_password });
}

export const getRestaurantByName = (name: string) => {
    const url = `/products?search=${name}&page=1&pageSize=10`;
    return axios.get<IBackendRes<IProduct[]>>(url);
}
