import { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    LayoutChangeEvent,
    StyleProp,
    ViewStyle
} from "react-native";

type ICustomFlatListStyles = {
    header: StyleProp<ViewStyle>;
    stickyElement: StyleProp<ViewStyle>;
    topElement?: StyleProp<ViewStyle>;
};

type TUseCustomFlatListHook = [
    Animated.Value,
    ICustomFlatListStyles,
    (event: LayoutChangeEvent) => void,
    (event: LayoutChangeEvent) => void,
    (event: LayoutChangeEvent) => void
];

const window = Dimensions.get("window");

export const useCustomFlatListHook = (): TUseCustomFlatListHook => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [heights, setHeights] = useState({
        header: 0,
        sticky: 0,
        topList: 0
    });

    const styles: ICustomFlatListStyles = {
        header: {
            marginBottom: heights.topList // chỉ giữ lại topList vì sticky là absolute
        },
        stickyElement: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            transform: [
                {
                    translateY: scrollY.interpolate({
                        extrapolate: "clamp",
                        inputRange: [-window.height, heights.header],
                        outputRange: [window.height, -heights.header]
                    })
                }
            ],
            zIndex: 2
        },
        topElement: {
            position: "absolute",
            top: heights.header,
            left: 0,
            right: 0,
            transform: [
                {
                    translateY: scrollY.interpolate({
                        extrapolate: "clamp",
                        inputRange: [-window.height, heights.header + heights.topList],
                        outputRange: [window.height, - (heights.header + heights.topList)]
                    })
                }
            ],
            zIndex: 1
        }
    };

    const onLayoutHeaderElement = (event: LayoutChangeEvent): void => {
        setHeights(prev => ({ ...prev, header: event.nativeEvent.layout.height }));
    };

    const onLayoutTopListElement = (event: LayoutChangeEvent): void => {
        setHeights(prev => ({ ...prev, topList: event.nativeEvent.layout.height }));
    };

    const onLayoutTopStickyElement = (event: LayoutChangeEvent): void => {
        setHeights(prev => ({ ...prev, sticky: event.nativeEvent.layout.height }));
    };

    return [
        scrollY,
        styles,
        onLayoutHeaderElement,
        onLayoutTopListElement,
        onLayoutTopStickyElement
    ];
};
