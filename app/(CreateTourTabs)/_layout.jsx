import { Stack } from "expo-router";

const TabsLayout = () => {
    return <Stack initialRouteName="who" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="who"/>
        <Stack.Screen name="date"/>
        <Stack.Screen name="bugget"/>
    </Stack>
}

export default TabsLayout