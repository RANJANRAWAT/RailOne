import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Passenger = {
    name: string;
    type: string;
    seat?: string;
};

export default function PassengerDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ seats?: string }>();

    const selectedSeats = useMemo(() => {
        if (!params.seats || typeof params.seats !== 'string') return [];
        return params.seats
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
    }, [params.seats]);

    const passengerCount = Math.max(1, selectedSeats.length || 0);

    const [email, setEmail] = useState('ranjanrawat@gmail.com');
    const [phone, setPhone] = useState('+880 1925384071');
    const [idType, setIdType] = useState('Passport');
    const [idNumber, setIdNumber] = useState('713254896');

    const [passengers, setPassengers] = useState<Passenger[]>(() =>
        Array.from({ length: passengerCount }, (_, i) => ({
            name: i === 0 ? 'Ranjan Rawat' : '',
            type: 'Adult',
            seat: selectedSeats[i],
        }))
    );

    useEffect(() => {
        setPassengers(prev => {
            const next = Array.from({ length: passengerCount }, (_, i) => ({
                name: prev[i]?.name ?? (i === 0 ? 'Ranjan Rawat' : ''),
                type: prev[i]?.type ?? 'Adult',
                seat: selectedSeats[i] ?? prev[i]?.seat,
            }));
            return next;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [passengerCount, params.seats]);

    const updatePassenger = (index: number, patch: Partial<Passenger>) => {
        setPassengers(prev => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));
    };

    const handleContinue = () => {
        const passengersParam = encodeURIComponent(JSON.stringify(passengers));
        router.push({
            pathname: '/(tabs)/booking-details',
            params: {
                seats: selectedSeats.join(','),
                passengers: passengersParam,
                email,
                phone,
                idType,
                idNumber,
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
                <Text style={styles.headerTitle}>Passenger Details</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Trip Summary Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.trainName}>Jahanabad Express</Text>
                        <Text style={styles.seatClass}>
                            S Chair | {selectedSeats.length ? selectedSeats.join(', ') : '—'}
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
                            <Text style={styles.duration}>Duration 7h 45m</Text>
                        </View>
                        <View>
                            <Text style={styles.time}>11:45 PM</Text>
                            <Text style={styles.date}>11 Sep, 2025</Text>
                        </View>
                    </View>
                </View>

                {/* Passenger Details Section */}
                <Text style={styles.sectionTitle}>Passenger Details</Text>
                {passengers.map((p, idx) => (
                    <View key={idx} style={styles.formCard}>
                        <View style={styles.tabRow}>
                            <Text style={[styles.tabText, styles.activeTabText]}>
                                Passenger {String(idx + 1).padStart(2, '0')}
                                {p.seat ? ` • Seat ${p.seat}` : ''}
                            </Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Passenger Name</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person-outline" size={20} color="#004D40" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={p.name}
                                    onChangeText={text => updatePassenger(idx, { name: text })}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Passenger Type</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="people-outline" size={20} color="#004D40" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={p.type}
                                    onChangeText={text => updatePassenger(idx, { type: text })}
                                />
                                <Ionicons name="chevron-down" size={20} color="#999" />
                            </View>
                        </View>
                    </View>
                ))}

                {/* Contact Info Section */}
                <Text style={styles.sectionTitle}>Contact Info</Text>
                <View style={styles.formCard}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail-outline" size={20} color="#004D40" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="call-outline" size={20} color="#004D40" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Identity Type</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="card-outline" size={20} color="#004D40" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={idType}
                                onChangeText={setIdType}
                            />
                            <Ionicons name="chevron-down" size={20} color="#999" />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Identity Number</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="document-text-outline" size={20} color="#004D40" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={idNumber}
                                onChangeText={setIdNumber}
                            />
                        </View>
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    formCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    tabRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
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
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        color: '#757575',
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        backgroundColor: '#FAFAFA',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#333',
        fontWeight: '600',
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
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
