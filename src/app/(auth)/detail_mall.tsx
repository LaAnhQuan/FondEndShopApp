import SectionListLibrary from "@/components/example/section.list.library";
import { getProductByCategoryIdAPI } from "@/utils/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native"
import { Dimensions, Text, View } from "react-native";


const { height: sHeight, width: sWidth } = Dimensions.get('window');

const DetailMall = () => {
    const { id } = useLocalSearchParams();
    const idNumber = +id;

    const [section, setSection] = useState<IBrandProduct[] | undefined>(); // Changed type to allow undefined

    useEffect(() => {
        const loadBrand = async () => {
            const res = await getProductByCategoryIdAPI(idNumber);
            // Add a check for res.data before proceeding
            if (res?.data) {
                const SECTIONS = Object.keys(res.data).map((brand) => ({
                    title: brand, // Tên thương hiệu
                    data: res?.data[brand]?.map((product: any) => ({ // Added 'any' for product type here, you might want a more specific type
                        id: product.id,
                        title: product.name, // Tên sản phẩm
                        description: product.description, // Mô tả sản phẩm
                        price: product.price, // Giá sản phẩm
                        image: product.image, // Hình ảnh sản phẩm
                    })),
                }));
                // console.log(res?.data);
                setSection(SECTIONS as any);
            } else {
                // Handle the case where res.data is undefined, e.g., set section to an empty array or show an error
                setSection([]);
                console.warn("No data received from API for category ID:", idNumber);
            }
        };
        loadBrand();
    }, [idNumber]); // Added idNumber to dependency array to re-run effect if id changes

    return (
        <View style={{ flex: 1 }}>
            {section ? ( // Conditionally render SectionListLibrary only if section is defined
                <SectionListLibrary section={section} />
            ) : <ContentLoader
                speed={2}
                width={700}
                height={sHeight}
                // viewBox="0 0 700 150"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={{ width: '100%' }}
            >
                <Rect x="0" y="10" rx="3" ry="3" width={sWidth} height="70" />
                <Rect x="0" y="110" rx="0" ry="0" width={sWidth} height={sHeight - 100} />
            </ContentLoader>}
        </View>
    );
};

export default DetailMall;