import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccountProfile, accountProfile } from '@/constants/account';
import { getProfileAvatarUri, setProfileAvatarUri } from '@/utils/profile-avatar';

function FieldRow({ label, value }: { label: string; value?: string }) {
  const displayValue = value?.trim() ? value : '-';

  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{displayValue}</Text>
    </View>
  );
}

function Section({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onEdit ? (
          <TouchableOpacity onPress={onEdit} style={styles.sectionEditBtn} hitSlop={10} activeOpacity={0.8}>
            <Ionicons name="pencil-outline" size={16} color="#004D40" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

type SectionField = { key: keyof AccountProfile; label: string; placeholder?: string };
type EditingSection = { title: string; fields: SectionField[] };

export default function MyAccountScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<AccountProfile>(accountProfile);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const [editingSection, setEditingSection] = useState<EditingSection | null>(null);
  const [draftSection, setDraftSection] = useState<Partial<AccountProfile>>({});

  const openSectionEditor = (section: EditingSection) => {
    setEditingSection(section);
    const initial: Partial<AccountProfile> = {};
    for (const f of section.fields) initial[f.key] = profile[f.key] as any;
    setDraftSection(initial);
  };

  const closeSectionEditor = () => {
    setEditingSection(null);
    setDraftSection({});
  };

  const saveSectionEditor = () => {
    if (!editingSection) return;
    setProfile(prev => ({ ...prev, ...draftSection }));
    closeSectionEditor();
  };

  React.useEffect(() => {
    getProfileAvatarUri().then(setAvatarUri);
  }, []);

  const handleChangeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;
    const uri = result.assets?.[0]?.uri;
    if (!uri) return;

    setAvatarUri(uri);
    await setProfileAvatarUri(uri);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Account</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileTop}>
          <TouchableOpacity onPress={handleChangeAvatar} activeOpacity={0.85}>
            <Image source={avatarUri ? { uri: avatarUri } : require('@/assets/images/mypic.jpeg')} style={styles.avatar} />
            <View style={styles.avatarEditBadge}>
              <Ionicons name="camera-outline" size={16} color="#FFF" />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{profile.fullName}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </View>
        </View>

        <Section
          title="Personal Information"
          onEdit={() =>
            openSectionEditor({
              title: 'Personal Information',
              fields: [
                { key: 'fullName', label: 'Full Name' },
                { key: 'gender', label: 'Gender' },
                { key: 'dateOfBirth', label: 'Date of Birth', placeholder: 'YYYY-MM-DD' },
                { key: 'nationality', label: 'Nationality' },
              ],
            })
          }>
          <FieldRow label="Full Name" value={profile.fullName} />
          <FieldRow label="Gender" value={profile.gender} />
          <FieldRow label="Date of Birth" value={profile.dateOfBirth} />
          <FieldRow label="Nationality" value={profile.nationality} />
        </Section>

        <Section
          title="Contact"
          onEdit={() =>
            openSectionEditor({
              title: 'Contact',
              fields: [
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
              ],
            })
          }>
          <FieldRow label="Email" value={profile.email} />
          <FieldRow label="Phone" value={profile.phone} />
        </Section>

        <Section
          title="Address"
          onEdit={() =>
            openSectionEditor({
              title: 'Address',
              fields: [
                { key: 'addressLine1', label: 'Address Line 1' },
                { key: 'addressLine2', label: 'Address Line 2' },
                { key: 'city', label: 'City' },
                { key: 'state', label: 'State' },
                { key: 'postalCode', label: 'Postal Code' },
                { key: 'country', label: 'Country' },
              ],
            })
          }>
          <FieldRow label="Address Line 1" value={profile.addressLine1} />
          <FieldRow label="Address Line 2" value={profile.addressLine2} />
          <FieldRow label="City" value={profile.city} />
          <FieldRow label="State" value={profile.state} />
          <FieldRow label="Postal Code" value={profile.postalCode} />
          <FieldRow label="Country" value={profile.country} />
        </Section>

        <Section
          title="Identity"
          onEdit={() =>
            openSectionEditor({
              title: 'Identity',
              fields: [
                { key: 'idType', label: 'ID Type' },
                { key: 'idNumber', label: 'ID Number' },
              ],
            })
          }>
          <FieldRow label="ID Type" value={profile.idType} />
          <FieldRow label="ID Number" value={profile.idNumber} />
        </Section>

        <Section
          title="Emergency Contact"
          onEdit={() =>
            openSectionEditor({
              title: 'Emergency Contact',
              fields: [
                { key: 'emergencyContactName', label: 'Name' },
                { key: 'emergencyContactPhone', label: 'Phone' },
              ],
            })
          }>
          <FieldRow label="Name" value={profile.emergencyContactName} />
          <FieldRow label="Phone" value={profile.emergencyContactPhone} />
        </Section>

        <Modal visible={editingSection !== null} transparent animationType="fade" onRequestClose={closeSectionEditor}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Update {editingSection?.title}</Text>

              {editingSection?.fields.map(f => (
                <View key={String(f.key)} style={styles.modalField}>
                  <Text style={styles.modalLabel}>{f.label}</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={String(draftSection[f.key] ?? '')}
                    onChangeText={text => setDraftSection(prev => ({ ...prev, [f.key]: text }))}
                    placeholder={f.placeholder ?? `Enter ${f.label}`}
                    placeholderTextColor="#9E9E9E"
                    autoCapitalize="none"
                  />
                </View>
              ))}

              <View style={styles.modalActions}>
                <TouchableOpacity onPress={closeSectionEditor} style={[styles.modalBtn, styles.modalBtnGhost]}>
                  <Text style={[styles.modalBtnText, styles.modalBtnGhostText]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveSectionEditor} style={[styles.modalBtn, styles.modalBtnPrimary]}>
                  <Text style={[styles.modalBtnText, styles.modalBtnPrimaryText]}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#004D40',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  avatarEditBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#004D40',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
    color: '#757575',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#004D40',
  },
  sectionEditBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#E7F3F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEE',
  },
  rowLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 20,
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 12,
  },
  modalField: {
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 6,
    fontWeight: '700',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  modalBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnGhost: {
    backgroundColor: '#F2F2F2',
  },
  modalBtnPrimary: {
    backgroundColor: '#004D40',
  },
  modalBtnText: {
    fontSize: 14,
    fontWeight: '800',
  },
  modalBtnGhostText: {
    color: '#333',
  },
  modalBtnPrimaryText: {
    color: '#FFF',
  },
});


