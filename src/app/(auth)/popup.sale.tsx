import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native"
import saleoffImg from '@/assets/saleoff/a-flat-sticker-of-garage-sale-vector.jpg';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { APP_COLOR } from "@/utils/constant";

const PopupSalePage = () => {

    return (
        <Pressable
            style={{
                flex: 1,
            }}>
            <Animated.View
                entering={FadeIn}
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}>

                <Animated.View
                    entering={SlideInDown}
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",

                    }}>
                    <Pressable
                        onPress={() => router.back()}
                        style={{
                            position: "absolute",
                            top: "27%",
                            right: "10%",
                            // backgroundColor: "#ccc",
                            height: 26,
                            width: 26,
                            borderRadius: 13,
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 10,
                        }}
                    >
                        <AntDesign
                            name="close"
                            size={22}
                            color="grey"
                        />
                    </Pressable>

                    <Image
                        source={saleoffImg}
                        style={{
                            height: 400,
                            width: 350
                        }}
                    />
                    <Pressable
                        style={({ pressed }) => ({
                            backgroundColor: pressed === false ? "#f04054" : "#d85b6a",
                            paddingVertical: 5,
                            paddingHorizontal: 35,
                            borderRadius: 15,
                            position: "relative",
                            top: -35,
                        })}
                    >
                        <Text style={{
                            color: "white",
                            fontWeight: "600"
                        }}>ĐẶT NGAY</Text>
                    </Pressable>

                </Animated.View>
            </Animated.View>
        </Pressable>
    )
}

export default PopupSalePage;