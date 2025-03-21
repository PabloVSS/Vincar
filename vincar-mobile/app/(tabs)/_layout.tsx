import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
  
        }}
    >
  
        <Tabs.Screen
        name='passagers'
        options={{
          tabBarLabel: 'Passageiros', 
          headerShown: false,
          tabBarIcon: ({size, color}) => <Ionicons   name='search' size={size} color={color}/>
        }}
       />
        <Tabs.Screen
        name='ride' 
        options={{
          tabBarLabel: 'Motoristas', 
          headerShown: false,

          tabBarIcon: ({size, color}) => <Ionicons   name='car' size={size} color={color}/>
        }}
        />
        <Tabs.Screen
        name='ridesHistory'
        options={{
          tabBarLabel: 'Hitórico', 
          headerShown: false,
          tabBarIcon: ({size, color}) => <Ionicons   name='hourglass-outline' size={size} color={color}/>
        }}                                       
        />
       
        <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: 'Perfil', 
          headerShown: false,
          tabBarIcon: ({size, color}) => <Ionicons   name='person' size={size} color={color}/>
        }}                                       
        />
    </Tabs>
    </GestureHandlerRootView>
  )
}
