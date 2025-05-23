import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import { APP_COLOR } from "@/utils/constant";

const TabLayout = () => {

    const getIcons = (routeName: string, focused: boolean, size: number) => {
        if (routeName === "index") {
            return (
                <Foundation
                    name="home"
                    size={size}
                    color={focused ? APP_COLOR.ORANGE : APP_COLOR.GREY}
                />)

        }
        if (routeName === "mall") {
            return (
                <MaterialIcons
                    name="local-mall"
                    size={size}
                    color={focused ? APP_COLOR.ORANGE : APP_COLOR.GREY}
                />
            )
        }

        if (routeName === "livestream") {
            return (
                // <AntDesign
                //     name="heart"
                //     size={size}
                //     color={APP_COLOR.ORANGE}
                // />
                <MaterialIcons
                    name="live-tv"
                    size={size}
                    color={focused ? APP_COLOR.ORANGE : APP_COLOR.GREY}
                />
                // :
                // <AntDesign
                //     name="hearto"
                //     size={size}
                //     color={APP_COLOR.GREY}
                // />
            )
        }

        if (routeName === "notification") {
            return (
                focused ?
                    <Octicons name="bell-fill"
                        size={size}
                        color={APP_COLOR.ORANGE}
                    />
                    :
                    <Octicons name="bell"
                        size={size}
                        color={APP_COLOR.GREY}
                    />
            )
        }

        if (routeName === "account") {
            return (
                focused ?
                    <MaterialCommunityIcons name="account" size={size} color={APP_COLOR.ORANGE} />
                    :
                    <MaterialCommunityIcons name="account-outline" size={size} color={APP_COLOR.GREY} />
            )
        }

        return (<>
        </>)
    }

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return getIcons(route.name, focused, size);
                },
                headerShown: false,
                tabBarLabelStyle: { paddingBottom: 3 },
                tabBarActiveTintColor: APP_COLOR.ORANGE,
            })}
        // sceneContainerStyle={{ backgroundColor: "#fff" }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home"
                }}
            />
            <Tabs.Screen
                name="mall"
                options={{
                    title: "Mall"
                }}
            />
            <Tabs.Screen
                name="livestream"
                options={{
                    title: "Live & Video"
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: "Notification"
                }}
            />

            <Tabs.Screen
                name="account"
                options={{
                    title: "Account"
                }}
            />

        </Tabs>
    )
}

export default TabLayout;