import { APP_COLOR } from "@/utils/constant";
import { Dimensions, StyleSheet, Text, View } from "react-native"


interface IProps {
    image: any,
    name: string,
    price: number,
    oldprice: number,
    total_sold: number,
    rating: number,
}


const { width } = Dimensions.get("window");
const SPACING = 8;
const ITEM_WIDTH = (width - SPACING * 3) / 2;
const ITEM_HEIGHT = ITEM_WIDTH + 80;




const ProductHome = (props: IProps) => {
    const { name, image, price, oldprice, total_sold, rating } = props

    return (
        <View style={styles.container}>
            <Text>hello</Text>

        </View>
    )
}


const styles = StyleSheet.create({
    list: {
        padding: SPACING,
    },
    container: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: SPACING / 2,
        borderRadius: 5,
        backgroundColor: "#fff",
        overflow: "hidden",
        elevation: 2, // đổ bóng nhẹ (Android)
        shadowColor: "#000", // đổ bóng nhẹ (iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: "100%",
        height: "66%",
        resizeMode: "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#eee",

    },
    info: {
        flex: 1,
        padding: 8,
        justifyContent: "center",
    },
    title: {
        fontSize: 13,
        color: "#333",
    },
    price: {
        marginTop: 4,
        color: APP_COLOR.ORANGE,
        fontWeight: "bold",
    },
});


export default ProductHome