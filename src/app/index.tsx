import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useCallback, useState } from "react";
import { getAccountAPI } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { APP_FONT } from "@/utils/constant";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootPage = () => {
    const { setAppState } = useCurrentApp();
    const [state, setState] = useState<any>();

    const [fontsLoaded] = useFonts({
        [APP_FONT]: require('@/assets/font/OpenSans-Regular.ttf'),
    });

    const prepare = useCallback(async () => {
        try {
            // Nếu font chưa load xong, chưa tiếp tục
            if (!fontsLoaded) return;

            // Gọi API lấy user
            const res = await getAccountAPI();
            if (res.data) {
                setAppState({
                    user: res.data,
                    token: await AsyncStorage.getItem("token"),
                });
                router.replace("/(tabs)");
            } else {
                router.replace("/(auth)/welcome");
            }
        } catch (e) {
            setState(() => {
                throw new Error('Không thể kết nối tới API Backend...');
            });
        } finally {
            // Hide splash screen sau khi xong
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        prepare();
    }, [prepare]);

    return null; // Không return gì vì chỉ redirect
};

export default RootPage;
