import React from 'react';
import { useCustomFlatListHook } from './hooks/useCustomFlatListHook';
import { Animated, FlatListProps, StyleSheet, View } from 'react-native';

type CustomFlatListProductProps<T> = Omit<FlatListProps<T>, 'ListHeaderComponent'> & {
    HeaderComponent?: JSX.Element;
    StickyElementComponent: JSX.Element;
    TopListElementComponent: JSX.Element;
};

function CustomFlatListProduct<T>({
    style,
    ...props
}: CustomFlatListProductProps<T>): React.ReactElement {
    const [
        scrollY,
        stylesHook,
        onLayoutHeaderElement,
        onLayoutTopListElement,
        onLayoutStickyElement,
    ] = useCustomFlatListHook();

    const stickyOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const stickyScaleY = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    return (
        <View style={style}>
            {/* Sticky Element: không chiếm không gian, overlay lên */}
            <Animated.View
                style={[
                    styles.stickyAbsolute,
                    {
                        opacity: stickyOpacity,
                        transform: [{ scaleY: stickyScaleY }],
                    }
                ]}
                onLayout={onLayoutStickyElement}
                pointerEvents="box-none"
            >
                {props.StickyElementComponent}
            </Animated.View>

            {/* Top List Element: chiếm chỗ trong layout */}
            <Animated.View
                style={stylesHook.topElement}
                onLayout={onLayoutTopListElement}
            >
                {props.TopListElementComponent}
            </Animated.View>

            {/* List with optional header */}
            <Animated.FlatList<any>
                {...props}
                ListHeaderComponent={(
                    <Animated.View onLayout={onLayoutHeaderElement}>
                        {props.HeaderComponent}
                    </Animated.View>
                )}
                ListHeaderComponentStyle={[props.ListHeaderComponentStyle, stylesHook.header]}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                    }
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    stickyAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
    },
});

export default CustomFlatListProduct;
