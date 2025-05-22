import { bannerAPI, getURLBaseBackEnd } from "@/utils/api";
import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import bn1 from "@/assets/banner/1746550809789-bn1.jpg";
import bn2 from "@/assets/banner/1746495775100-bn2.jpg";
import bn3 from "@/assets/banner/1746495775100-bn3.jpg";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";



function BannerHome() {
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const width = Dimensions.get("window").width;
    const [sliders, setSliders] = React.useState<IBanner[]>([]);

    React.useEffect(() => {
        // Fetch image URLs from the backend
        const fetchImages = async () => {
            try {
                const res = await bannerAPI();  // Thay thế URL backend của bạn tại đây
                if (res.data) {
                    // const imageUrls = res.data.map((item: { image: string }) => item.image);
                    setSliders(res.data);

                }


            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    // console.log("check setSliders 2", sliders);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };


    return (
        <View style={{ flex: 1 }}>
            <Carousel
                ref={ref}
                width={width}
                height={width / 4}
                data={sliders}
                onProgressChange={progress}
                renderItem={({ item, index }) => (
                    <Image
                        style={{
                            width: width,
                            height: width / 3.7,
                            resizeMode: 'cover',
                        }}
                        source={{ uri: `${getURLBaseBackEnd()}/images/${item.image}` }}
                    />
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={sliders}
                dotStyle={{
                    height: 5, width: 5,
                    backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50
                }}
                containerStyle={{ gap: 5, marginTop: 10 }}
                onPress={onPressPagination}
            />
        </View>
    );
}

export default BannerHome;

