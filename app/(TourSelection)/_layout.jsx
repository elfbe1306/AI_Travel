import { Stack } from "expo-router";

const TabsLayout = () => {
  return <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="index"/>
    <Stack.Screen name="tourStart"/>
    <Stack.Screen name="tourFinal"/>
    <Stack.Screen name="tourTransport"/>
    <Stack.Screen name="tourFinalPreview"/>
  </Stack>
}

export default TabsLayout