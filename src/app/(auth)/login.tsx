import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { loginAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { Link, router } from "expo-router"
import { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import Toast from "react-native-root-toast"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10
    },

})

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        try {
            setLoading(true)
            const res = await loginAPI(email, password, phone);
            setLoading(false)
            if (res.data) {
                router.replace("/(tabs)");
            } else {
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
        } catch (error) {
            console.log(">>> check error: ", error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: 600,
                        marginVertical: 30
                    }}>Login</Text>
                </View>

                <ShareInput
                    title="Email"
                    keyboardType="email-address"
                    value={email}
                    setValue={setEmail}
                />

                <ShareInput
                    title="Phone"
                    // keyboardType="email-address"
                    value={phone}
                    setValue={setPhone}
                />

                <ShareInput
                    title="Password"
                    secureTextEntry={true}
                    value={password}
                    setValue={setPassword}
                />

                <View style={{ marginVertical: 10 }}></View>
                <ShareButton
                    loading={loading}
                    title="Login"
                    onPress={handleLogin}
                    textStyle={{
                        textTransform: "uppercase",
                        color: "#fff",
                        paddingVertical: 5
                    }}
                    btnStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        marginHorizontal: 50,
                        paddingVertical: 10,
                        backgroundColor: APP_COLOR.ORANGE,

                    }}
                    pressStyle={{ alignSelf: "stretch" }}

                />

                <View style={{
                    marginVertical: 15,
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "center"
                }}>
                    <Text style={{
                        color: "black",
                    }}>
                        Don't have an account?
                    </Text>
                    <Link href={"/(auth)/signup"}>
                        <Text style={{ color: APP_COLOR.ORANGE, textDecorationLine: 'underline' }}>
                            Sign Up.
                        </Text>
                    </Link>

                </View>

                <SocialButton
                    title="Sign in with"
                />
            </View>
        </SafeAreaView>
    )
}

export default LoginPage;