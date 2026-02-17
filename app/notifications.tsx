import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NotificationItem = {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
};

const notifications: NotificationItem[] = [
    {
        id: '1',
        title: 'Booking Confirmed',
        message: 'Your ticket for Jahanabad Express has been successfully booked.',
        time: '2 mins ago',
        read: false,
        icon: 'checkmark-circle',
        color: '#4CAF50',
    },
    {
        id: '2',
        title: 'Special Offer',
        message: 'Get 10% discount on your next trip to Dhaka! Use code: TRAVEL10',
        time: '1 hour ago',
        read: false,
        icon: 'pricetag',
        color: '#FF9800',
    },
    {
        id: '3',
        title: 'System Update',
        message: 'We have updated our privacy policy. Please review the changes.',
        time: 'Yesterday',
        read: true,
        icon: 'information-circle',
        color: '#2196F3',
    },
    {
        id: '4',
        title: 'Trip Reminder',
        message: 'Your trip to Chittagong is scheduled for tomorrow at 08:00 AM.',
        time: '2 days ago',
        read: true,
        icon: 'time',
        color: '#9C27B0',
    },
];

export default function NotificationsScreen() {
    const router = useRouter();

    const renderItem = ({ item }: { item: NotificationItem }) => (
        <View style={[styles.card, !item.read && styles.unreadCard]}>
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>
                    {item.message}
                </Text>
            </View>
            {!item.read && <View style={styles.dot} />}
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={64} color="#CCC" />
                        <Text style={styles.emptyText}>No notifications yet</Text>
                    </View>
                }
            />
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
    listContent: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    unreadCard: {
        backgroundColor: '#F0F9F8', // Very light green tint
        borderLeftWidth: 4,
        borderLeftColor: '#004D40',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    message: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF5252',
        marginLeft: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#999',
    },
});
