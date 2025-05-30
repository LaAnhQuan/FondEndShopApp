import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { AccessibilityInfo, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import ItemSingle from "@/components/example/product/order/item.singer";
import React, { useState } from "react";

const CreateModalPage = () => {


    const [quantity, setQuantity] = useState<number>(1);
    const title = "Mua ngay"
    const handlePressItem = (action: "MINUS" | "PLUS") => {
        if (action === "MINUS" && quantity === 1) return;
        const total = action === "MINUS" ? -1 : 1;
        setQuantity((pevQuantity: number) => pevQuantity + total)
    };

    const handleAddCart = () => {
        alert("me")
    }
    return (
        <>
            <ItemSingle
                quantity={quantity}
                handlePressItem={handlePressItem}
                title={title}
                handleAddCart={handleAddCart}
            />
        </>
    );
};

export default CreateModalPage;
