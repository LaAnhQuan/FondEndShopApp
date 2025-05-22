import { Text, View, StyleSheet, ImageBackground, Image } from "react-native"
import ShareButton from "components/button/share.button";
import { APP_COLOR } from "utils/constant";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import bg from '@/assets/auth/BackGround.png'
import fbLogo from '@/assets/auth/facebook.png'
import ggLogo from '@/assets/auth/google.png'
import Lotus from '@/assets/auth/hinh-nen-hoa-sen-3d-11.png'
import dophin from '@/assets/auth/login and register.png'
import { LinearGradient } from "expo-linear-gradient";
import TextBetweenLine from "@/components/button/text.between.line";
import { Link, Redirect, router } from "expo-router";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    welcomeText: {
        flex: 0.6,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 20
    },
    welcomeBtn: {
        flex: 0.4,
        gap: 20
    },
    heading: {
        fontSize: 40,
        fontWeight: "600",
    },
    body: {
        fontSize: 30,
        color: APP_COLOR.ORANGE,
        marginVertical: 10,
    },
    footer: {

    },

})
const WelcomePage = () => {
    // if (true) {
    //     return (
    //         <Redirect href={"/(auth)/signup"} />
    //     )
    // }
    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={dophin}
        >
            <LinearGradient
                style={{ flex: 1 }}
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                locations={[0.2, 0.8]}

            >
                <View style={styles.container}>
                    <View style={styles.welcomeText}>
                        <Text style={styles.heading}>
                            Welcome to
                        </Text>
                        <Text style={styles.body}>
                            XNOTPRK - HK - ShopApp
                        </Text>
                        <Text style={styles.footer}>
                            Buy every thing, If you want !!!
                        </Text>
                    </View>

                    <View style={styles.welcomeBtn}>
                        <TextBetweenLine title="Sign up" />
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 30
                        }}>
                            <ShareButton
                                title="faceBook"
                                onPress={() => { alert("me") }}
                                textStyle={{ textTransform: "uppercase" }}
                                btnStyle={{
                                    justifyContent: "center",
                                    borderRadius: 30,
                                    backgroundColor: "#fff"
                                }}
                                icons={
                                    <Image source={fbLogo} />
                                }
                            />

                            <ShareButton
                                title="google"
                                onPress={() => { alert("me") }}
                                textStyle={{ textTransform: "uppercase" }}
                                btnStyle={{
                                    justifyContent: "center",
                                    borderRadius: 30,
                                    paddingHorizontal: 20,
                                    backgroundColor: "#fff"
                                }}
                                icons={
                                    <Image source={ggLogo} />
                                }
                            />

                        </View>
                        <View>
                            <ShareButton
                                title="Start with your email or phone"
                                onPress={() => { router.navigate("/(auth)/login") }}
                                textStyle={{ color: "#fff", paddingVertical: 5 }}
                                btnStyle={{
                                    justifyContent: "center",
                                    borderRadius: 30,
                                    marginHorizontal: 50,
                                    paddingVertical: 10,
                                    backgroundColor: "#2c2c2c",
                                    borderColor: "#ccc",
                                    borderWidth: 1
                                }}
                                pressStyle={{ alignSelf: "stretch" }}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            gap: 10,
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                color: "white",
                            }}>
                                Already have an account?
                            </Text>
                            <Link href={"/(auth)/signup"}>
                                <Text style={{ color: "white", textDecorationLine: 'underline' }}>
                                    Sign In.
                                </Text>
                            </Link>

                        </View>

                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    )
}

export default WelcomePage;