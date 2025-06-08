import { APP_COLOR } from '@/utils/constant';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, LayoutChangeEvent, Pressable } from "react-native";
import { currencyFormatter } from '@/utils/api';
import { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface IProps {
    infoHeight: number;
    product: IProductId | null;
    onHeightMeasured?: (height: number) => void; // Callback để gửi chiều cao lên
}

const Info = (props: IProps) => {
    const { infoHeight, product, onHeightMeasured } = props;

    // Trạng thái hiển thị/ẩn product?.attributes
    const [showDetails, setShowDetails] = useState(false);

    // Animation cho phần product?.attributes
    const animationValue = useSharedValue(0); // Giá trị animation: 0 (ẩn) -> 1 (hiển thị)

    // Animated style cho hiệu ứng fade-in/out và slide-in/out
    const animatedDetailsStyle = useAnimatedStyle(() => {
        const opacity = withTiming(showDetails ? 1 : 0, { duration: 300 });
        const translateY = withTiming(showDetails ? 0 : -10, { duration: 300 }); // Slide nhẹ
        const height = showDetails ? 'auto' : 0; // Chiều cao 0 khi ẩn, auto khi hiện
        return {
            opacity,
            transform: [{ translateY }],
            height, // Điều chỉnh chiều cao dựa trên trạng thái
            overflow: 'hidden', // Ngăn nội dung tràn ra ngoài khi ẩn
        };
    });

    // Đo chiều cao của Info
    const onLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        if (onHeightMeasured && height > 0) {
            onHeightMeasured(height);
        }
    };

    return (
        <View style={{ backgroundColor: "#fff" }} onLayout={onLayout}>
            <View style={{ height: 60, margin: 10 }}>
                <Text style={{ lineHeight: 30 }} numberOfLines={1} ellipsizeMode='tail'>
                    <View>
                        <Text style={{ color: "white", backgroundColor: APP_COLOR.ORANGE, padding: 0, margin: 0 }}>{`  Yêu thích  `}</Text>
                    </View>
                    <Text>{` `}</Text>
                    <Ionicons name="shield-checkmark" size={20} color="orange" />
                    <Text>{` `}</Text>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>{product?.name}</Text>
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={{
                        color: APP_COLOR.ORANGE,
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginRight: 10
                    }}>
                        {currencyFormatter(product?.price)}
                    </Text>
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
                            <Text>Giao hàng tiêu chuẩn</Text>
                        </View>
                    </View>
                    <View style={{ gap: 5 }}>
                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                            <AntDesign name="gift" size={12} color={APP_COLOR.ORANGE} />
                            <Text>Giảm 20% tối đa 55k cho đơn từ 200k</Text>
                        </View>
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

                {/* Nút "Xem chi tiết" */}
                <Pressable
                    onPress={() => setShowDetails(!showDetails)}
                    style={{ flexDirection: "row", justifyContent: "space-between", padding: 5 }}
                >
                    <Text>Chi Tiết sản phẩm</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: APP_COLOR.ORANGE }}>{showDetails ? "Ẩn chi tiết" : "Xem chi tiết"}</Text>
                        <AntDesign
                            name={showDetails ? "up" : "down"}
                            size={16}
                            color={APP_COLOR.ORANGE}
                            style={{ marginLeft: 5 }}
                        />
                    </View>
                </Pressable>

                {/* Phần product?.attributes với animation */}
                <Animated.View style={[animatedDetailsStyle, { marginHorizontal: 10, marginVertical: 0 }]}>
                    {product?.attributes && product.attributes.length > 0 && (
                        <View>
                            {product.attributes.map((attr, index) => (
                                <View key={attr.id} style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', marginRight: 10 }}>{attr.name}: </Text>
                                    <Text>{attr.value}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </Animated.View>

                <View style={{ height: 1, backgroundColor: "#e9e9e9" }}></View>

                <Text style={{ padding: 10 }}>Mô tả sản phẩm</Text>
                <Text style={{ padding: 10 }}>{product?.description}</Text>

            </View>
        </View>
    );
};

export default Info;