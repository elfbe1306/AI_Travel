import { Stack } from "expo-router";

const TabsLayout = () => {
  return <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="index"/>
    <Stack.Screen name="moneySharingHome"/>
    <Stack.Screen name="moneySharingTable"/>
    <Stack.Screen name="moneySharingFinal"/>
  </Stack>
}

export default TabsLayout