import { Ionicons } from '@expo/vector-icons';
import { useStripe } from '@stripe/stripe-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    UIManager,
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
    const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'Card' | 'EMI'>('UPI');
    const [cardType, setCardType] = useState<'Credit' | 'Debit'>('Credit');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
    });
    const [upiId, setUpiId] = useState('');

    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    const changeMethod = (method: 'UPI' | 'Card' | 'EMI') => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedMethod(method);
    };

    const changeCardType = (type: 'Credit' | 'Debit') => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCardType(type);
    };

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

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        // MOCK: In a real app, fetch these from your backend
        // const response = await fetch(`${API_URL}/payment-sheet`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
        // const { paymentIntent, ephemeralKey, customer } = await response.json();

        // RETURNING MOCK DATA TO SIMULATE FLOW
        // Note: This will likely fail initialization without a real client secret from Stripe
        return {
            paymentIntent: 'pi_mock_secret',
            ephemeralKey: 'ek_mock_secret',
            customer: 'cus_mock_id',
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: 'Ticket App',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            },
        });

        if (!error) {
            setLoading(true);
        }
    };

    useEffect(() => {
        // Initialize on mount
        initializePaymentSheet();
    }, []);

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
            router.push({
                pathname: '/(tabs)/ticket-details',
                params: {
                    seats: seats.join(','),
                    passengers: typeof params.passengers === 'string' ? params.passengers : undefined,
                    email: typeof params.email === 'string' ? params.email : undefined,
                    phone: typeof params.phone === 'string' ? params.phone : undefined,
                    idType: typeof params.idType === 'string' ? params.idType : undefined,
                    idNumber: typeof params.idNumber === 'string' ? params.idNumber : undefined,
                },
            });
        }
    };

    const handlePayNow = async () => {
        if (selectedMethod === 'Card') {
            // For card, try to open Stripe Payment Sheet
            await openPaymentSheet();
        } else {
            // For others, just proceed for now (or implement logic if needed)
            router.push({
                pathname: '/(tabs)/ticket-details',
                params: {
                    seats: seats.join(','),
                    passengers: typeof params.passengers === 'string' ? params.passengers : undefined,
                    email: typeof params.email === 'string' ? params.email : undefined,
                    phone: typeof params.phone === 'string' ? params.phone : undefined,
                    idType: typeof params.idType === 'string' ? params.idType : undefined,
                    idNumber: typeof params.idNumber === 'string' ? params.idNumber : undefined,
                },
            });
        }
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

                {/* Payment Method Selection */}
                <Text style={styles.sectionTitle}>Payment Method</Text>

                {/* Method Tabs */}
                <View style={styles.methodTabs}>
                    {(['UPI', 'Card', 'EMI'] as const).map((method) => (
                        <TouchableOpacity
                            key={method}
                            style={[
                                styles.methodTab,
                                selectedMethod === method && styles.activeMethodTab,
                            ]}
                            onPress={() => changeMethod(method)}
                        >
                            <Ionicons
                                name={
                                    method === 'UPI'
                                        ? 'qr-code-outline'
                                        : method === 'Card'
                                            ? 'card-outline'
                                            : 'calendar-outline'
                                }
                                size={20}
                                color={selectedMethod === method ? '#FFF' : '#757575'}
                            />
                            <Text
                                style={[
                                    styles.methodTabText,
                                    selectedMethod === method && styles.activeMethodTabText,
                                ]}
                            >
                                {method}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Dynamic Payment Content */}
                <View style={styles.paymentContentCard}>
                    {selectedMethod === 'UPI' && (
                        <View>
                            <Text style={styles.paymentHeader}>Pay via UPI</Text>
                            <Text style={styles.paymentSubHeader}>
                                Enter your UPI ID (e.g., name@bank)
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ex: 9876543210@upi"
                                value={upiId}
                                onChangeText={setUpiId}
                                placeholderTextColor="#999"
                            />
                            <TouchableOpacity style={styles.verifyButton}>
                                <Text style={styles.verifyButtonText}>Verify VPA</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {selectedMethod === 'Card' && (
                        <View>
                            <Text style={styles.paymentHeader}>Enter Card Details</Text>

                            {/* Card Type Selector */}
                            <View style={styles.cardTypeRow}>
                                <TouchableOpacity
                                    style={styles.radioButton}
                                    onPress={() => changeCardType('Credit')}
                                >
                                    <View
                                        style={[
                                            styles.radioOuter,
                                            cardType === 'Credit' && styles.radioOuterSelected,
                                        ]}
                                    >
                                        {cardType === 'Credit' && <View style={styles.radioInner} />}
                                    </View>
                                    <Text style={styles.radioText}>Credit Card</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.radioButton}
                                    onPress={() => changeCardType('Debit')}
                                >
                                    <View
                                        style={[
                                            styles.radioOuter,
                                            cardType === 'Debit' && styles.radioOuterSelected,
                                        ]}
                                    >
                                        {cardType === 'Debit' && <View style={styles.radioInner} />}
                                    </View>
                                    <Text style={styles.radioText}>Debit Card</Text>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Card Number"
                                keyboardType="numeric"
                                value={cardDetails.number}
                                onChangeText={(t) => setCardDetails({ ...cardDetails, number: t })}
                                placeholderTextColor="#999"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Card Holder Name"
                                value={cardDetails.name}
                                onChangeText={(t) => setCardDetails({ ...cardDetails, name: t })}
                                placeholderTextColor="#999"
                            />
                            <View style={styles.rowInputs}>
                                <TextInput
                                    style={[styles.input, { flex: 1, marginRight: 10 }]}
                                    placeholder="Valid Thru (MM/YY)"
                                    value={cardDetails.expiry}
                                    onChangeText={(t) => setCardDetails({ ...cardDetails, expiry: t })}
                                    placeholderTextColor="#999"
                                />
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    placeholder="CVV"
                                    keyboardType="numeric"
                                    secureTextEntry
                                    maxLength={3}
                                    value={cardDetails.cvv}
                                    onChangeText={(t) => setCardDetails({ ...cardDetails, cvv: t })}
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>
                    )}

                    {selectedMethod === 'EMI' && (
                        <View>
                            <Text style={styles.paymentHeader}>EMI Options</Text>
                            <Text style={styles.paymentSubHeader}>
                                Select your bank to view EMI plans
                            </Text>
                            <View style={styles.dummyDropdown}>
                                <Text style={styles.dummyDropdownText}>Select Bank</Text>
                                <Ionicons name="chevron-down" size={20} color="#757575" />
                            </View>
                            <View style={[styles.dummyDropdown, { marginTop: 10 }]}>
                                <Text style={styles.dummyDropdownText}>Select Tenure</Text>
                                <Ionicons name="chevron-down" size={20} color="#757575" />
                            </View>
                        </View>
                    )}
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
    methodTabs: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 10,
        gap: 10,
    },
    methodTab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        gap: 6,
    },
    activeMethodTab: {
        backgroundColor: '#004D40',
        borderColor: '#004D40',
    },
    methodTabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#757575',
    },
    activeMethodTabText: {
        color: '#FFF',
    },
    paymentContentCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    paymentHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    paymentSubHeader: {
        fontSize: 12,
        color: '#757575',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 14,
        color: '#333',
        marginBottom: 15,
        backgroundColor: '#FAFAFA',
    },
    verifyButton: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#004D40',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    verifyButtonText: {
        color: '#004D40',
        fontWeight: '600',
        fontSize: 12,
    },
    cardTypeRow: {
        flexDirection: 'row',
        marginBottom: 15,
        gap: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterSelected: {
        borderColor: '#004D40',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#004D40',
    },
    radioText: {
        fontSize: 14,
        color: '#333',
    },
    rowInputs: {
        flexDirection: 'row',
    },
    dummyDropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#FAFAFA',
    },
    dummyDropdownText: {
        fontSize: 14,
        color: '#333',
    },
});
