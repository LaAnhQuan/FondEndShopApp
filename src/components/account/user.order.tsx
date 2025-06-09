import { useCurrentApp } from "@/context/app.context";
import { getOrderHistoryAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter, dateTimeFormatter, getStatusName } from "@/utils/format";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native"
import { Entypo } from '@expo/vector-icons';
import { router } from "expo-router";

const UserOrder = () => {
    const { appState } = useCurrentApp();
    const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);
    useEffect(() => {
        const fetchOrderHistory = async () => {
            const res = await getOrderHistoryAPI(appState?.user.id as number);
            if (res.data) {
                setOrderHistory(res.data)
            }
        }
        fetchOrderHistory();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
            >
                {orderHistory.map((item, index) => {
                    return (
                        <View key={index}>
                            <View
                                style={{
                                    padding: 5,
                                    flexDirection: "row",
                                    gap: 10,
                                    justifyContent: "space-between"
                                }}
                            >
                                <View>
                                    <Text style={{ color: APP_COLOR.ORANGE, fontSize: 15 }}>Mã vận đơn : {item.id}</Text>
                                </View>
                                <View>
                                    <Pressable
                                        onPress={() =>
                                            router.push({
                                                pathname: "/(user)/account/order.detail",
                                                params: { id: String(item.id) }
                                            })
                                        }
                                        style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                                    >

                                        <Text style={{ color: APP_COLOR.ORANGE, fontSize: 15 }}>Xem chi tiết</Text>
                                        <Entypo name="chevron-small-right" size={20} color={APP_COLOR.ORANGE} />
                                    </Pressable>
                                </View>
                            </View>
                            <View
                                style={{
                                    padding: 5,
                                    flexDirection: "row",
                                    gap: 25
                                }}
                            >
                                <View style={{ gap: 5 }}>
                                    <Text>Tổng : {currencyFormatter(item.total)} </Text>
                                    <Text>Trạng thái: {getStatusName(item.status)}</Text>
                                    <Text>Ngày mua: {dateTimeFormatter(item.created_at)}</Text>
                                </View>
                                <View style={{ gap: 5 }}>

                                    <Text>Địa chỉ : {item.address}</Text>
                                    <Text>Note: {item.note}</Text>
                                    <Text>Phone: {item.phone}</Text>

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

export default UserOrder;