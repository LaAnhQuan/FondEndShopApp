import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { registerAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import axios from "axios"
import { Link, router } from "expo-router"
import { useEffect, useState } from "react"
import { Text, View, TextInput, StyleSheet } from "react-native"
import Toast from "react-native-root-toast"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10
    },
    inputGroup: {
        padding: 5,
        gap: 10
    },

    text: {
        fontSize: 18,
    },
    input: {
        borderColor: "#d0d0d0",
        borderWidth: 1,
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 5,

    }
})

const SignUpPage = () => {
    // const URL_BACKEND = process.env.EXPO_PUBLIC_API_URL;


    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");



    const handleSignUp = async () => {

        try {
            const res = await registerAPI(email, password, name, phone)

            if (res.data) {
                router.navigate({
                    pathname: "/(auth)/verify",
                    params: { email: email }
                })

            } else {
                // Add a Toast on screen.
                const m = Array.isArray(res.message)
                    ? res.message[0] : res.message;
                let toast = Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1,
                    position: -100,
                    animation: true
                });
            }

        } catch (error) {
            console.log(">>> check error", error)

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
                    }}>Sign Up</Text>
                </View>
                <ShareInput
                    title="Full name"
                    value={name}
                    setValue={setName}
                />
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
                    title="Sign Up"
                    onPress={handleSignUp}
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
                        Already have an account?
                    </Text>
                    <Link href={"/(auth)/login"}>
                        <Text style={{ color: "black", textDecorationLine: 'underline' }}>
                            Sign In.
                        </Text>
                    </Link>

                </View>

                <SocialButton
                    title="Sign up with"
                />
            </View>
        </SafeAreaView>
    )
}

export default SignUpPage;

