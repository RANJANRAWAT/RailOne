import { Stack } from 'expo-router';
import React from 'react';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="my-account" />
      <Stack.Screen name="password-manager" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="help-center" />
    </Stack>
  );
}


