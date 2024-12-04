import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Colors } from '../../constants/Colors'
import TabBar from '../../components/TabBar';


export default function TabLayout() {
  return (
    <Tabs tabBar={props=> <TabBar {...props}/>} screenOptions = {{headerShown: false}}>
      <Tabs.Screen name="home" options={{title: "Nhà"}}/>
      <Tabs.Screen name="mytrip" options={{title: "Tour của tôi"}}/>
      <Tabs.Screen name="tourCreate" options={{title: ""}}/>
      <Tabs.Screen name="shareMoney" options={{title: "Chia tiền"}}/>
      <Tabs.Screen name="profile" options={{title: "Hồ sơ"}}/>
    </Tabs>
  )
}