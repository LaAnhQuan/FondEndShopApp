import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { useState } from "react";


interface IProps {
    total: number
    sale: number
}
const FooterCartDetail = (props: IProps) => {
    const [checked, setChecked] = useState(false);

    const { total, sale } = props

    return (
        <View style={{
            width: "100%",
            backgroundColor: "white",
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 16,
            paddingHorizontal: 12,
            borderTopWidth: 0.5,
            borderColor: "#ccc",
        }}>

            {/* 1. Custom checkbox */}
            <TouchableOpacity
                onPress={() => setChecked(!checked)}
                style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1.5,
                    borderColor: "#888",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 4,
                }}
            >
                {checked && (
                    <View style={{
                        width: 12,
                        height: 12,
                        backgroundColor: APP_COLOR.ORANGE,
                        borderRadius: 2,
                    }} />
                )}
            </TouchableOpacity>
            <Text style={{ fontSize: 14, marginLeft: 6 }}>Tất cả</Text>

            {/* 2. Tổng tiền và tiết kiệm */}
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 14 }}>
                    Tổng cộng{" "}
                    <Text style={{ fontWeight: "bold" }}>{total}đ</Text>
                </Text>
                <Text style={{ fontSize: 12, color: "#888" }}>Tiết kiệm {sale}</Text>
            </View>

            {/* 3. Nút "Mua hàng" */}
            <Pressable onPress={() => router.navigate("/(cart)/confirm.cart.detail")}>
                <View style={{
                    backgroundColor: APP_COLOR.ORANGE,
                    borderRadius: 4,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Mua hàng</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default FooterCartDetail;
