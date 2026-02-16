import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Passenger = {
    name: string;
    type: string;
    seat?: string;
};

export default function BookingDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{
        seats?: string;
        passengers?: string;
        email?: string;
        phone?: string;
        idType?: string;
        idNumber?: string;
    }>();
    const [paymentMethod, setPaymentMethod] = useState('Bkash');

    const seats =
        typeof params.seats === 'string' && params.seats.trim().length
            ? params.seats
                  .split(',')
                  .map(s => s.trim())
                  .filter(Boolean)
            : [];

    const passengers: Passenger[] = (() => {
        if (!params.passengers || typeof params.passengers !== 'string') return [];
        try {
            const decoded = decodeURIComponent(params.passengers);
            const parsed = JSON.parse(decoded) as Passenger[];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    })();

    const handlePayNow = () => {
        router.push({
            pathname: '/ticket-details',
            params: {
                seats: seats.join(','),
                passengers: typeof params.passengers === 'string' ? params.passengers : undefined,
                email: typeof params.email === 'string' ? params.email : undefined,
                phone: typeof params.phone === 'string' ? params.phone : undefined,
                idType: typeof params.idType === 'string' ? params.idType : undefined,
                idNumber: typeof params.idNumber === 'string' ? params.idNumber : undefined,
            },
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking Details</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Trip Summary Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.trainName}>Jahanabad Express</Text>
                        <Text style={styles.seatClass}>
                            S Chair | {seats.length ? seats.join(', ') : '—'}
                        </Text>
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
                            <Text style={styles.duration}>Duration 3h 45m</Text>
                        </View>
                        <View>
                            <Text style={styles.time}>11:45 PM</Text>
                            <Text style={styles.date}>11 Sep, 2025</Text>
                        </View>
                    </View>
                </View>

                {/* Passenger Details Summary */}
                <Text style={styles.sectionTitle}>Passenger Details</Text>
                <View style={styles.detailsCard}>
                    {passengers.length ? (
                        passengers.map((p, idx) => (
                            <View key={`${p.seat ?? 'seat'}-${idx}`} style={styles.passengerCard}>
                                <View style={styles.passengerHeaderRow}>
                                    <Text style={styles.passengerTitle}>
                                        Passenger {String(idx + 1).padStart(2, '0')}
                                    </Text>
                                    <Text style={styles.passengerSeat}>{p.seat ? `Seat ${p.seat}` : ''}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Passenger Name</Text>
                                    <Text style={styles.detailValue}>{p.name || '—'}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Passenger Type</Text>
                                    <Text style={styles.detailValue}>{p.type || '—'}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>No passenger data found.</Text>
                    )}
                </View>

                {/* Contact Info Summary */}
                <Text style={styles.sectionTitle}>Contact Info</Text>
                <View style={styles.detailsCard}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Email Address</Text>
                        <Text style={styles.detailValue}>{typeof params.email === 'string' ? params.email : '—'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Phone Number</Text>
                        <Text style={styles.detailValue}>{typeof params.phone === 'string' ? params.phone : '—'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Identity Type</Text>
                        <Text style={styles.detailValue}>{typeof params.idType === 'string' ? params.idType : '—'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Identity Number</Text>
                        <Text style={styles.detailValue}>
                            {typeof params.idNumber === 'string' ? params.idNumber : '—'}
                        </Text>
                    </View>
                </View>

                {/* Payment Details */}
                <Text style={styles.sectionTitle}>Payment Details</Text>
                <View style={styles.detailsCard}>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Subtotal</Text>
                        <Text style={styles.paymentValue}>BDT 890.00</Text>
                    </View>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Tax</Text>
                        <Text style={styles.paymentValue}>BDT 50.00</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.paymentRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>BDT 940</Text>
                    </View>
                </View>

                {/* Payment Method */}
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <View style={styles.paymentMethodCard}>
                    <View style={styles.paymentMethodHeader}>
                        {/* Placeholder icon for Bkash */}
                        <View style={styles.paymentIconPlaceholder}>
                            <Ionicons name="wallet-outline" size={24} color="#E2136E" />
                        </View>
                        <Text style={styles.paymentMethodName}>Bkash</Text>
                    </View>
                    <Ionicons name="chevron-down" size={24} color="#999" />
                </View>

            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.totalPrice}>BDT 940.00</Text>
                    <Text style={styles.totalPriceLabel}>Total Price</Text>
                </View>
                <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
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
        marginBottom: 10,
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    detailsCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    passengerCard: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    passengerHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    passengerTitle: {
        fontSize: 14,
        color: '#004D40',
        fontWeight: 'bold',
    },
    passengerSeat: {
        fontSize: 12,
        color: '#757575',
        fontWeight: '600',
    },
    emptyText: {
        fontSize: 13,
        color: '#757575',
        fontWeight: '600',
    },
    tabRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 10,
    },
    tabText: {
        fontSize: 14,
        color: '#999',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#004D40',
        fontWeight: 'bold',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailLabel: {
        fontSize: 14,
        color: '#757575',
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    paymentLabel: {
        fontSize: 14,
        color: '#757575',
    },
    paymentValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#004D40',
    },
    paymentMethodCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    paymentMethodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    paymentIconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF0F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentMethodName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#004D40',
    },
    totalPriceLabel: {
        fontSize: 12,
        color: '#757575',
    },
    payButton: {
        backgroundColor: '#004D40',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 12,
    },
    payButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
