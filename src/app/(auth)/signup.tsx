import ShareButton from "@/components/button/share.button"
import { APP_COLOR } from "@/utils/constant"
import { Text, View, TextInput, StyleSheet } from "react-native"

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
        <View style={styles.container}>
            <View>
                <Text>Sign Up</Text>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.text}>Full name</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.text}>Email or Phone</Text>
                <TextInput keyboardType="email-address" style={styles.input} />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.text}>Password</Text>
                <TextInput style={styles.input} />
            </View>
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
        </View>
    )
}

export default SignUpPage;