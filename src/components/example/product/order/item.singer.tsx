import { currencyFormatter, getURLBaseBackEnd, } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { useEffect, useState } from "react";


interface IProps {
    // showMinus : boolean;
    handlePressItem: any;
    quantity: number,
    title: string,
    handleAddCart: any
    onVariantChange: any
}

const ItemSingle = (props: IProps) => {
    const { quantity, handlePressItem, title, handleAddCart, onVariantChange } = props
    const showMinus = true;
    const { product } = useCurrentApp();
    const variants = product?.variants || [];

    // Lấy danh sách thuộc tính từ biến thể
    const extractAttributesFromVariants = (variants: IVariants[]) => {
        const attributesMap: Record<string, Set<string>> = {};

        variants.forEach((variant) => {
            variant.values.forEach(({ name, value }) => {
                if (!attributesMap[name]) {
                    attributesMap[name] = new Set();
                }
                attributesMap[name].add(value);
            });
        });

        const result: Record<string, string[]> = {};
        for (const attr in attributesMap) {
            result[attr] = Array.from(attributesMap[attr]);
        }
        return result;
    };


    const attributeMap = extractAttributesFromVariants(variants);
    const attributeKeys = Object.keys(attributeMap);

    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string | null>>({});


    const handleSelect = (attrName: string, value: string) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [attrName]: prev[attrName] === value ? null : value,
        }));
    };


    const filteredVariant =
        Object.keys(selectedAttributes).length < attributeKeys.length ||
            Object.values(selectedAttributes).some((val) => !val)
            ? null
            : variants.find((variant) =>
                Object.entries(selectedAttributes).every(([key, val]) =>
                    variant.values.some((v) => v.name === key && v.value === val)
                )
            );

    useEffect(() => {
        onVariantChange(filteredVariant);
    }, [filteredVariant]);

    return (
        <Animated.View
            entering={FadeIn}
            style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: "#00000040",
            }}
        >
            <Pressable onPress={() => router.back()} style={StyleSheet.absoluteFill} />

            <Animated.View
                entering={SlideInDown}
                style={{
                    height: "80%",
                    width: "100%",
                    backgroundColor: "white",
                }}
            >
                <View>

                    <View
                        style={{
                            backgroundColor: "white",
                            gap: 10,
                            flexDirection: "row",
                            padding: 10,
                            alignItems: "flex-start", // Cho các phần con bắt đầu từ top
                        }}
                    >
                        <View>
                            <Image
                                style={{ height: 110, width: 110 }}
                                source={{ uri: `${getURLBaseBackEnd()}/images/${product?.image}` }}
                            />
                        </View>

                        <View style={{ flex: 1, gap: 10, justifyContent: "flex-end" }}>
                            <View><Text>{product?.name}</Text></View>
                            {filteredVariant ?

                                <View>
                                    <Text style={{ color: APP_COLOR.ORANGE, fontSize: 18 }}>
                                        {currencyFormatter(filteredVariant?.price)}
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        Kho : {filteredVariant.stock}
                                    </Text>
                                </View>
                                :
                                <View>
                                    <Text style={{ color: APP_COLOR.ORANGE, fontSize: 18 }}>
                                        {currencyFormatter(product?.price)}
                                    </Text>
                                </View>
                            }
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                padding: 10,
                                alignItems: "flex-start", // Đặt X lên trên
                            }}
                        >
                            <AntDesign
                                onPress={() => router.back()}
                                name="close"
                                size={24}
                                color="grey"
                            />
                        </View>
                    </View>

                </View>


                {/* LỰA CHỌN THUỘC TÍNH */}
                <ScrollView style={{ flex: 1 }}>
                    {attributeKeys.map((attr) => (
                        <View key={attr}>
                            <View
                                style={{
                                    borderColor: APP_COLOR.GREY,
                                    borderWidth: 0.5,
                                }}
                            >
                            </View>

                            <Text style={{ padding: 5 }}>{attr}</Text>


                            <View
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: 10,
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                }}
                            >
                                {attributeMap[attr].map((val) => {
                                    const isSelected = selectedAttributes[attr] === val;

                                    return (
                                        <Pressable
                                            key={val}
                                            onPress={() => handleSelect(attr, val)}
                                            style={{
                                                paddingVertical: 6,
                                                paddingHorizontal: 12,
                                                backgroundColor: isSelected ? "white" : "#f2f2f2", // nền luôn xám nhạt
                                                borderRadius: 4,
                                                borderWidth: isSelected ? 2 : 1,
                                                borderColor: isSelected ? APP_COLOR.ORANGE : "#f2f2f2", // viền vàng nếu được chọn
                                            }}
                                        >
                                            <Text style={{ color: isSelected ? APP_COLOR.ORANGE : "#000" }}>
                                                {val}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>
                    ))}

                    <View style={{
                        borderWidth: 0.5,
                        borderColor: "#ccc",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10
                    }} >
                        <View>
                            <Text>Số lượng</Text>
                        </View>
                        <View
                            style={{
                                alignItems: "center",
                                flexDirection: "row", gap: 3
                            }}
                        >
                            <Pressable
                                disabled={!filteredVariant}
                                style={{ flexDirection: "row", opacity: filteredVariant ? 1 : 0.5 }}
                            >
                                <Pressable
                                    disabled={!filteredVariant}
                                    style={({ pressed }) => ({
                                        opacity: pressed === true ? 0.5 : 1,
                                        alignSelf: "flex-start", //fit-content
                                    })}
                                    onPress={() => handlePressItem("MINUS")}
                                >
                                    <AntDesign name="minussquareo"
                                        size={24} color={APP_COLOR.ORANGE}
                                    />
                                </Pressable>
                                <Text style={{
                                    minWidth: 25,
                                    textAlign: "center"
                                }}>
                                    {quantity}
                                </Text>
                                <Pressable
                                    disabled={!filteredVariant}
                                    style={({ pressed }) => ({
                                        opacity: pressed === true ? 0.5 : 1,
                                        alignSelf: "flex-start", //fit-content
                                    })}
                                    onPress={() => handlePressItem("PLUS")}>
                                    <AntDesign
                                        name="plussquare"
                                        size={24}
                                        color={APP_COLOR.ORANGE}
                                    />
                                </Pressable>
                            </Pressable>
                        </View>


                    </View>
                </ScrollView>


                {/* NÚT THÊM GIỎ HÀNG */}
                <View
                    style={{
                        marginBottom: 20,
                        marginTop: 10,
                        marginHorizontal: 10,
                        justifyContent: "flex-end",
                    }}
                >
                    <Pressable
                        disabled={!filteredVariant}
                        onPress={() => handleAddCart()}
                        style={({ pressed }) => ({
                            opacity: pressed || !filteredVariant ? 0.5 : 1,
                            padding: 10,
                            backgroundColor: APP_COLOR.ORANGE,
                            borderRadius: 3,
                        })}
                    >
                        <Text style={{ textAlign: "center", color: "white" }}>
                            {title}
                        </Text>
                    </Pressable>
                </View>

            </Animated.View>
        </Animated.View>

    )
}

export default ItemSingle;