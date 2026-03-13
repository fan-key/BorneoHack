import { router, Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#ffffff' }, // keep white background
        tabBarActiveTintColor: 'limegreen',
        tabBarInactiveTintColor: 'rgba(0,0,0,0.4)', // grey when not selected
        headerShown: true,
        tabBarButton: HapticTab,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginLeft: 12 }}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        ),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Analisis',
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="voice"
        options={{
          title: 'Tanya AI',
          tabBarIcon: ({ color }) => (
            <Ionicons name="mic" size={28} color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="library"
        options={{
          title: 'Panduan',
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Sejarah',
          tabBarIcon: ({ color }) => (
            <Ionicons name="time" size={28} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
