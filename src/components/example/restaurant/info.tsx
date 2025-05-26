import { APP_COLOR } from '@/utils/constant';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { currencyFormatter } from '@/utils/api';

interface IProps {
    infoHeight: number;
    product: IProductId | null;
}
const Info = (props: IProps) => {
    const { infoHeight, product } = props;

    return (
        <View style={{
            height: infoHeight,
            backgroundColor: "#fff"
        }}>
            <View style={{ height: 60, margin: 10 }}>
                <Text style={{ lineHeight: 30, }} numberOfLines={2} ellipsizeMode='tail'>
                    <View>
                        <Text style={{ color: "white", backgroundColor: APP_COLOR.ORANGE, padding: 0, margin: 0 }}>{`  Yêu thích  `}</Text>
                    </View>
                    <Text>{` `}</Text>
                    <Ionicons name="shield-checkmark" size={20} color="orange" />
                    <Text>{` `}</Text>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>{product?.name}</Text>
                </Text>
                {/* <Text style={{ color: APP_COLOR.ORANGE, fontWeight: "bold", fontSize: 20 }}>{currencyFormatter(product?.price)}</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    {/* Giá hiện tại */}
                    <Text style={{
                        color: APP_COLOR.ORANGE,
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginRight: 10
                    }}>
                        {currencyFormatter(product?.price)}
                    </Text>

                    {/* Giá gốc bị gạch ngang */}
                    <Text style={{
                        color: '#888',
                        fontSize: 16,
                        textDecorationLine: 'line-through'
                    }}>
                        {currencyFormatter(product?.oldprice)}
                    </Text>
                </View>
            </View>

            <View style={{ marginHorizontal: 10, marginBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ gap: 10, flexDirection: "row" }}>
                    <View style={{ gap: 3, flexDirection: "row", alignSelf: "flex-start" }}>
                        <AntDesign name="star" size={15} color="orange" />
                        <AntDesign name="star" size={15} color="orange" />
                        <AntDesign name="star" size={15} color="orange" />
                        <AntDesign name="star" size={15} color="orange" />
                        <AntDesign name="star" size={15} color="orange" />
                    </View>
                    <Text>5.0 (999+ Bình Luận) </Text>
                </View>

                {/* nút like/dislike chuyển qua component sticky.header, do zIndex component nào bé hơn => không pressable được */}
                {/* <MaterialIcons name="favorite" size={20} color="black" />
                <MaterialIcons onPress={() => alert("like")} name="favorite-outline" size={20} color={APP_COLOR.GREY} /> */}
            </View>
            <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>

            <View style={{ justifyContent: "space-between", flex: 1 }}>
                <View style={{ marginHorizontal: 10, marginVertical: 5, gap: 10 }}>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <View style={{
                            height: 50,
                            width: 50,
                            borderRadius: 50 / 2,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(255,192,203,0.3)"
                        }}>
                            <AntDesign name="rocket1" size={25} color={APP_COLOR.ORANGE} />
                        </View>
                        <View>
                            <Text >Giao hàng tiêu chuẩn</Text>
                        </View>
                    </View>
                    <View style={{ gap: 5 }}>
                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                            <AntDesign name="gift" size={12} color={APP_COLOR.ORANGE} />
                            <Text>Giảm 20% tối đa 55k cho đơn từ 200k</Text></View>
                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                            <AntDesign name="gift" size={12} color={APP_COLOR.ORANGE} />
                            <Text>Mã giảm 25% trên sản phẩm</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                            <AntDesign name="gift" size={12} color={APP_COLOR.ORANGE} />
                            <Text>Trả hàng miễn phí 15 ngày</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                            <AntDesign name="gift" size={12} color={APP_COLOR.ORANGE} />
                            <Text>SPayLater: Mua trước trả sau</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
                    <Text >
                        Chi Tiết sản phẩm
                    </Text>
                    <Text>Xem chi tiết</Text>
                </View>

                <View style={{ height: 1, backgroundColor: "#e9e9e9" }}></View>

                <Text style={{ padding: 10 }}>Mô tả sản phẩm</Text>
                <Text style={{ padding: 10 }}>{product?.description}</Text>
                <Text style={{ padding: 10 }}>{product?.description}</Text>
                <Text style={{ padding: 10 }}>{product?.description}</Text>
                <Text style={{ padding: 10 }}>{product?.description}</Text>
                <Text style={{ padding: 10 }}>{product?.description}</Text>
                <Text style={{ padding: 10 }}>{product?.description}</Text>
                <Text style={{ padding: 10 }}>{product?.description}</Text>
                <Text style={{ padding: 10 }}>{product?.description}</Text>
                <Text style={{ padding: 10 }}>{product?.description}</Text>

            </View>



        </View>
    )
}

export default Info;