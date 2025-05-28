import { APP_COLOR } from "@/utils/constant";
import { View, Text, StyleSheet, Image, FlatList, Platform, Pressable, Dimensions } from "react-native"; import demo from "@/assets/demo.jpg";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { currencyFormatter, getURLBaseBackEnd } from "@/utils/api";
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from "react";
import { router } from "expo-router";
import ContentLoader, { Rect } from "react-content-loader/native"
const { height: sHeight, width: sWidth } = Dimensions.get('window');

interface IProps {
    id: number
    image?: any | null;
    name?: string | null;
    price?: number | null;
    oldprice?: number | null;
    total_sold?: number | null;
    rating?: number | null;
}

const { width } = Dimensions.get("window");
const SPACING = 8;
const ITEM_WIDTH = (width - SPACING * 3) / 2;
const ITEM_HEIGHT = ITEM_WIDTH + 80;
const IMAGE_HEIGHT = (ITEM_HEIGHT * 2) / 3; // Chiều cao ảnh chiếm 2/3

const CollectionHome = React.memo((props: IProps) => {
    const { name, image, price, oldprice, total_sold, rating, id } = props;

    return (
        <Pressable
            onPress={() => router.navigate({
                pathname: "/product/[id]",
                params: { id: id }
            })}>
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image source={{ uri: `${getURLBaseBackEnd()}/images/${image}` }} style={styles.img} />
                </View>
                <View style={styles.info}>
                    <View style={styles.title}>
                        <View style={styles.mall}>
                            <Text style={{ color: "white", fontSize: 12 }}>Mall</Text>
                        </View>
                        <Text
                            style={{ fontSize: 15, flex: 1 }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {name}
                        </Text>
                    </View>
                    <View style={styles.block}>
                        <View style={styles.sale}>
                            <MaterialIcons name="video-camera-back" size={15} color={APP_COLOR.ORANGE} />
                            <Text style={{ color: APP_COLOR.ORANGE, fontSize: 12 }}>Flash Sale</Text>
                        </View>
                        <View style={styles.sale}>
                            <AntDesign name="star" size={15} color={APP_COLOR.ORANGE} />
                            <Text style={{ color: APP_COLOR.ORANGE, fontSize: 12 }}>
                                {rating || "4.8"}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.price}>
                        <View>
                            <Text style={{ color: APP_COLOR.ORANGE, fontWeight: "bold", fontSize: 17 }}>{currencyFormatter(price)}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12 }}>
                                Đã bán {total_sold || "4,5k"}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        // padding: 10,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: SPACING / 2,
        borderRadius: 5,
        backgroundColor: "#fff",
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: SPACING,
    },
    image: {
        width: "100%",
        height: IMAGE_HEIGHT,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#eee",
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    info: {
        flex: 1,
        padding: 8,
        justifyContent: "center",
        // alignItems: "center"
    },
    title: {
        flexDirection: "row",
        gap: 7,
        alignItems: "center",
    },
    price: {
        flexDirection: "row",
        // alignItems: "flex-end",
        justifyContent: "space-between",
        alignItems: "center"
    },
    sale: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: APP_COLOR.ORANGE,
        padding: 2,
        borderRadius: 3,
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        gap: 5
    },
    mall: {
        borderWidth: 1,
        borderColor: APP_COLOR.ORANGE,
        // padding: 2,
        borderRadius: 3,
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        gap: 5,
        backgroundColor: APP_COLOR.ORANGE
    },
    block: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 5,

    }
});

export default CollectionHome;
