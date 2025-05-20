import { View, StyleSheet, Image } from "react-native";
import ShareButton from "./share.button";
import TextBetweenLine from "./text.between.line";
import fbLogo from '@/assets/auth/facebook.png';
import ggLogo from '@/assets/auth/google.png';

const styles = StyleSheet.create({
    welcomeBtn: {
        flex: 1,
        gap: 30
    }
})

const SocialButton = () => {
    return (
        <View style={styles.welcomeBtn}>
            <TextBetweenLine title="Sign up with" />
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 30
            }}>
                <ShareButton
                    title="faceBook"
                    onPress={() => { alert("me") }}
                    textStyle={{ textTransform: "uppercase" }}
                    btnStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        backgroundColor: "#fff"
                    }}
                    icons={
                        <Image source={fbLogo} />
                    }
                />
                <ShareButton
                    title="google"
                    onPress={() => { alert("me") }}
                    textStyle={{ textTransform: "uppercase" }}
                    btnStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        paddingHorizontal: 20,
                        backgroundColor: "#fff"
                    }}
                    icons={
                        <Image source={ggLogo} />}
                />
            </View>
        </View>
    )
}

export default SocialButton;