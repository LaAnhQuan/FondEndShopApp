import { Pressable, Text, View } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter } from "@/utils/api";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from "expo-router";

const StickyFooter = () => {

    return (
        <View style={{
            width: "100%",
            backgroundColor: "white",
            zIndex: 11,
            position: "absolute",
            bottom: 0,
            flexDirection: "row"
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
                borderTopWidth: 1,
                borderTopColor: APP_COLOR.GREY,
                backgroundColor: "#00C4B4"
            }}>
                <View style={{ padding: 10, alignItems: "center", width: "40%" }}>

                    <Pressable onPress={() => alert("cart")}>
                        <FontAwesome6 name="commenting" size={24} color="white" />
                    </Pressable>
                    <Text style={{ color: "white", fontSize: 12 }}>Chat ngay</Text>
                </View>
                <View style={{
                    height: 40, // Tăng chiều cao của đường gạch
                    width: 1,
                    backgroundColor: APP_COLOR.GREY, // Màu của đường gạch
                    marginVertical: 5, // Điều chỉnh khoảng cách trên dưới
                }} />
                <View style={{ width: "60%" }}>
                    <Pressable onPress={() => { router.navigate("/product/add.modal") }}>
                        <View style={{ alignItems: "center" }}>
                            <MaterialIcons name="add-shopping-cart" size={25} color="white" />
                            <Text style={{ color: "white", fontSize: 12 }}>Thêm vào Giỏ hàng</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: APP_COLOR.ORANGE
            }}>
                <Pressable

                    onPress={() => { router.navigate("/product/create.modal") }}
                >
                    <View style={{

                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <Text style={{ color: "white", fontSize: 16 }}>
                            Mua ngay
                        </Text>
                        {/* <Text style={{
                            color: "white",
                            fontSize: 16
                        }}>
                            {currencyFormatter(125000)}
                        </Text> */}
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default StickyFooter;