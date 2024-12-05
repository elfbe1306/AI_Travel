import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router'; // Ensure your navigation setup is correct
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'nunito': require('../assets/fonts/Nunito-Regular.ttf'),
    'nunito-medium': require('../assets/fonts/Nunito-Medium.ttf'),
    'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'nunito-extrabold': require('../assets/fonts/Nunito-ExtraBold.ttf'),
    'nunito-semibold': require('../assets/fonts/Nunito-SemiBold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) {
        await SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible
      } else {
        await SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
