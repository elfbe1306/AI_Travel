import { Stack } from "expo-router";

const TabsLayout = () => {
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="who"/>
        <Stack.Screen name="date"/>
        <Stack.Screen name="bugget"/>
        <Stack.Screen name="search"/>
        <Stack.Screen name="review"/>
        <Stack.Screen name="loading"/>
    </Stack>
}

export default TabsLayout