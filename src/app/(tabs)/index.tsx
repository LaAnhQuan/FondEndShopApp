import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import p1 from "@/assets/icons/giahoi.png";
import React, { useEffect, useState } from "react";
import { currencyFormatter, getURLBaseBackEnd, productsAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";

const { width } = Dimensions.get("window");
const SPACING = 8;
const ITEM_WIDTH = (width - SPACING * 3) / 2;
const ITEM_HEIGHT = ITEM_WIDTH + 80;



const HomeTab = () => {

    const [product, setProduct] = useState<IProduct[]>([]);

    React.useEffect(() => {
        // Fetch image URLs from the backend
        const fetchProduct = async () => {
            try {
                const res = await productsAPI();  // Thay thế URL backend của bạn tại đây
                if (res.data) {
                    // const imageUrls = res.data.map((item: { image: string }) => item.image);
                    setProduct(res.data);

                }


            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchProduct();
    }, []);


    // console.log("check product", product)


    return (
        <CustomFlatList
            data={product}
            numColumns={2}
            style={styles.list}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Image
                        source={{ uri: `${getURLBaseBackEnd()}/images/${item.image}` }}
                        style={styles.image}
                    />
                    <View style={styles.info}>
                        <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                        <Text style={(styles.price)}>
                            {currencyFormatter(item.price)}
                        </Text>
                    </View>
                </View>
            )}
            StickyElementComponent={<SearchHome />}
            TopListElementComponent={<TopListHome />}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: SPACING,
    },
    item: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: SPACING / 2,
        borderRadius: 5,
        backgroundColor: "#fff",
        overflow: "hidden",
        elevation: 2, // đổ bóng nhẹ (Android)
        shadowColor: "#000", // đổ bóng nhẹ (iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: "100%",
        height: "66%",
        resizeMode: "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#eee",

    },
    info: {
        flex: 1,
        padding: 8,
        justifyContent: "center",
    },
    title: {
        fontSize: 13,
        color: "#333",
    },
    price: {
        marginTop: 4,
        color: APP_COLOR.ORANGE,
        fontWeight: "bold",
    },
});

export default HomeTab;
