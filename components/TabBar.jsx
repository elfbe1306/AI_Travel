import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'; // Home Icon
import Feather from '@expo/vector-icons/Feather'; // MyTrip Icon
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'; // ShareMoney Icon

const TabBar = ({ state, descriptors, navigation }) => {

    const icons = {
        home: (props) => <Ionicons name="home-outline" size={24} color="black" {...props}/>,
        mytrip: (props) => <Feather name="compass" size={24} color="black" {...props}/>,
        tourCreate: (props) => <Feather name="plus" size={24} color="black" borderRadius={99} backgroundColor={Colors.DARK_GREEN} padding={12} {...props}/>,
        shareMoney: (props) => <SimpleLineIcons name="note" size={24} color="black" {...props}/>,
        profile: (props) => <Ionicons name="person-circle-outline" size={24} color="black" {...props}/>
    }

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
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity style={styles.tabbarItem}
            key={route.key} // Important for unique identification
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >

            {
                icons[route.name]
                ({
                    color: route.name !== 'tourCreate' && isFocused ? Colors.DARK_GREEN : '#333',
                    color: route.name === 'tourCreate' && isFocused ? 'white' : '#333',
                })
            }

            <Text
              style={{
                color: isFocused ? Colors.DARK_GREEN : '#333', // Replace with your theme's colors if needed
                fontWeight: isFocused ? 'bold' : 'normal',
                fontFamily: 'nunito-bold',
                fontSize: 10
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
        borderCurve: 'continuous'
    },
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default TabBar;
