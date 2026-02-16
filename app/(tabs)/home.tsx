import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const [tripType, setTripType] = useState('One Way');
  const [fromLocation, setFromLocation] = useState('Gaya (GAY)');
  const [toLocation, setToLocation] = useState('Delhi (DEL)');
  const [departureDate, setDepartureDate] = useState('11 September, 2025');
  const [travelClass, setTravelClass] = useState('S Chair');

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = () => {
    router.push('/search-results');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.profileSection}>
              <Image
                source={require('@/assets/images/mypic.jpeg')} // Local Avatar
                style={styles.avatar}
              />
              <View>
                <Text style={styles.greeting}>Good Morning!</Text>
                <Text style={styles.userName}>Ranjan Rawat</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#FFF" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
          <Text style={styles.mainTitle}>Let's Book Your{'\n'}Next Trip!</Text>
        </View>

        {/* Booking Form Card */}
        <View style={styles.cardContainer}>
          {/* Trip Type Toggle */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, tripType === 'One Way' && styles.activeTab]}
              onPress={() => setTripType('One Way')}>
              <Text style={[styles.tabText, tripType === 'One Way' && styles.activeTabText]}>
                One Way
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, tripType === 'Round Trip' && styles.activeTab]}
              onPress={() => setTripType('Round Trip')}>
              <Text style={[styles.tabText, tripType === 'Round Trip' && styles.activeTabText]}>
                Round Trip
              </Text>
            </TouchableOpacity>
          </View>

          {/* From Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>From</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="paper-plane-outline" size={20} color="#004D40" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={fromLocation}
                onChangeText={setFromLocation}
              />
            </View>
          </View>

          {/* Swap Button (Absolute or visually between From/To) */}
          <View style={styles.swapContainer}>
            {/* To Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>To</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="location-outline" size={20} color="#004D40" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={toLocation}
                  onChangeText={setToLocation}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.swapButton} onPress={handleSwapLocations}>
              <Ionicons name="swap-vertical" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Departure Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Departure Date</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={20} color="#004D40" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={departureDate}
                onChangeText={setDepartureDate}
              />
            </View>
          </View>

          {/* Class */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Class</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="grid-outline" size={20} color="#004D40" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={travelClass}
                onChangeText={setTravelClass}
              />
              <Ionicons name="chevron-down" size={20} color="#999" />
            </View>
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search Ticket</Text>
          </TouchableOpacity>

        </View>

        {/* Hot News Section */}
        <View style={styles.newsSection}>
          <View style={styles.newsHeader}>
            <Text style={styles.newsTitle}>Hot News</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* News Item (Single item for now) */}
          <View style={styles.newsCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1474487548417-781cb714c2f0?auto=format&fit=crop&q=80&w=200' }} // Train image
              style={styles.newsImage}
            />
            <View style={styles.newsContent}>
              <Text style={styles.newsHeadline} numberOfLines={2}>
                Sundarban Express: Travel, Safety, and...
              </Text>
              <Text style={styles.newsAuthor}>By Shafiq Khan • 21 Aug, 2025</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004D40',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80, // Space for the card to overlap
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  greeting: {
    color: '#B2DFDB',
    fontSize: 12,
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    lineHeight: 36,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: -60, // Overlap header
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#004D40',
  },
  tabText: {
    color: '#757575',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFF',
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
  swapContainer: {
    position: 'relative',
  },
  swapButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -20, // Half of height + offset adjustment
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#004D40',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  searchButton: {
    backgroundColor: '#004D40',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  newsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#F5F5F5', // Or white, depending on flow
    flex: 1,
    paddingTop: 10,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#004D40',
    fontWeight: '600',
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  newsImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
  },
  newsHeadline: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  newsAuthor: {
    fontSize: 10,
    color: '#999',
  },
});
