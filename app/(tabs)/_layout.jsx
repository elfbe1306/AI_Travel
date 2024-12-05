import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Colors } from '../../constants/Colors'; // Adjust path as needed

const TabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: "Nhà" }} />
      <Tabs.Screen name="mytrip" options={{ title: "Tour của tôi" }} />
      <Tabs.Screen name="tourCreate" options={{ title: "" }} />
      <Tabs.Screen name="shareMoney" options={{ title: "Chia tiền" }} />
      <Tabs.Screen name="profile" options={{ title: "Hồ sơ" }} />
    </Tabs>
  );
};

const TabBar = ({ state, descriptors, navigation }) => {
  const router = useRouter();

  // Define icons for each route
  const icons = {
    home: (props) => <Ionicons name="home-outline" size={24} {...props} />,
    mytrip: (props) => <Feather name="compass" size={24} {...props} />,
    tourCreate: (props) => (
      <Feather
        name="plus"
        size={24}
        style={styles.createIcon}
        {...props}
      />
    ),
    shareMoney: (props) => <SimpleLineIcons name="note" size={24} {...props} />,
    profile: (props) => <Ionicons name="person-circle-outline" size={24} {...props} />,
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'tourCreate') {
            router.push('/(CreateTourTabs)');
          } else {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            {icons[route.name]({
              color: isFocused ? Colors.DARK_GREEN : '#333',
            })}
            <Text
              style={[
                styles.tabbarLabel,
                { color: isFocused ? Colors.DARK_GREEN : '#333' },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 25,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabbarLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 5,
    fontFamily: 'nunito-bold',
  },
  createIcon: {
    backgroundColor: Colors.DARK_GREEN,
    padding: 12,
    borderRadius: 50,
    color: 'white',
  },
});

export default TabLayout;
