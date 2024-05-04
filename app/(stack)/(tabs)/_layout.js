import React from 'react';
import { Tabs } from 'expo-router';
import { SquarePlay , Home, LayoutGrid, SquareUserRound}  from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs 
        initialRouteName='profile'
        screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#3E59AE', headerShown: false, tabBarShowLabel: false, 
        tabBarActiveBackgroundColor: '#FFFBF9', tabBarInactiveBackgroundColor: '#FFFBF9', 
        tabBarStyle: { borderTopWidth: 0, elevation: 0, shadowOpacity: 0, shadowOffset: { height: 0, width: 0 }, shadowRadius: 0, shadowColor: 'transparent' },
      })}
    >

    <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => 
            focused ? <Home size={28} color='#3E59AE'  strokeWidth={2}/> : <Home size={28}  color={color} strokeWidth={1}/>,
          }}
      />
     
      <Tabs.Screen
        name="pins"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => 
          focused ? <LayoutGrid size={28}  strokeWidth={2} color="#84DCC6" /> : <LayoutGrid size={28}  strokeWidth={1} color={color} />,
        }}
      />

    <Tabs.Screen
        name="reels"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => 
          focused ? <SquarePlay size={28}  strokeWidth={2} color="#DD5746" /> : <SquarePlay size={28}  strokeWidth={1} color={color} />,
        }}
      />

    <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => 
          focused ? <SquareUserRound size={28}  strokeWidth={2} color="#8A96FF" /> : <SquareUserRound size={28}  strokeWidth={1} color={color} />,
        }}
      /> 

    
    </Tabs>
  );
} 