import { Stack } from "expo-router";
import { useFonts } from 'expo-font';

export default function RootLayout() {

  useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'nunito': require('../assets/fonts/Nunito-Regular.ttf'),
    'nunito-medium': require('../assets/fonts/Nunito-Medium.ttf'),
    'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
  })

  return <Stack screenOptions={{headerShown: false}} />;
}
