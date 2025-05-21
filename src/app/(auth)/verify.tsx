import { APP_COLOR } from "@/utils/constant";
import { View, Text, StyleSheet } from "react-native"
import OTPTextView from 'react-native-otp-textinput';

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 25,
        fontWeight: "600",
        marginVertical: 20
    }
})

const VerifyPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Verification Code</Text>
            <Text style={{ marginVertical: 10 }}>Please type the verification code send to hoidanit@gmail.com</Text>
            <View style={{ marginVertical: 20 }}>
                <OTPTextView
                    inputCount={6}
                    inputCellLength={1}
                    tintColor={APP_COLOR.ORANGE}
                    textInputStyle={{
                        borderWidth: 1,
                        borderColor: APP_COLOR.GREY,
                        borderBottomWidth: 1,
                        borderRadius: 5,
                        // @ts-ignore:next-line
                        color: APP_COLOR.ORANGE
                    }}
                />
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <Text >I don't receive a code!</Text>
                <Text style={{ textDecorationLine: 'underline', color: APP_COLOR.ORANGE }}> Please resend</Text>
            </View>
        </View>
    )
}

export default VerifyPage