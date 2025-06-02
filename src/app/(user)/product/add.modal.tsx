import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { AccessibilityInfo, AppState, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import ItemSingle from "@/components/example/product/order/item.singer";
import React, { useState } from "react";
import { addCartProductAPI } from "@/utils/api";
import Toast from "react-native-root-toast";

const AddModalPage = () => {

    const [quantity, setQuantity] = useState<number>(1);
    const [selectedVariant, setSelectedVariant] = useState<IVariants | null>(null);

    const { cart } = useCurrentApp();
    const title = "Thêm vào giỏ hàng"
    const handlePressItem = (action: "MINUS" | "PLUS") => {
        if (action === "MINUS" && quantity === 1) return;
        const total = action === "MINUS" ? -1 : 1;
        setQuantity((pevQuantity: number) => pevQuantity + total)
    };

    // console.log("check selectedVariant", selectedVariant)

    const handleAddCart = async () => {
        const res = await addCartProductAPI(cart?.id as number, quantity, selectedVariant?.id as number)
        if (res.data) {
            const m = Array.isArray(res.message)
                ? res.message[0] : res.message;
            let toast = Toast.show(m, {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1,
                position: -180,
                animation: true
            });
        }
        else {
            const m = Array.isArray(res.message)
                ? res.message[0] : res.message;
            let toast = Toast.show(m, {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 1,
                position: -180,
                animation: true
            });
        }
    }
    return (
        <>
            <ItemSingle
                quantity={quantity}
                handlePressItem={handlePressItem}
                handleAddCart={handleAddCart}
                title={title}
                onVariantChange={setSelectedVariant}
            />
        </>
    );
};

export default AddModalPage;
