import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import { View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchMall from "@/components/mall/search.mall";
import TopListMall from "@/components/mall/top.list.mall";
import CollectionMall from "@/components/mall/collection.mall";


const data = [
    {
        key: 1,
        name: "Laptop mỏng nhẹ năng động sáng tạo",
        description: "Gợi ý các lap top đỉnh cao 5*",
        refAPI: "Laptop"
    },
    {
        key: 2,
        name: "Top đồng hồ thông minh nhất trái đất",
        description: "Đồng hộ xịn hè cực chill",
        refAPI: "Dong ho thong minh"
    },
    {
        key: 3,
        name: "Điện thoại thông minh nhất mùa hè",
        description: "Xiaomi, Samsung, Iphone... Freeship.",
        refAPI: "Dien thoai thong minh"
    },
    {
        key: 4,
        name: "Máy tính bảng siêu to khổng lồ",
        description: "Thỏa thích xem world cup",
        refAPI: "may tinh bang"
    }
]

const MallPage = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomFlatList
                data={data}
                style={styles.list}
                renderItem={({ item }) => (
                    <CollectionMall
                        name={item.name}
                        description={item.description}
                        refAPI={item.refAPI}
                    />
                )} StickyElementComponent={<SearchMall />}
                TopListElementComponent={<TopListMall />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#ecf0f1",
        flex: 1,
        justifyContent: "center",
        overflow: "hidden",
        padding: 8
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
        borderWidth: 1,
        height: 250,
        marginBottom: 10,
        width: "100%"
    },
    list: {
        overflow: "hidden"
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


export default MallPage;
