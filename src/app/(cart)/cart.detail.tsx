import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderCartDetail from "./header.cart.detail";
import FooterCartDetail from "./footer.cart.detal";
import { useCurrentApp } from "@/context/app.context";
import CollectionCartDetail from "./colllection.cart.detail";
import { useEffect, useState } from "react";


export default function CartDetail() {

    const { cart } = useCurrentApp();
    const [total, setTotal] = useState<number>(0);
    const [sale, setSale] = useState<number>(0);

    useEffect(() => {
        if (!cart?.cart_items) return;

        let total = 0;
        let sale = 0;

        cart.cart_items.forEach(item => {
            const price = item?.product_variant_values?.price;
            const oldPrice = item?.product_variant_values?.old_price || 0;
            const quantity = item.quantity;

            total += price * quantity;

            if (oldPrice > price) {
                sale += (oldPrice - price) * quantity;
            }
        });

        setTotal(total);
        setSale(sale);
    }, [cart?.cart_items]);



    return (
        <SafeAreaView style={styles.container}>
            <CustomFlatList
                data={cart?.cart_items || []}
                style={styles.list}
                renderItem={({ item }) => <CollectionCartDetail item={item} />}
                StickyElementComponent={<HeaderCartDetail />}
            />
            <FooterCartDetail total={total} sale={sale} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ecf0f1",
        flex: 1,
        // justifyContent: "center",
        overflow: "hidden",

    },
    header: {
        borderColor: "red",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    item: {
        borderColor: "green",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    list: {
        // overflow: "hidden",
        // borderColor: "white"
    },
    sticky: {
        backgroundColor: "#2555FF50",
        borderColor: "blue",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    topList: {
        borderColor: "orange",
        borderWidth: 5,
        minHeight: 100,
        marginBottom: 6,
        width: "100%"
    }
});


