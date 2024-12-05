import { Stack } from "expo-router";

const TabsLayout = () => {
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="who"/>
        <Stack.Screen name="date"/>
    </Stack>
}

export default TabsLayout