import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { APP_COLOR } from "@/utils/constant"
import { Link } from "expo-router"
import { Text, View, TextInput, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
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
                />
                <ShareInput
                    title="Email or Phone"
                    keyboardType="email-address"
                />

                <ShareInput
                    title="Password"
                />

                <View style={{ marginVertical: 10 }}></View>
                <ShareButton
                    title="Sign Up"
                    onPress={() => { alert("me") }}
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
                    <Link href={"/(auth)/signup"}>
                        <Text style={{ color: "black", textDecorationLine: 'underline' }}>
                            Sign In.
                        </Text>
                    </Link>

                </View>

                <SocialButton />
            </View>
        </SafeAreaView>
    )
}

export default SignUpPage;

