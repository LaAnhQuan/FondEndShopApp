import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
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
        const newTotal = cart?.cart_items?.reduce((sum, item) => {
            return sum + item?.product_variant_values?.price * item.quantity;
        }, 0);
        setTotal(newTotal as number);
    }, [cart]);

    useEffect(() => {
        const newTotal = cart?.cart_items?.reduce((sum, item) => {
            const newPrice = item?.product_variant_values?.price;
            const oldPrice = item?.product_variant_values?.old_price || 0;
            let price = 0;
            if (oldPrice === 0) {
                price = 0
            }
            else {
                price = (oldPrice - newPrice) * item.quantity;
            }

            return sum + price;
        }, 0);
        setSale(newTotal as number);
    }, [cart]);


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


