import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { useCurrentApp } from "@/context/app.context"
import { loginAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { LoginSchema } from "@/utils/validate.schema"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link, router } from "expo-router"
import { Formik } from "formik"
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

    const [loading, setLoading] = useState<boolean>(false);

    const { setAppState } = useCurrentApp();

    const handleLogin = async (email: string, password: string, phone: string) => {
        try {
            setLoading(true)
            const res = await loginAPI(email, password, phone);
            setLoading(false)
            if (res.data) {
                await AsyncStorage.setItem("token", res.data.token)
                console.log("check token", res.data.token)
                setAppState(res.data)
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
            <Formik
                validationSchema={LoginSchema}
                initialValues={{ email: '', password: '', phone: '' }}
                onSubmit={values => handleLogin(values.email, values.password, values.phone)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                        />

                        <ShareInput
                            title="Phone"
                            // keyboardType="email-address"
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            error={errors.phone}
                        />

                        <ShareInput
                            title="Password"
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            error={errors.password}
                        />

                        <View style={{ marginVertical: 10 }}></View>
                        <ShareButton
                            loading={loading}
                            title="Login"
                            onPress={handleSubmit as any}
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
                )}
            </Formik>
        </SafeAreaView>
    )
}

export default LoginPage;