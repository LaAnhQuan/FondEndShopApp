import RMain from "@/components/example/restaurant/main"
import { getProductByIdAPI } from "@/utils/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native"
import ContentLoader, { Rect } from "react-content-loader/native"
const { height: sHeight, width: sWidth } = Dimensions.get('window');


const ProductPage = () => {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<IProductId | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const res = await getProductByIdAPI(id as any);
            if (res.data) {
                // console.log("check data ", res.data)
                setProduct(res.data)
            }
            setLoading(false)
        }
        fetchProduct()
    }, [id])
    return (
        <View style={{ flex: 1 }}>
            {loading === false ?
                <RMain
                    product={product}
                />
                :
                <ContentLoader
                    speed={2}
                    width={700}
                    height={sHeight}
                    // viewBox="0 0 700 150"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    style={{ width: '100%' }}
                >
                    <Rect x="0" y="0" rx="3" ry="3" width={sWidth} height="320" />

                    <Rect x="10" y="340" rx="0" ry="0" width={sWidth - 250} height="15" />
                    <Rect x="0" y="370" rx="0" ry="0" width={sWidth} height="15" />
                    <Rect x="10" y="400" rx="0" ry="0" width={sWidth - 200} height="15" />
                    <Rect x="10" y="430" rx="0" ry="0" width={sWidth - 270} height="15" />
                    <Rect x="0" y="460" rx="0" ry="0" width={sWidth} height="15" />
                </ContentLoader>
            }
        </View>
    )
}

export default ProductPage