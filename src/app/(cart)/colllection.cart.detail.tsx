import { getURLBaseBackEnd } from "@/utils/api";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native"


interface IProps {
    item: any;

}
const CollectionCartDetail = (props: IProps) => {
    const { item } = props

    const product = item.product_variant_values?.product;
    const price = item.product_variant_values?.price;
    const quantity = item.quantity;

    if (!product) return null;

    return (
        <View style={styles.itemContainer}>
            <View style={styles.leftBox}>
                <Image
                    source={{ uri: `${getURLBaseBackEnd()}/images/${product.image}` }}
                    style={{ width: 80, height: 80, borderRadius: 6 }}
                />
            </View>
            <View style={styles.rightBox}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>{price?.toLocaleString()}₫</Text>
                    <Text style={styles.quantity}>x{quantity}</Text>
                </View>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    leftBox: {
        width: 80,
        height: 80,
        backgroundColor: "#f0f0f0",
        borderRadius: 6,
    },
    imagePlaceholder: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ccc",
        borderRadius: 6,
    },
    rightBox: {
        flex: 1,
        paddingLeft: 12,
        justifyContent: "space-between",
    },
    productName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#222",
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        color: "#ee4d2d",
        fontWeight: "bold",
        fontSize: 16,
    },
    quantity: {
        fontSize: 14,
        color: "#555",
    },
});


export default CollectionCartDetail