import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, View } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';

const styles = StyleSheet.create({
    container: {
        backgroundColor: APP_COLOR.GREY,
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
        color: "#707070",
        fontSize: 15,
        // marginLeft: 5, // Optional, for spacing between icon and text
    }
});

const SearchHome = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <EvilIcons
                    name="search"
                    size={30}
                    color="black"
                />
                <Text style={styles.text}>Deal Hot Hôm Nay Từ 0đ...</Text>
            </View>
            <View style={styles.rightSection}>
                <Feather
                    name="camera"
                    size={25}
                    color="black"
                />
            </View>
        </View>
    );
};

export default SearchHome;
