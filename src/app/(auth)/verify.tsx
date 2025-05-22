import LoadingOverlay from "@/components/loading/overlay";
import { APP_COLOR } from "@/utils/constant";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native"
import OTPTextView from 'react-native-otp-textinput';
import Toast from "react-native-root-toast";

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
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const otpRef = useRef<OTPTextView>(null);
    const [code, setCode] = useState<string>("");
    const { email } = useLocalSearchParams();

    const verifyCode = async () => {
        //call api
        Keyboard.dismiss();
        setIsSubmit(true);

        // // const res = await verifyCodeAPI("admin1@gmail.com", "123456");
        setIsSubmit(false);
        //clear input
        otpRef?.current?.clear();
        Toast.show("Register successfully", {
            duration: Toast.durations.LONG,
            textColor: "white",
            backgroundColor: APP_COLOR.ORANGE,
            opacity: 1
        });
        router.navigate({
            pathname: "/(auth)/login",
        })

        // if (res.data) {
        //     //success
        //     alert("success")

        // } else {
        //     Toast.show(res.message as string, {
        //         duration: Toast.durations.LONG,
        //         textColor: "white",
        //         backgroundColor: APP_COLOR.ORANGE,
        //         opacity: 1
        //     });
        // }
    }

    useEffect(() => {
        if (code && code.length === 6) {
            verifyCode()
        }
    }, [code])




    return (
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>Verification Code</Text>
                <Text style={{ marginVertical: 10 }}>Please type the verification code send to {email}</Text>
                <View style={{ marginVertical: 20 }}>
                    <OTPTextView
                        ref={otpRef}
                        handleTextChange={setCode}
                        autoFocus
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
            {isSubmit && <LoadingOverlay />}
        </>
    )
}

export default VerifyPage