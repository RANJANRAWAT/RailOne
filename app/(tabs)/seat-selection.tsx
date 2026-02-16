import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SeatSelectionScreen() {
    const router = useRouter();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const colLeft = [1, 2];
    const colRight = [3, 4, 5];

    // Mock booked seats
    const bookedSeats = ['A3', 'B2', 'D1', 'E5'];

    const toggleSeat = (seatId: string) => {
        if (bookedSeats.includes(seatId)) return;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const getSeatStyle = (seatId: string) => {
        if (bookedSeats.includes(seatId)) return styles.seatBooked;
        if (selectedSeats.includes(seatId)) return styles.seatSelected;
        return styles.seatAvailable;
    };

    const getSeatTextStyle = (seatId: string) => {
        if (bookedSeats.includes(seatId)) return styles.seatTextBooked;
        if (selectedSeats.includes(seatId)) return styles.seatTextSelected;
        return styles.seatTextAvailable;
    };

    const handleContinue = () => {
        if (selectedSeats.length === 0) return;
        router.push({
            pathname: '/passenger-details',
            params: { seats: selectedSeats.join(',') },
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Your Seat</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Trip Summary Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.trainName}>Jahanabad Express</Text>
                        <Text style={styles.seatClass}>S Chair</Text>
                    </View>
                    <View style={styles.routeRow}>
                        <View>
                            <Text style={styles.stationCode}>GAY</Text>
                            <Text style={styles.stationName}>Gaya</Text>
                        </View>
                        <View>
                            <Text style={styles.stationCode}>DEL</Text>
                            <Text style={styles.stationName}>Delhi</Text>
                        </View>
                    </View>
                    <View style={styles.timeRow}>
                        <View>
                            <Text style={styles.time}>08:00 PM</Text>
                            <Text style={styles.date}>11 Sep, 2025</Text>
                        </View>
                        <View style={styles.durationContainer}>
                            <Ionicons name="time-outline" size={16} color="#999" />
                            <Text style={styles.duration}>Duration 7h 45m</Text>
                        </View>
                        <View>
                            <Text style={styles.time}>11:45 PM</Text>
                            <Text style={styles.date}>11 Sep, 2025</Text>
                        </View>
                    </View>
                </View>

                {/* Legend */}
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, styles.seatAvailable]} />
                        <Text style={styles.legendText}>Available</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, styles.seatSelected]} />
                        <Text style={styles.legendText}>Selected</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, styles.seatBooked]} />
                        <Text style={styles.legendText}>Booked</Text>
                    </View>
                </View>

                {/* Seat Grid */}
                <View style={styles.gridContainer}>
                    <View style={styles.columnHeader}>
                        <Text style={styles.columnHeaderText}>S Chair (A)</Text>
                        <Text style={styles.columnHeaderText}>S Chair (B)</Text>
                        <Text style={styles.columnHeaderText}>S Chair (C)</Text>
                    </View>

                    {rows.map(row => (
                        <View key={row} style={styles.rowContainer}>
                            {/* Left Side (2 seats) */}
                            <View style={styles.sideContainer}>
                                {colLeft.map(col => {
                                    const seatId = `${row}${col}`;
                                    return (
                                        <TouchableOpacity
                                            key={seatId}
                                            style={[styles.seat, getSeatStyle(seatId)]}
                                            onPress={() => toggleSeat(seatId)}
                                            disabled={bookedSeats.includes(seatId)}>
                                            <Text style={[styles.seatText, getSeatTextStyle(seatId)]}>{seatId}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            {/* Center Label (Row Name) */}
                            {/* <Text style={styles.rowLabel}>{row}</Text> */}

                            {/* Right Side (3 seats) */}
                            <View style={styles.sideContainer}>
                                {colRight.map(col => {
                                    const seatId = `${row}${col}`;
                                    return (
                                        <TouchableOpacity
                                            key={seatId}
                                            style={[styles.seat, getSeatStyle(seatId)]}
                                            onPress={() => toggleSeat(seatId)}
                                            disabled={bookedSeats.includes(seatId)}>
                                            <Text style={[styles.seatText, getSeatTextStyle(seatId)]}>{seatId}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, selectedSeats.length === 0 && styles.buttonDisabled]}
                    onPress={handleContinue}
                    disabled={selectedSeats.length === 0}>
                    <Text style={styles.buttonText}>
                        Continue{selectedSeats.length ? ` (${selectedSeats.length})` : ''}
                    </Text>
                </TouchableOpacity>
            </View>
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
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFF',
        margin: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
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
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 15,
    },
    stationCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    stationName: {
        fontSize: 12,
        color: '#757575',
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
        marginTop: 4,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    legendBox: {
        width: 20,
        height: 20,
        borderRadius: 6,
    },
    legendText: {
        fontSize: 12,
        color: '#757575',
    },
    gridContainer: {
        paddingHorizontal: 20,
    },
    columnHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    columnHeaderText: {
        fontSize: 12,
        color: '#999',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    sideContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    seat: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    seatAvailable: {
        backgroundColor: '#FFF',
        borderColor: '#E0E0E0',
    },
    seatSelected: {
        backgroundColor: '#FF9800',  // Orange
        borderColor: '#FF9800',
    },
    seatBooked: {
        backgroundColor: '#004D40', // Dark Green
        borderColor: '#004D40',
    },
    seatText: {
        fontSize: 12,
        fontWeight: '600',
    },
    seatTextAvailable: {
        color: '#757575',
    },
    seatTextSelected: {
        color: '#FFF',
    },
    seatTextBooked: {
        color: '#FFF',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    button: {
        backgroundColor: '#004D40',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

});
