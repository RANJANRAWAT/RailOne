import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TicketDetailsScreen() {
    const router = useRouter();

    // UI-only barcode (not scannable), but visually close to a real barcode.
    const barcodeValue = '40181700982';

    const bars = [
        // left guard / quiet zone
        { w: 2, gap: 2 },
        { w: 2, gap: 1 },
        { w: 1, gap: 2 },
        // dense body (hand-crafted pattern)
        { w: 3, gap: 1 }, { w: 1, gap: 1 }, { w: 1, gap: 2 }, { w: 2, gap: 1 }, { w: 1, gap: 1 },
        { w: 4, gap: 1 }, { w: 1, gap: 2 }, { w: 2, gap: 1 }, { w: 1, gap: 1 }, { w: 3, gap: 1 },
        { w: 1, gap: 1 }, { w: 2, gap: 2 }, { w: 1, gap: 1 }, { w: 5, gap: 1 }, { w: 1, gap: 2 },
        { w: 2, gap: 1 }, { w: 1, gap: 1 }, { w: 3, gap: 1 }, { w: 1, gap: 2 }, { w: 2, gap: 1 },
        { w: 1, gap: 1 }, { w: 4, gap: 1 }, { w: 1, gap: 2 }, { w: 2, gap: 1 }, { w: 1, gap: 1 },
        { w: 3, gap: 1 }, { w: 1, gap: 1 }, { w: 2, gap: 2 }, { w: 1, gap: 1 }, { w: 5, gap: 1 },
        { w: 1, gap: 2 }, { w: 2, gap: 1 }, { w: 1, gap: 1 }, { w: 3, gap: 1 }, { w: 1, gap: 2 },
        { w: 2, gap: 1 }, { w: 1, gap: 1 }, { w: 4, gap: 1 }, { w: 1, gap: 2 }, { w: 2, gap: 1 },
        { w: 1, gap: 1 }, { w: 3, gap: 1 }, { w: 1, gap: 2 }, { w: 6, gap: 1 },
        // right guard
        { w: 2, gap: 2 }, { w: 2, gap: 0 },
    ] as const;

    const handleDownload = () => {
        alert('Ticket Downloaded!');
    };

    const handleHome = () => {
        router.dismissAll();
        router.replace('/home');
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ticket Details</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Trip Summary Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.trainName}>Jahanabad Express</Text>
                        <Text style={styles.seatClass}>S Chair | C1, C2</Text>
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
                            <Ionicons name="train-outline" size={24} color="#004D40" />
                            <Text style={styles.duration}>Duration 3h 45m</Text>
                        </View>
                        <View>
                            <Text style={styles.time}>11:45 PM</Text>
                            <Text style={styles.date}>11 Sep, 2025</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Passenger List */}
                    <View style={styles.passengerRow}>
                        <Text style={styles.passengerLabel}>Passenger 01</Text>
                        <Text style={styles.passengerValue}>Ranjan Rawat (Adult)</Text>
                    </View>
                    <View style={styles.passengerRow}>
                        <Text style={styles.passengerLabel}>Passenger 02</Text>
                        <Text style={styles.passengerValue}>Alvi Khan (Adult)</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Contact & Contact */}
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Email Address</Text>
                        <Text style={styles.detailValue}>ranjanrawat@gmail.com</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Phone Number</Text>
                        <Text style={styles.detailValue}>+880 1925384071</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Identity Number</Text>
                        <Text style={styles.detailValue}>123456789</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Cost */}
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Subtotal</Text>
                        <Text style={styles.paymentValue}>BDT 890.00</Text>
                    </View>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Tax</Text>
                        <Text style={styles.paymentValue}>BDT 50.00</Text>
                    </View>

                    <View style={styles.paymentRowTotal}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>BDT 940.00</Text>
                    </View>

                    {/* Barcode Placeholder */}
                    <View style={styles.barcodeContainer}>
                        <View style={styles.barcodeCard}>
                            <View style={styles.barcode}>
                                {/* quiet zone left */}
                                <View style={{ width: 10 }} />
                                {bars.map((b, idx) => (
                                    <View
                                        key={idx}
                                        style={[
                                            styles.bar,
                                            {
                                                width: b.w,
                                                marginRight: b.gap,
                                            },
                                        ]}
                                    />
                                ))}
                                {/* quiet zone right */}
                                <View style={{ width: 10 }} />
                            </View>
                            <Text style={styles.barcodeText}>{barcodeValue.split('').join(' ')}</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Footer Actions */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleHome}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                    <Text style={styles.downloadButtonText}>Download</Text>
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
        marginBottom: 15,
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
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 15,
    },
    passengerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    passengerLabel: {
        fontSize: 12,
        color: '#757575',
    },
    passengerValue: {
        fontSize: 12,
        color: '#333',
        fontWeight: '600',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 12,
        color: '#757575',
    },
    detailValue: {
        fontSize: 12,
        color: '#333',
        fontWeight: '600',
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    paymentLabel: {
        fontSize: 12,
        color: '#757575',
    },
    paymentValue: {
        fontSize: 12,
        color: '#333',
        fontWeight: '600',
    },
    paymentRowTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginTop: 5,
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#004D40',
    },
    barcodeContainer: {
        marginTop: 20,
        alignItems: 'center',
        height: 90,
        justifyContent: 'center',
    },
    barcodeCard: {
        width: '100%',
        backgroundColor: '#FFF',
        // borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 12,
        paddingTop: 10,
        paddingBottom: 8,
        paddingHorizontal: 10,
    },
    barcode: {
        width: '100%',
        height: 44,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    bar: {
        backgroundColor: '#0B0B0B',
        borderRadius: 0,
        height: '100%',
    },
    barcodeText: {
        marginTop: 6,
        textAlign: 'center',
        color: '#111',
        fontSize: 18,
        letterSpacing: 2,
        fontWeight: '700',
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
        gap: 15,
    },
    cancelButton: {
        flex: 1,
        borderColor: '#FF3B30',
        borderWidth: 1,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#FF3B30',
        fontWeight: 'bold',
        fontSize: 16,
    },
    downloadButton: {
        flex: 1,
        backgroundColor: '#004D40',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    downloadButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
