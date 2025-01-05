import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons'; // Home Icon
import Feather from '@expo/vector-icons/Feather'; // MyTrip Icon
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'; // ShareMoney Icon
import { useRouter } from 'expo-router';

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    home: (props) => <Ionicons name="home-outline" size={24} color="black" {...props} />,
    mytrip: (props) => <Feather name="compass" size={24} color="black" {...props} />,
    tourCreate: (props) => (
      <Feather
        name="plus"
        size={24}
        borderRadius={99}
        backgroundColor={Colors.DARK_GREEN}
        padding={12}
        {...props}
      />
    ),
    shareMoney: (props) => <SimpleLineIcons name="note" size={24} color="black" {...props} />,
    profile: (props) => <Ionicons name="person-circle-outline" size={24} color="black" {...props} />,
  };

  const router = useRouter();

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'tourCreate') {
            router.push('/(CreateTourTabs)'); // Use router for the custom route
          }
          // else if(route.name === 'mytrip') {
          //   router.push('/(TourSelection)'); // Để tạm thời để testing có gì fix lại sau
          // } 
          else if(route.name === 'shareMoney') {
            router.push('/(MoneySharing)');
          }
          else {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params); // Default navigation for other tabs
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
            style={styles.tabbarItem}
            key={route.key} // Important for unique identification
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]({
              color: isFocused ? Colors.DARK_GREEN : '#333',
            })}

            <Text
              style={{
                color: isFocused ? Colors.DARK_GREEN : '#333',
                fontWeight: isFocused ? 'bold' : 'normal',
                fontFamily: 'nunito-bold',
                fontSize: 10,
              }}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 20,
    borderCurve: 'continuous',
    backgroundColor: 'white',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBar;