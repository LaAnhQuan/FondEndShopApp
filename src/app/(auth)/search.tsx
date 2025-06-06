import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { APP_COLOR } from "@/utils/constant";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import debounce from "debounce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRestaurantByName, getURLBaseBackEnd } from "@/utils/api";

const STORAGE_KEY = "SEARCH_HISTORY";

const SearchPage = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Load từ AsyncStorage khi mở màn
    useEffect(() => {
        const loadHistory = async () => {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            if (saved) {
                setSearchHistory(JSON.parse(saved));
            }
        };
        loadHistory();
    }, []);

    const saveHistory = async (newHistory: string[]) => {
        setSearchHistory(newHistory);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    }

    const handleSearch = debounce(async (text: string) => {
        setSearchTerm(text);
        if (!text) return;

        const res = await getRestaurantByName(text);
        if (res.data) {
            setProducts(res.data);

            // Lưu vào history nếu chưa có
            const newHistory = searchHistory.includes(text)
                ? searchHistory
                : [text, ...searchHistory].slice(0, 8);

            await saveHistory(newHistory);
        }
    }, 300);

    const DefaultResult = () => (
        <View style={{ backgroundColor: "white", padding: 10, gap: 10 }}>
            {searchHistory.length > 0 && (
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Lịch sử tìm kiếm</Text>
                    {searchHistory.map((item, idx) => (
                        <Pressable
                            key={idx}
                            onPress={() => handleSearch(item)}
                            style={{
                                paddingVertical: 6,
                                borderBottomWidth: 1,
                                borderBottomColor: "#eee",
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <MaterialIcons style={{ gap: 10, marginRight: 20 }} name="history" size={22} color="black" />
                            <Text style={{ fontSize: 17 }}>{item}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                flexDirection: "row", gap: 5,
                alignItems: "center",
                padding: 10
            }}>
                <MaterialIcons
                    onPress={() => router.back()}
                    name="arrow-back" size={24}
                    color={APP_COLOR.ORANGE}
                />
                <TextInput
                    placeholder="Tìm kiếm sản phẩm, thuộc tính và hơn thế nữa..."
                    onChangeText={(text: string) => handleSearch(text)}
                    autoFocus
                    style={{
                        flex: 1,
                        backgroundColor: "#eee",
                        paddingVertical: 3,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: APP_COLOR.ORANGE
                    }}
                />
            </View>
            <View style={{ backgroundColor: "#eee", flex: 1 }}>
                {searchTerm.length === 0 ?
                    <DefaultResult />
                    :
                    <View style={{ backgroundColor: "white", gap: 10 }}>
                        {products?.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => router.navigate({
                                    pathname: "/product/[id]",
                                    params: { id: item.id }
                                })}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 10,
                                    gap: 10,
                                    borderBottomColor: "#eee",
                                    borderBottomWidth: 1
                                }}>
                                <Image
                                    source={{ uri: `${getURLBaseBackEnd()}/images/${item.image}` }}
                                    style={{ height: 50, width: 50 }}
                                />
                                <Text>{item.name}</Text>
                            </Pressable>
                        ))}
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default SearchPage;
