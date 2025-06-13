import * as React from 'react'
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import SectionList from 'react-native-tabs-section-list';
import { APP_COLOR } from '@/utils/constant';
import { getURLBaseBackEnd } from '@/utils/api';
import { currencyFormatter } from '@/utils/format';
import { router } from 'expo-router';


const SectionListLibrary = React.forwardRef(
    (props: any, ref: any) => {
        const { section } = props
        return (
            <SectionList
                showsHorizontalScrollIndicator={false}
                ref={ref}
                {...props}
                sections={section}
                keyExtractor={item => item.title}
                stickySectionHeadersEnabled={false}
                scrollToLocationOffset={50}
                tabBarStyle={styles.tabBar}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderTab={({ title, isActive }) => (
                    <View
                        style={[
                            styles.tabContainer,
                            { borderBottomWidth: isActive ? 1 : 0 }
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                { color: isActive ? APP_COLOR.ORANGE : '#9e9e9e' }
                            ]}
                        >
                            {title}
                        </Text>
                    </View>
                )}
                renderSectionHeader={({ section }) => (
                    <View>
                        <View style={styles.sectionHeaderContainer} />
                        <Text style={styles.sectionHeaderText}>{section.title}</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.navigate({
                            pathname: "(user)/product/[id]",
                            params: { id: item.id }
                        })}
                    >
                        <View style={styles.itemContainer}>
                            <View>
                                <Image style={{ height: 80, width: 80 }}
                                    source={{ uri: `${getURLBaseBackEnd()}/images/${item.image}` }} />
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <View style={styles.priceButtonContainer}>
                                    <View>
                                        <Text style={styles.itemPrice}>{currencyFormatter(item.price)}</Text>
                                        <Text style={styles.hotSaleText}>Đang bán chạy</Text>
                                    </View>
                                    <Text style={styles.buyNowText}>
                                        Mua ngay
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        );
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6'
    },
    tabBar: {
        backgroundColor: '#fff',
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1
    },
    tabContainer: {
        borderBottomColor: '#090909'
    },
    tabText: {
        padding: 15,
        color: '#9e9e9e',
        fontSize: 18,
        fontWeight: '500'
    },
    separator: {
        height: 0.5,
        width: '96%',
        alignSelf: 'flex-end',
        backgroundColor: '#eaeaea'
    },
    sectionHeaderContainer: {
        height: 20,
        backgroundColor: '#f6f6f6',
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1
    },
    sectionHeaderText: {
        color: APP_COLOR.ORANGE,
        backgroundColor: '#fff',
        fontSize: 20,
        paddingTop: 25,
        paddingBottom: 5,
        paddingHorizontal: 15
    },
    itemContainer: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        flexDirection: "row",
        gap: 20,
        justifyContent: "space-between",
        alignItems: 'center',
    },
    itemRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    priceButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    itemTitle: {
        flex: 1,
        fontSize: 17,
        color: '#131313',
        marginBottom: 10,
    },
    itemPrice: {
        fontSize: 16,
        color: APP_COLOR.ORANGE,
    },
    hotSaleText: {
        backgroundColor: APP_COLOR.ORANGE,
        color: "white",
        paddingHorizontal: 30,
        paddingVertical: 1,
        fontSize: 12,
        borderRadius: 10,
        marginTop: 5,
    },
    buyNowText: {
        backgroundColor: APP_COLOR.ORANGE,
        color: "white",
        paddingHorizontal: 14,
        paddingVertical: 7,
        fontSize: 14,
    },
});

export default SectionListLibrary;