import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { getURLBaseBackEnd, updateProfileUserAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { UpdateUserSchema } from "@/utils/validate.schema";
import { Formik } from "formik";
import {
    View, Text, StyleSheet, Image, Platform,
    KeyboardAvoidingView, ScrollView,
    Pressable
} from "react-native";
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 50
    }
})


const UserInfo = () => {
    const { appState, setAppState } = useCurrentApp();

    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;

    const baseImage = `${backend}/images/`;

    const handleUpdateUser = async (name: string, phone: string) => {
        if (appState?.user.id) {
            const res = await updateProfileUserAPI(appState?.user.id, name, phone);
            if (res.data) {
                Toast.show("Cập nhật thông tin user thành công!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });

                //update context
                setAppState({
                    ...appState,
                    user: {
                        ...appState.user,
                        name: name, phone: phone
                    }
                })

            } else {
                const m = Array.isArray(res.message)
                    ? res.message[0] : res.message;

                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });
            }
        }

    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={{ alignItems: "center", gap: 5 }}>
                        <Image
                            style={{ height: 150, width: 150, borderColor: APP_COLOR.ORANGE, borderRadius: 150, borderWidth: 1 }}
                            source={{ uri: `${getURLBaseBackEnd()}/images/${appState?.user.avatar}` }}
                        />
                        <Text>{appState?.user.name}</Text>
                    </View>
                    {/* <View style={{ marginTop: 20, gap: 20 }}>
                        <ShareInput
                            title="Họ tên"
                            // onChangeText={handleChange('name')}
                            // onBlur={handleBlur('name')}
                            // value={values.name}
                            // error={errors.name}
                            value={appState?.user.name}
                        />
                        <ShareInput
                            title="Email"
                            keyboardType="email-address"
                            // onChangeText={handleChange('email')}
                            // onBlur={handleBlur('email')}
                            // value={values.email}
                            // error={errors.email}
                            value={appState?.user.email}
                        />

                        <ShareInput
                            title="Phone"
                            // onChangeText={handleChange('name')}
                            // onBlur={handleBlur('name')}
                            // value={values.name}
                            // error={errors.name}
                            value={appState?.user.phone}
                        />
                    </View> */}

                    <Formik commentMore actions
                        validationSchema={UpdateUserSchema}
                        initialValues={{
                            name: appState?.user.name,
                            email: appState?.user.email,
                            phone: appState?.user.phone
                        }}
                        onSubmit={values => handleUpdateUser(values?.name ?? "", values?.phone ?? "")}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors,
                            touched, isValid, dirty
                        }) => (
                            <View style={{ marginTop: 20, gap: 20 }}>
                                <ShareInput
                                    title="Full Name"
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    error={errors.name}
                                    touched={touched.name}
                                />
                                <ShareInput
                                    editable={false}
                                    title="Email"
                                    keyboardType="email-address"
                                    value={appState?.user.email}
                                />
                                <ShareInput
                                    title="Phone"
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    error={errors.phone}
                                    touched={touched.phone}
                                />

                                <Pressable
                                    disabled={!(isValid && dirty)}
                                    onPress={handleSubmit as any}
                                    style={({ pressed }) => ({
                                        opacity: pressed === true ? 0.5 : 1,
                                        backgroundColor: isValid && dirty ?
                                            APP_COLOR.ORANGE : APP_COLOR.GREY,
                                        padding: 10,
                                        marginTop: 10,
                                        borderRadius: 3
                                    })}
                                >
                                    <Text style={{
                                        textAlign: "center",
                                        color: isValid && dirty ? "white" : "grey"
                                    }}>Lưu thay đổi</Text>
                                </Pressable>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default UserInfo;