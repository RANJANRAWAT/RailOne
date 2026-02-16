import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function SettingRow({
  label,
  description,
  value,
  onValueChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        {description ? <Text style={styles.rowDesc}>{description}</Text> : null}
      </View>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ true: '#0C6B5A' }} />
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <SettingRow
            label="Push Notifications"
            description="Ticket updates aur alerts"
            value={pushNotifications}
            onValueChange={setPushNotifications}
          />
          <View style={styles.divider} />
          <SettingRow
            label="Email Updates"
            description="Offers aur booking summaries"
            value={emailUpdates}
            onValueChange={setEmailUpdates}
          />
          <View style={styles.divider} />
          <SettingRow
            label="Dark Mode"
            description="App theme (UI stub)"
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            Abhi settings local UI state me hain. Backend/AsyncStorage connect kar doge to persist ho jayenge.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#004D40',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  rowLabel: { fontSize: 15, fontWeight: '800', color: '#111' },
  rowDesc: { fontSize: 12, color: '#757575', marginTop: 2 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#EEE' },
  noteCard: {
    marginTop: 12,
    backgroundColor: '#E7F3F1',
    borderRadius: 14,
    padding: 12,
  },
  noteText: { fontSize: 12, color: '#0C6B5A', lineHeight: 16, fontWeight: '600' },
});


