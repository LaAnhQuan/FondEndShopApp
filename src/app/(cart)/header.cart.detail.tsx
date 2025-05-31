import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, View } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    container: {


    },

});

const HeaderCartDetail = () => {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 16,
        }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
                <MaterialIcons commentMore actions
                    onPress={() => router.back()}
                    name="arrow-back" size={30}
                    color={APP_COLOR.ORANGE}
                />
                <Text style={{ fontSize: 20 }}>Giỏ hàng</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 15 }}>Sửa</Text>
            </View>
        </View>


    );
};

export default HeaderCartDetail;
