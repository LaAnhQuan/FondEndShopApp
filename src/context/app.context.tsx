import { createContext, useContext, useState } from "react";

interface AppContextType {
    theme: string;
    setTheme: (v: string) => void;
    appState: ILogin | null;
    setAppState: (v: any) => void;
    product: IProductId | null;
    setProduct: (v: any) => void;
    cart: ICartDetail | null;
    setCart: (v: any) => void;
}
const AppContext = createContext<AppContextType | null>(null);

interface IProps {
    children: React.ReactNode
}

export const useCurrentApp = () => {
    const currentTheme = useContext(AppContext);

    if (!currentTheme) {
        throw new Error(
            "useCurrentApp has to be used within <AppContext.Provider>"
        );
    }

    return currentTheme;
};

const AppProvider = (props: IProps) => {
    const [theme, setTheme] = useState<string>("eric-light");
    const [appState, setAppState] = useState<ILogin | null>(null);
    const [product, setProduct] = useState<IProductId | null>(null);
    const [cart, setCart] = useState<ICart | null>(null);
    return (
        <AppContext.Provider value={{
            theme, setTheme,
            product, setProduct,
            appState, setAppState,
            cart, setCart
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;