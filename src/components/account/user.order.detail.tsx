import { useCurrentApp } from "@/context/app.context";
import { getOrderHistoryDetailAPI, getURLBaseBackEnd } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter, dateTimeFormatter, getStatusName } from "@/utils/format";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native"
import { Entypo } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";

const UserOrderDetail = () => {
    const { appState } = useCurrentApp();
    const { id } = useLocalSearchParams();
    const order_id = parseInt(Array.isArray(id) ? id[0] : id, 10);
    const [orderDetailHistory, setOrderDetailHistory] = useState<IOrderDetailHistory[]>([]);
    useEffect(() => {
        const fetchOrderHistory = async () => {
            const res = await getOrderHistoryDetailAPI(order_id);
            if (res.data) {
                setOrderDetailHistory(res.data)
            }
        }
        fetchOrderHistory();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                {orderDetailHistory.map((item, index) => {
                    return (
                        <View key={index}>
                            <View
                                style={{
                                    padding: 10,
                                    flexDirection: "row",
                                    gap: 10
                                }}
                            >
                                <Image
                                    source={{ uri: `${getURLBaseBackEnd()}/images/${item.product_variant_values?.product.image}` }}
                                    style={{ height: 100, width: 100 }}
                                />
                                <View style={{ gap: 10 }}>
                                    <Text>{item.product_variant_values?.product.name}</Text>
                                    <Text>Số lượng : {item.quantity}</Text>
                                    <Text>Giá tiền : {currencyFormatter(item.price)}</Text>
                                    <Text>Ngày mua: {dateTimeFormatter(item.created_at)}</Text>
                                </View>
                            </View>
                            <View style={{ height: 10, backgroundColor: "#eee" }}></View>
                        </View>
                    )
                })}
            </ScrollView>
        </View >

    )
}

export default UserOrderDetail;