import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BannerHome from "./banner.home";
import { APP_COLOR } from "@/utils/constant";

const styles = StyleSheet.create({
    // topList: {
    //     borderColor: "orange",
    //     borderWidth: 5,
    //     minHeight: 100,
    //     marginBottom: 6,
    //     width: "100%"
    // }
})

const data1 = [
    { key: 1, name: `ShopeeFood Giảm 50%`, source: require("@/assets/icons/shoppefood.png") },
    { key: 2, name: "Mã giảm giá", source: require("@/assets/icons/sale.png") },
    { key: 3, name: "Khách Hàng Thân Thiết", source: require("@/assets/icons/thanthiet.png") },
    { key: 4, name: "Hàng chọn giá hời", source: require("@/assets/icons/giahoi.png") },
    { key: 5, name: "Shoppe Style Voucher 30%", source: require("@/assets/icons/shoppevoucher.png") },
    { key: 6, name: "Shoppe Mall", source: require("@/assets/icons/shoppeemall.png") },
    { key: 7, name: "Săn Ngay 100.000 Xu", source: require("@/assets/icons/sanxu.png") },
    { key: 8, name: "Xem thêm", source: require("@/assets/icons/xemthem.png") },
    { key: 9, name: "Tiềm Năng", source: require("@/assets/icons/Khachhangthanthiet.png") },
]

// const data1 = Array(20).fill(1);
const TopListHome = () => {
    // https://stackoverflow.com/questions/45939823/react-native-horizontal-flatlist-with-multiple-rows
    return (
        <View >
            <BannerHome />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
                style={{ marginVertical: 15 }}
            >
                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={Math.ceil(data1.length)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={data1}
                    renderItem={({ item, index }) => {
                        return (
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
                                        borderColor: APP_COLOR.ORANGE
                                    }}
                                />
                                <Text style={{ textAlign: "center" }}>
                                    {item.name}
                                </Text>
                            </View>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}

export default TopListHome;