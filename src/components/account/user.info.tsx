import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { getURLBaseBackEnd } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { View, Text, StyleSheet, Image, Platform, KeyboardAvoidingView, ScrollView } from "react-native"

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 50
    }
})


const UserInfo = () => {
    const { theme, appState } = useCurrentApp();

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
                    <View style={{ marginTop: 20, gap: 20 }}>
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
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default UserInfo;