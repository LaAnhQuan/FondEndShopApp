import { APP_COLOR } from "@/utils/constant";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { router } from "expo-router";


const styles = StyleSheet.create({
    container: {
        width: "75%",
        backgroundColor: "#eee",
        gap: 5,
        flexDirection: "row",
        margin: 10,
        paddingHorizontal: 3,
        paddingVertical: 9,
        borderRadius: 10,
        justifyContent: "space-between", // Changed to space-between for separation
        alignItems: 'center', // Vertically center content
    },
    leftSection: {
        flexDirection: "row",
        alignItems: 'center', // Align text and icon in the left section
        marginLeft: 5
    },
    rightSection: {
        justifyContent: 'flex-end', // Align camera icon to the right
        marginRight: 10
    },
    text: {
        color: APP_COLOR.ORANGE,
        fontSize: 15,
        // marginLeft: 5, // Optional, for spacing between icon and text
    },
    body: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    }
});

const SearchMall = () => {
    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <Pressable
                    onPress={() => router.navigate("/(auth)/search")}
                    style={styles.leftSection}>
                    <EvilIcons
                        name="search"
                        size={30}
                        color={APP_COLOR.ORANGE}
                    />
                    <Text style={styles.text}>Shopee Mall</Text>
                </Pressable>
                <View style={styles.rightSection}>
                    <Feather
                        name="camera"
                        size={23}
                        color={APP_COLOR.ORANGE}
                    />
                </View>
            </View>
            <View style={{ flexDirection: "row", alignSelf: "center", gap: 15 }}>
                <Feather
                    onPress={() => router.navigate("/(cart)/cart.detail")}
                    name="shopping-cart"
                    size={25}
                    color={APP_COLOR.ORANGE}
                />
                <FontAwesome name="comments-o" size={24} color={APP_COLOR.ORANGE} />

            </View>
        </View>
    );
}

export default SearchMall;