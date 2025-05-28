import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { productsAPI } from "@/utils/api";
import { SafeAreaView } from "react-native-safe-area-context";
import CollectionHome from "@/components/home/collection.home";
import ContentLoader, { Rect } from "react-content-loader/native"

const { height: sHeight, width: sWidth } = Dimensions.get('window');
const SPACING = 6;


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

    return (
        <SafeAreaView>

            <CustomFlatList
                data={product}
                numColumns={2}
                style={styles.list}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: "#e9e9e9", flex: 1 }}>
                        <CollectionHome
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            oldprice={item.oldprice}
                            image={item.image}
                            rating={item.rating}
                            total_sold={item.total_sold}
                        />
                    </View>
                )}
                StickyElementComponent={<SearchHome />}
                TopListElementComponent={<TopListHome />}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: SPACING,
    },
});

export default HomeTab;
