import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { APP_COLOR, APP_FONT } from "@/utils/constant";

const styles = StyleSheet.create({

})

const data1 = [
    { key: 1, name: `Máy tính & Laptop`, source: require("@/assets/icons/laptop.png") },
    { key: 2, name: "Máy ảnh - Máy quay phim", source: require("@/assets/icons/camera.png") },
    { key: 3, name: "Điện thoại và phụ kiện", source: require("@/assets/icons/phone.png") },
    { key: 4, name: "Thiết bị điện tử", source: require("@/assets/icons/laptop&pc.png") },
    { key: 5, name: "Đồng hồ", source: require("@/assets/icons/watch.png") },
    // { key: 6, name: "Shoppe Mall", source: require("@/assets/icons/shoppeemall.png") },
    // { key: 7, name: "Săn Ngay 100.000 Xu", source: require("@/assets/icons/sanxu.png") },
    // { key: 8, name: "Xem thêm", source: require("@/assets/icons/xemthem.png") },
    // { key: 9, name: "Tiềm Năng", source: require("@/assets/icons/Khachhangthanthiet.png") },
]

// const data1 = Array(20).fill(1);
const TopListMall = () => {
    // https://stackoverflow.com/questions/45939823/react-native-horizontal-flatlist-with-multiple-rows
    return (
        <View style={{ backgroundColor: "white" }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 8
            }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Danh mục</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 13, color: "#B0B0B0" }}> Tìm hiểu ngay </Text>
                </View>
            </View>
            <FlatList
                horizontal
                data={data1}
                keyExtractor={(item) => item.key.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{
                        padding: 5,
                        width: 100,
                        alignItems: "center",
                    }}>
                        <Image
                            source={item.source}
                            style={{
                                height: 35, width: 35,
                                borderRadius: 10,
                                borderWidth: 1,
                                backgroundColor: APP_COLOR.GREY
                            }}
                        />
                        <Text style={{
                            textAlign: "center",
                            // fontFamily: APP_FONT
                        }}>
                            {item.name}</Text>
                    </View>
                )}
            />

        </View>
    )
}

export default TopListMall;