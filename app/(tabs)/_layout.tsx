import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#004D40', // Dark Green
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-ticket"
        options={{
          title: 'My Ticket',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="ticket-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="train-info"
        options={{
          title: 'Train Info',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="train-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="person-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide this tab
        }}
      />
      <Tabs.Screen
        name="search-results"
        options={{
          href: null,
          title: 'Search Results',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="seat-selection"
        options={{
          href: null,
          title: 'Seat Selection',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="passenger-details"
        options={{
          href: null,
          title: 'Passenger Details',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="booking-details"
        options={{
          href: null,
          title: 'Booking Details',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="ticket-details"
        options={{
          href: null,
          title: 'Ticket Details',
          headerShown: false
        }}
      />

    </Tabs>
  );
}
