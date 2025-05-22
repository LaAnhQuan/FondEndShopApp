export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string | string[];
        statusCode?: number | string;
        data?: T;
    }

    interface IRegister {
        id: number,
        name: string,
        role: number,
        phone: string
    }

    interface ILogin {
        id: number,
        email: string,
        name: string,
        role: number,
        avatar: string,
        phone: string
    }
}

