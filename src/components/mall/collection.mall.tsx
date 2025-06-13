import { View, Text, StyleSheet, Image, FlatList, Pressable, Dimensions } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { getTopCategory, getURLBaseBackEnd } from "@/utils/api";
import { currencyFormatter } from "@/utils/format";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ContentLoader, { Rect } from "react-content-loader/native"


const { height: sHeight, width: sWidth } = Dimensions.get('window');

interface IProps {
    name: string;
    description: string;
    refAPI: string;
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    sale: {
        padding: 3,
        borderRadius: 3,
        alignSelf: "flex-start"
    }

})
const CollectionMall = (props: IProps) => {
    const { name, description, refAPI } = props;
    const [topCategory, setTopCategory] = useState<ITopCategory[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await getTopCategory(refAPI);
            if (res.data) {
                setTopCategory(res.data[0] as any)
            } else {
                //error
            }
            setLoading(false)
        }
        fetchData();
    }, [refAPI]);

    return (
        <>
            <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>
            {loading === false ?
                <View style={styles.container}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={{
                            color: APP_COLOR.ORANGE,
                            fontSize: 16,
                            fontWeight: "600"
                        }}>{name}</Text>
                        <Pressable
                            onPress={() => router.navigate({
                                pathname: "/(auth)/detail_mall",
                                params: { id: topCategory.id }
                            })}
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <Text style={{ color: "#5a5a5a" }}>Xem tất cả</Text>
                            <MaterialIcons
                                style={{ marginTop: 3 }}
                                name="navigate-next" size={20} color="grey" />
                        </Pressable>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ color: "#5a5a5a" }}>{description}</Text>
                    </View>
                    <FlatList
                        data={topCategory.products}
                        horizontal
                        contentContainerStyle={{ gap: 5 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <Pressable
                                    onPress={() => router.navigate({
                                        pathname: "/product/[id]",
                                        params: { id: item.id }
                                    })}
                                >
                                    <View style={{ borderWidth: 1, borderColor: APP_COLOR.GREY }}>
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Image
                                                style={{ height: 130, width: 130 }}
                                                source={{ uri: `${getURLBaseBackEnd()}/images/${item.image}` }}
                                            />
                                        </View>
                                        <View style={{ padding: 5, flexDirection: "row", alignItems: "center" }}>
                                            <View>
                                                <View style={styles.sale}>
                                                    <Text style={{ color: "white", backgroundColor: APP_COLOR.ORANGE, fontSize: 13 }}>Mall</Text>
                                                </View>
                                            </View>
                                            <Text
                                                numberOfLines={1}
                                                ellipsizeMode='tail'
                                                style={{ maxWidth: 130 }}>{item.name}</Text>

                                        </View>
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{
                                                color: APP_COLOR.ORANGE,
                                                fontWeight: "600",
                                                maxWidth: 130,
                                                padding: 5
                                            }}>{currencyFormatter(item.price)}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        }}
                    />
                </View>
                :
                <ContentLoader
                    speed={2}
                    width={sWidth}
                    height={200}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    style={{ width: '100%' }}
                >
                    <Rect x="10" y="10" rx="5" ry="5" width={150} height="200" />
                    <Rect x="170" y="10" rx="5" ry="5" width={150} height="200" />
                    <Rect x="330" y="10" rx="5" ry="5" width={150} height="200" />
                </ContentLoader>
            }
        </>
    )
}

export default CollectionMall;