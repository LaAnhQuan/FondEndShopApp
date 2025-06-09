export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string | string[];
        data?: T;
        currentPage?: number;
        totalPages?: number;
        total?: number;
    }

    interface IRegister {
        id: number,
        name: string,
        role: number,
        phone: string
    }

    interface ILogin {
        user: {
            id: number,
            email: string,
            name: string,
            role: number,
            avatar: any,
            phone: string
        };
        token: string;
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
        category_id: number,

    }

    interface IProductId {
        id: number,
        name: string,
        price: number,
        oldprice: number,
        description: string
        rating: number,
        total_ratings: number,
        total_sold: number,
        brand_id: number,
        category_id: number,
        image: any,
        updated_at: Date,
        product_images: IImage[],
        attributes: IAttributes[],
        variants: IVariants[]

    }
    interface IImage {
        image: any
    }

    interface IAttributes {
        id: number,
        name: string,
        value: string
    }

    interface IVariants {
        id: number,
        price: number,
        old_price: number,
        stock: number,
        sku: string,
        values: IValueVariant[]
    }

    interface IValueVariant {
        id: number,
        name: string,
        value: string,
        image: any
    }

    interface ICart {
        id: number,
        user_id: number,
    }

    interface ICartDetail {
        id: number,
        user_id: number,
        cart_items: ICartItem[]
    }
    interface ICartItem {
        id: number,
        cart_id: number,
        product_variant_id: number,
        product_id: number | null,
        quantity: number,
        product_variant_values: IProductVariantValue
    }

    interface IProductVariantValue {
        id: number,
        product_id: number,
        price: number,
        old_price: null | number,
        stock: number | null,
        sku: string | null,
        product: IProduct
    }

    interface IAddCart {
        id: number,
        cart_id: number,
        product_variant_id: number | null,
        product_id: number | null,
        quantity: number,
    }

    interface IOrderHistory {
        id: number
        user_id: number,
        status: number,
        note: string,
        phone: string,
        address: string,
        total: number,
        created_at: string,
    }

}

