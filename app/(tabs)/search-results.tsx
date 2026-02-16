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

const searchResults = [
    {
        id: '1',
        name: 'Sundarban Express',
        price: 'BDT 625',
        from: 'GAY',
        to: 'DEL',
        departureTime: '08:00 AM',
        arrivalTime: '03:45 PM',
        duration: '7h 40m',
        date: '11 Sep, 2025',
    },
    {
        id: '2',
        name: 'Chitra Express',
        price: 'BDT 680',
        from: 'GAY',
        to: 'DEL',
        departureTime: '06:30 PM',
        arrivalTime: '02:00 AM',
        duration: '7h 30m',
        date: '11 Sep, 2025',
    },
    {
        id: '3',
        name: 'Benapole Express',
        price: 'BDT 700',
        from: 'GAY',
        to: 'DEL',
        departureTime: '11:15 PM',
        arrivalTime: '06:20 AM',
        duration: '7h 05m',
        date: '11 Sep, 2025',
    },
];

const dates = [
    { day: '09', week: 'Tue' },
    { day: '10', week: 'Wed' },
    { day: '11', week: 'Thu', active: true },
    { day: '12', week: 'Fri' },
    { day: '13', week: 'Sat' },
];

export default function SearchResultsScreen() {
    const router = useRouter();

    const handleSelectTrip = () => {
        router.push('/seat-selection');
    };

    const renderItem = ({ item }: { item: typeof searchResults[0] }) => (
        <TouchableOpacity style={styles.card} onPress={handleSelectTrip}>
            <View style={styles.cardHeader}>
                <Text style={styles.trainName}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>

            <View style={styles.routeContainer}>
                <View>
                    <Text style={styles.stationCode}>{item.from}</Text>
                    <Text style={styles.stationName}>Gaya</Text>
                </View>
                <View style={styles.routeIconContainer}>
                    <Ionicons name="train-outline" size={20} color="#004D40" />
                    <View style={styles.dottedLine} />
                </View>
                <View>
                    <Text style={styles.stationCode}>{item.to}</Text>
                    <Text style={styles.stationName}>Delhi</Text>
                </View>
            </View>

            <View style={styles.timeContainer}>
                <View>
                    <Text style={styles.time}>{item.departureTime}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.duration}>Duration {item.duration}</Text>
                <View>
                    <Text style={styles.time}>{item.arrivalTime}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Search Result</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Trip Info Summary Card (Optional/Top) */}
            <View style={styles.tripSummary}>
                <View style={styles.row}>
                    <Text style={styles.summaryCode}>GAY</Text>
                    <Ionicons name="train" size={16} color="#004D40" style={{ marginHorizontal: 10 }} />
                    <Text style={styles.summaryCode}>DEL</Text>
                </View>
                <Text style={styles.summaryDetail}>Gaya to Delhi • S Chair</Text>
            </View>

            {/* Date Check Strip */}
            <View style={styles.dateStrip}>
                {dates.map((d, index) => (
                    <View key={index} style={[styles.dateItem, d.active && styles.activeDateItem]}>
                        <Text style={[styles.dateTextDay, d.active && styles.activeDateText]}>{d.day}</Text>
                        <Text style={[styles.dateTextWeek, d.active && styles.activeDateText]}>{d.week}</Text>
                    </View>
                ))}
            </View>




            <FlatList
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
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
    tripSummary: {
        backgroundColor: '#FFF',
        margin: 20,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    summaryCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    summaryDetail: {
        color: '#757575',
        fontSize: 12,
    },
    dateStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    dateItem: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        width: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    activeDateItem: {
        backgroundColor: '#004D40',
    },
    dateTextDay: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    dateTextWeek: {
        fontSize: 12,
        color: '#757575',
    },
    activeDateText: {
        color: '#FFF',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 20,
        marginBottom: 10,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
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
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#004D40',
    },
    routeContainer: {
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
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    dottedLine: {
        height: 1,
        width: '60%',
        backgroundColor: '#E0E0E0',
        marginTop: 4,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        padding: 12,
        borderRadius: 12,
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
    duration: {
        fontSize: 10,
        color: '#757575',
    },
});
