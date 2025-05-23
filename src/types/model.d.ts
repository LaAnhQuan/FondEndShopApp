export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string | string[];
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

    interface IBanner {
        id: number,
        name: string,
        image: any,
        status: number
    }

    interface IProduct {
        id: number,
        name: string,
        price: number,
        oldprice: number,
        image: any,
        total_sold: number,
        rating: number,
        brand_id: number,
        category_id: number
    }
}

