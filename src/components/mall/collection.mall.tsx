import { View, Text, StyleSheet, Image, FlatList, Pressable } from "react-native";
import demo from "@/assets/icon.png";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { getTopCategory, getURLBaseBackEnd } from "@/utils/api";
import { currencyFormatter } from "@/utils/format";
import { router } from "expo-router";

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

    useEffect(() => {
        const fetchData = async () => {
            const res = await getTopCategory(refAPI);
            if (res.data) {
                setTopCategory(res.data)
            } else {
                //error
            }
        }
        fetchData();
    }, [refAPI]);

    return (
        <>
            <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>
            <View style={styles.container}>
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{
                        color: APP_COLOR.ORANGE,
                        fontSize: 16,
                        fontWeight: "600"
                    }}>{name}</Text>
                    <Text style={{ color: "#5a5a5a" }}>Xem tất cả</Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Text style={{ color: "#5a5a5a" }}>{description}</Text>
                </View>
                <FlatList
                    data={topCategory}
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
                                                <Text style={{ color: "white", backgroundColor: APP_COLOR.ORANGE }}>Mall</Text>
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
        </>
    )
}

export default CollectionMall;