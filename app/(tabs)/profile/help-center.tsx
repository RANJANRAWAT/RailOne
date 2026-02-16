import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Faq = { q: string; a: string };

export default function HelpCenterScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const faqs: Faq[] = useMemo(
    () => [
      { q: 'How to book a ticket?', a: 'Home tab se From/To fill karke Search Ticket press karein.' },
      { q: 'Where can I see my tickets?', a: 'My Ticket tab me aapke booked tickets dikh jayenge.' },
      { q: 'How to edit account details?', a: 'My Account page me section edit icon par tap karein.' },
      { q: 'How to logout?', a: 'Profile me Logout option par tap karein.' },
    ],
    []
  );

  const filtered = faqs.filter(f =>
    (f.q + ' ' + f.a).toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.searchCard}>
          <Ionicons name="search" size={18} color="#757575" />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search help..."
            placeholderTextColor="#9E9E9E"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>FAQs</Text>
          {filtered.map((f, idx) => (
            <View key={f.q} style={[styles.faqItem, idx === filtered.length - 1 && styles.faqLast]}>
              <Text style={styles.faqQ}>{f.q}</Text>
              <Text style={styles.faqA}>{f.a}</Text>
            </View>
          ))}
          {filtered.length === 0 ? <Text style={styles.empty}>No results found.</Text> : null}
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Need more help?</Text>
          <Text style={styles.contactText}>Email: support@example.com</Text>
          <Text style={styles.contactText}>Phone: +91 90000 00000</Text>
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
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: { flex: 1, fontSize: 14, fontWeight: '600', color: '#111' },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  title: { fontSize: 16, fontWeight: '800', color: '#111', marginBottom: 10 },
  faqItem: { paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#EEE' },
  faqLast: { borderBottomWidth: 0 },
  faqQ: { fontSize: 14, fontWeight: '800', color: '#004D40', marginBottom: 4 },
  faqA: { fontSize: 12, color: '#757575', lineHeight: 17, fontWeight: '600' },
  empty: { marginTop: 6, fontSize: 12, color: '#757575', fontWeight: '600' },
  contactCard: {
    marginTop: 12,
    backgroundColor: '#E7F3F1',
    borderRadius: 14,
    padding: 12,
  },
  contactTitle: { fontSize: 14, fontWeight: '900', color: '#0C6B5A', marginBottom: 6 },
  contactText: { fontSize: 12, color: '#0C6B5A', fontWeight: '700', lineHeight: 16 },
});


