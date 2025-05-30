import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import ItemSingle from "@/components/example/product/order/item.singer";
import React, { useState } from "react";

const CreateModalPage = () => {


    return (
        <>
            <ItemSingle />
        </>
    );
};

export default CreateModalPage;
