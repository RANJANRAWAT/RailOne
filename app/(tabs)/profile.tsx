import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const menuItems = [
        { id: '1', title: 'My Account', icon: 'person-outline' },
        { id: '2', title: 'Password Manager', icon: 'lock-closed-outline' },
        { id: '3', title: 'Settings', icon: 'settings-outline' },
        { id: '4', title: 'Help Center', icon: 'help-circle-outline' },
        { id: '5', title: 'Logout', icon: 'log-out-outline', color: '#FF3B30' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { }} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Profile</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        {/* Placeholder for avatar */}
                        <Image
                            source={require('@/assets/images/mypic.jpeg')}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.userName}>Ranjan Rawat</Text>
                    <Text style={styles.userEmail}>ranjanrawat@gmail.com</Text>
                </View>

                {/* Menu */}
                <View style={styles.menuContainer}>
                    {menuItems.map(item => (
                        <TouchableOpacity key={item.id} style={styles.menuItem}>
                            <View style={styles.menuIconWrapper}>
                                <Ionicons name={item.icon as any} size={22} color={item.title === 'Logout' ? '#FF3B30' : '#004D40'} />
                            </View>
                            <Text style={[styles.menuText, item.title === 'Logout' && styles.logoutText]}>{item.title}</Text>
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
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
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
