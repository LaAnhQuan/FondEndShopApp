import { Slot, Stack } from "expo-router"
import { Text, View } from "react-native"

const RootLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)"
                options={{ headerTitle: "Home" }}
            />
            <Stack.Screen name="product/index"
                options={{ headerTitle: "Product" }}
            />
            <Stack.Screen name="(auth)/login"
                options={{ headerTitle: "Login" }}
            />
        </Stack>
    )
}
export default RootLayout