import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { accountProfile } from '@/constants/account';
import { getProfileAvatarUri, setProfileAvatarUri } from '@/utils/profile-avatar';

type MenuItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress?: () => void;
};

export default function ProfileScreen() {
  const router = useRouter();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    getProfileAvatarUri().then(setAvatarUri);
  }, []);

  const avatarSource = useMemo(() => {
    if (avatarUri) return { uri: avatarUri };
    return require('@/assets/images/mypic.jpeg');
  }, [avatarUri]);

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

  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: 'My Account',
      icon: 'person-outline',
      onPress: () => router.push('/(tabs)/profile/my-account'),
    },
    {
      id: '2',
      title: 'Password Manager',
      icon: 'lock-closed-outline',
      onPress: () => router.push('/(tabs)/profile/password-manager'),
    },
    {
      id: '3',
      title: 'Settings',
      icon: 'settings-outline',
      onPress: () => router.push('/(tabs)/profile/settings'),
    },
    {
      id: '4',
      title: 'Help Center',
      icon: 'help-circle-outline',
      onPress: () => router.push('/(tabs)/profile/help-center'),
    },
    {
      id: '5',
      title: 'Logout',
      icon: 'log-out-outline',
      color: '#FF3B30',
      onPress: () => router.replace('/auth/login'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.avatarContainer} activeOpacity={0.85}>
            <Image source={avatarSource} style={styles.avatar} />
            {/* <View style={styles.avatarEditBadge}>
              <Ionicons name="camera-outline" size={16} color="#FFF" />
            </View> */}
          </TouchableOpacity>
          <Text style={styles.userName}>{accountProfile.fullName}</Text>
          <Text style={styles.userEmail}>{accountProfile.email}</Text>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              disabled={!item.onPress}
              activeOpacity={0.8}>
              <View style={styles.menuIconWrapper}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.title === 'Logout' ? '#FF3B30' : '#004D40'}
                />
              </View>
              <Text style={[styles.menuText, item.title === 'Logout' && styles.logoutText]}>
                {item.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
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
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarEditBadge: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#004D40',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#757575',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0F4F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutText: {
    color: '#FF3B30',
  },
});


