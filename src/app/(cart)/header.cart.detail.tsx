import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';


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
