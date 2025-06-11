import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { View, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { createCartAPI, getCartByIdAPI, productsAPI } from "@/utils/api";
import { SafeAreaView } from "react-native-safe-area-context";
import CollectionHome from "@/components/home/collection.home";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";

const SPACING = 6;

const HomeTab = () => {
    const [mounted, setMounted] = useState(false);
    const [product, setProduct] = useState<IProduct[]>([]);
    const { cart, setCart, appState } = useCurrentApp();
    const userId = appState?.user?.id;

    const hasCheckedCart = useRef(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(4);


    useEffect(() => {
        setMounted(true);
    }, []);


    useEffect(() => {
        if (!mounted) return;
        setTimeout(() => {
            router.push("/(auth)/popup.sale")
        }, 1000)
    }, [mounted])


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productsAPI(`page=1&pageSize=${pageSize}`);
                if (res.data) {
                    setProduct(res.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProduct();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await productsAPI(`page=${currentPage}&pageSize=${pageSize}`);
            if (res.data) {
                setProduct(prev => [...prev, ...res?.data as any])
            }
        }
        if (currentPage > 1) {
            fetchData();
        }
    }, [currentPage])

    const handleEndReached = async () => {
        setCurrentPage(prev => prev + 1);
    }

    useEffect(() => {
        if (!userId) return;

        // Nếu cart bị xóa (null hoặc undefined), reset flag để có thể gọi lại
        if (!cart) {
            hasCheckedCart.current = false;
        }

        if (!hasCheckedCart.current) {
            const checkAndCreateCart = async () => {
                try {
                    const res = await getCartByIdAPI(userId);
                    if (res.data) {
                        setCart(res.data);
                    } else {
                        const createRes = await createCartAPI(userId);
                        if (createRes.data) {
                            setCart(createRes.data);
                        }
                    }
                    hasCheckedCart.current = true; // Đánh dấu đã kiểm tra tạo giỏ hàng
                } catch (err) {
                    console.error("Lỗi khi kiểm tra/tạo giỏ hàng:", err);
                }
            };

            checkAndCreateCart();
        }
    }, [userId, cart, setCart]);


    return (
        <SafeAreaView>
            <CustomFlatList
                onEndReachedThreshold={0.5}
                onEndReached={handleEndReached}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
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
