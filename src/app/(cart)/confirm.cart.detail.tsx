import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { useCurrentApp } from "@/context/app.context"
import { checkOutCartAPI, loginAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { ConfirmSchema } from "@/utils/validate.schema"
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

const ConfirmCartDetail = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const { cart } = useCurrentApp();

    const handleCheckOut = async (cart_id: number, note: string, phone: string, address: string) => {
        try {
            setLoading(true)
            const res = await checkOutCartAPI(cart_id, note, phone, address);
            setLoading(false)
            console.log(res.data)
            if (res.data) {
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
                validationSchema={ConfirmSchema}
                initialValues={{ note: '', address: '', phone: '' }}
                onSubmit={values => handleCheckOut(cart?.id as number, values.note, values.phone, values.address)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={styles.container}>
                        <View>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: 600,
                                marginVertical: 30
                            }}>Xác nhận thông tin</Text>
                        </View>

                        <ShareInput
                            title="Note"
                            onChangeText={handleChange('note')}
                            onBlur={handleBlur('note')}
                            value={values.note}
                            error={errors.note}
                        />

                        <ShareInput
                            title="Phone"
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            error={errors.phone}
                        />

                        <ShareInput
                            title="Address"
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address}
                            error={errors.address}
                        />

                        <View style={{ marginVertical: 10 }}></View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <View style={{ flex: 1 }}>
                                <ShareButton
                                    // loading={loading}
                                    title="Hủy"
                                    onPress={() => router.back()}
                                    textStyle={{
                                        textTransform: "uppercase",
                                        color: "#fff",
                                        paddingVertical: 5,
                                        textAlign: "center"
                                    }}
                                    btnStyle={{
                                        justifyContent: "center",
                                        borderRadius: 30,
                                        paddingVertical: 10,
                                        backgroundColor: APP_COLOR.ORANGE,
                                    }}
                                    pressStyle={{ alignSelf: "stretch" }}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <ShareButton
                                    loading={loading}
                                    title="Xác nhận"
                                    onPress={handleSubmit as any}
                                    textStyle={{
                                        textTransform: "uppercase",
                                        color: "#fff",
                                        paddingVertical: 5,
                                        textAlign: "center"
                                    }}
                                    btnStyle={{
                                        justifyContent: "center",
                                        borderRadius: 30,
                                        paddingVertical: 10,
                                        backgroundColor: APP_COLOR.ORANGE,
                                    }}
                                    pressStyle={{ alignSelf: "stretch" }}
                                />
                            </View>
                        </View>


                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )

}

export default ConfirmCartDetail;