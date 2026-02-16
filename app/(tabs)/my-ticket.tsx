import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tickets = [
    {
        id: '1',
        trainName: 'Jahanabad Express',
        seatClass: 'S Chair | D1,D2',
        fromCode: 'GAY',
        fromName: 'Gaya',
        toCode: 'DEL',
        toName: 'Delhi',
        departureTime: '08:00 PM',
        departureDate: '11 Aug, 2025',
        arrivalTime: '11:45 PM',
        arrivalDate: '11 Aug, 2025',
        duration: '3h 45m',
        status: 'Completed'
    },
    {
        id: '2',
        trainName: 'Jahanabad Express',
        seatClass: 'S Chair | A1',
        fromCode: 'GAY',
        fromName: 'Gaya',
        toCode: 'DEL',
        toName: 'Delhi',
        departureTime: '08:00 PM',
        departureDate: '18 Jan, 2025',
        arrivalTime: '11:45 PM',
        arrivalDate: '18 Jan, 2025',
        duration: '3h 45m',
        status: 'Completed'
    },
    {
        id: '3',
        trainName: 'Jahanabad Express',
        seatClass: 'S Chair | F1',
        fromCode: 'GAY',
        fromName: 'Gaya',
        toCode: 'DEL',
        toName: 'Delhi',
        departureTime: '08:00 PM',
        departureDate: '18 Jan, 2025',
        arrivalTime: '11:45 PM',
        arrivalDate: '18 Jan, 2025',
        duration: '3h 45m',
        status: 'Completed'
    }
];

export default function MyTicketScreen() {
    const [activeTab, setActiveTab] = useState('Completed');

    const tabs = ['Ongoing', 'Completed', 'Cancelled'];

    const filteredTickets = tickets.filter(t => t.status === activeTab);

    const renderItem = ({ item }: { item: typeof tickets[0] }) => (
        <View style={styles.ticketCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.trainName}>{item.trainName}</Text>
                <Text style={styles.seatClass}>{item.seatClass}</Text>
            </View>
            <View style={styles.routeRow}>
                <View>
                    <Text style={styles.stationCode}>{item.fromCode}</Text>
                    <Text style={styles.stationName}>{item.fromName}</Text>
                </View>
                <View style={styles.routeIconContainer}>
                    <View style={styles.dottedLine} />
                    <View style={styles.trainIconWrapper}>
                        <Ionicons name="train" size={16} color="#004D40" />
                    </View>
                </View>
                <View>
                    <Text style={styles.stationCode}>{item.toCode}</Text>
                    <Text style={styles.stationName}>{item.toName}</Text>
                </View>
            </View>
            <View style={styles.timeRow}>
                <View>
                    <Text style={styles.time}>{item.departureTime}</Text>
                    <Text style={styles.date}>{item.departureDate}</Text>
                </View>
                <View style={styles.durationContainer}>
                    <Text style={styles.duration}>Duration {item.duration}</Text>
                </View>
                <View>
                    <Text style={styles.time}>{item.arrivalTime}</Text>
                    <Text style={styles.date}>{item.arrivalDate}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    {/* Placeholder for back if needed, but this is a main tab */}
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Ticket</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredTickets}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No tickets found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F4', // Slightly darker/tealish bg from image
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
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#004D40',
        paddingBottom: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    tabItem: {
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTabItem: {
        borderBottomColor: '#FFF',
    },
    tabText: {
        color: '#A7C0BD',
        fontSize: 14,
        fontWeight: '600',
    },
    activeTabText: {
        color: '#FFF',
    },
    listContent: {
        padding: 20,
    },
    ticketCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    trainName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    seatClass: {
        fontSize: 14,
        color: '#757575',
    },
    routeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    stationCode: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    stationName: {
        fontSize: 12,
        color: '#757575',
    },
    routeIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
    },
    dottedLine: {
        height: 1,
        width: '100%',
        backgroundColor: '#E0E0E0',
        position: 'absolute',
    },
    trainIconWrapper: {
        backgroundColor: '#E0F2F1',
        padding: 4,
        borderRadius: 12,
        zIndex: 1,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 10,
        color: '#757575',
    },
    durationContainer: {
        alignItems: 'center',
    },
    duration: {
        fontSize: 10,
        color: '#999',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: '#999',
        fontSize: 16,
    },
});
