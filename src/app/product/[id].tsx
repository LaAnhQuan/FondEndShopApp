import RMain from "@/components/example/restaurant/main"
import { getProductByIdAPI } from "@/utils/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"


const ProductPage = () => {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<IProductId | null>(null)
    useEffect(() => {
        const fetchRestaurant = async () => {
            const res = await getProductByIdAPI(id as any);
            if (res.data) {
                // console.log("check data ", res.data)
                setProduct(res.data)
            }
        }
        fetchRestaurant()
    }, [id])
    return (
        <View style={{ flex: 1 }}>
            <RMain
                product={product}
            />
        </View>
    )
}

export default ProductPage