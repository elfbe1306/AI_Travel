import { Stack } from "expo-router";

const TabsLayout = () => {
    return <Stack initialRouteName="who" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="who"/>
        <Stack.Screen name="date"/>
    </Stack>
}

export default TabsLayout