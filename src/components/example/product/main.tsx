import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, interpolate, Extrapolation, interpolateColor } from 'react-native-reanimated';
import Info from './info';
import { APP_COLOR } from '@/utils/constant';
import StickyHeader from './sticky.header';
import { useState } from 'react';
import { getURLBaseBackEnd } from '@/utils/api';
import Carousel from 'react-native-reanimated-carousel';
import StickyFooter from './order/sticky.footer';

const { height: sHeight, width: sWidth } = Dimensions.get('window');

const HEADER_HEIGHT = 120;
const IMAGE_HEIGHT = 400;

interface IProps {
    product: IProductId | null;
}

const RMain = (props: IProps) => {
    const { product } = props;
    const scrollY = useSharedValue(0);
    const [infoHeight, setInfoHeight] = useState(0); // Ban đầu là 0, sẽ được cập nhật từ Info
    const totalHeight = IMAGE_HEIGHT + infoHeight; // Tổng chiều cao của Carousel + Info

    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
        // console.log('scrollY:', scrollY.value);
    });

    // Fade-in/out effect for the StickyHeader, ngưỡng 0 đến 100px
    const animatedStickyHeaderStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, 100], // Ngưỡng: 0px đến 100px
            [0, 1],
            Extrapolation.CLAMP
        );
        const pointerEvents = opacity === 0 ? 'none' : 'auto';
        // console.log('Opacity:', opacity); // Debug để kiểm tra opacity
        return {
            opacity,
            pointerEvents,
        };
    });

    const animatedHeartIconStyle = useAnimatedStyle(() => {
        const range = IMAGE_HEIGHT + infoHeight - HEADER_HEIGHT;

        const translateY = interpolate(
            scrollY.value,
            [0, range], // Define scroll range
            [0, -range],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ translateY }],

        };
    });

    const animatedBackgroundStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                scrollY.value,
                [0, 100], // Đồng bộ với ngưỡng của StickyHeader
                ['rgba(0,0,0,0.3)', 'transparent'],
            ),
        };
    });

    const animatedArrowColorStyle = useAnimatedStyle(() => {
        return {
            color: interpolateColor(
                scrollY.value,
                [0, 100], // Đồng bộ với ngưỡng của StickyHeader
                ['white', APP_COLOR.ORANGE],
            ),
        };
    });

    return (
        <View style={{ flex: 1 }}>
            {/* Sticky Header */}
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: HEADER_HEIGHT,
                        zIndex: 10,
                    },
                    animatedStickyHeaderStyle,
                    animatedBackgroundStyle,
                ]}
                pointerEvents="box-none"
            >
                <StickyHeader
                    headerHeight={HEADER_HEIGHT}
                    imageHeight={IMAGE_HEIGHT}
                    animatedBackgroundStyle={animatedBackgroundStyle}
                    animatedArrowColorStyle={animatedArrowColorStyle}
                    animatedStickyHeaderStyle={animatedStickyHeaderStyle}
                // animatedHeartIconStyle={animatedHeartIconStyle}
                />

            </Animated.View>

            {/* ScrollView không cần paddingTop */}
            <Animated.ScrollView
                style={styles.container}
                onScroll={onScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    minHeight: totalHeight,
                    paddingBottom: 30,
                }}
            >
                <StickyHeader
                    headerHeight={HEADER_HEIGHT}
                    imageHeight={IMAGE_HEIGHT}
                    animatedBackgroundStyle={animatedBackgroundStyle}
                    animatedArrowColorStyle={animatedArrowColorStyle}
                    animatedStickyHeaderStyle={animatedStickyHeaderStyle}
                    animatedHeartIconStyle={animatedHeartIconStyle}
                />
                {/* Image Carousel (vẫn nằm sát top) */}
                <View style={styles.header}>
                    <Carousel
                        loop
                        width={sWidth}
                        height={IMAGE_HEIGHT}
                        autoPlay={false}
                        data={product?.product_images || []}
                        scrollAnimationDuration={500}
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: `${getURLBaseBackEnd()}/images/${item}` }}
                                style={styles.headerImage}
                            />
                        )}
                    />
                </View>

                {/* Add optional spacer here if needed */}
                {/* <View style={{ height: HEADER_HEIGHT }} /> */}

                <Info
                    product={product}
                    infoHeight={infoHeight}
                    onHeightMeasured={setInfoHeight}
                />
                <View style={{ height: 30 }} />

            </Animated.ScrollView>
            <StickyFooter />
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: sWidth,
        height: IMAGE_HEIGHT,
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default RMain;