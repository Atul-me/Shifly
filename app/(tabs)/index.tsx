import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Searchbar, Button, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CityCard } from '../../components/CityCard';
import { PropertyCard } from '../../components/PropertyCard';
import { DrawerModal } from '../../components/DrawerModal';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import citiesData from '../../data/cities.json';
import propertiesData from '../../data/properties.json';
import { Menu, Bell } from 'lucide-react-native';

export default function HomeScreen() {
  const { filters, updateFilters, searchQuery, setSearchQuery } = useApp();
  const { isAuthenticated } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);

  // Get properties from data
  const trendingProperties = propertiesData.properties.filter(p => p.trending).slice(0, 5);
  const recommendedProperties = propertiesData.properties.slice(0, 10);

  const handleCityPress = (cityName: string) => {
    updateFilters({ city: cityName });
    router.push('/search');
  };

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const handleSearch = () => {
    setSearchQuery(searchValue);
    router.push('/search');
  };

  const handleToggleType = (type: 'Buy' | 'Rent') => {
    updateFilters({ type });
  };

  const handlePostProperty = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      router.push('/(tabs)/post');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowDrawer(true)}>
            <Menu size={24} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shifly</Text>
          <TouchableOpacity onPress={() => router.push('/notifications')}>
            <Bell size={24} color="#2c3e50" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search properties, location..."
            onChangeText={setSearchValue}
            value={searchValue}
            onSubmitEditing={handleSearch}
            style={styles.searchBar}
            right={() => (
              <TouchableOpacity 
                onPress={() => router.push('/(tabs)/search')}
                style={styles.searchFilterIcon}
              >
                <Filter size={20} color="#7f8c8d" />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Buy/Rent Toggle */}
        <View style={styles.toggleContainer}>
          <Button
            mode={filters.type === 'Buy' ? 'contained' : 'outlined'}
            onPress={() => handleToggleType('Buy')}
            style={styles.toggleButton}
          >
            Buy
          </Button>
          <Button
            mode={filters.type === 'Rent' ? 'contained' : 'outlined'}
            onPress={() => handleToggleType('Rent')}
            style={styles.toggleButton}
          >
            Rent
          </Button>
        </View>

        {/* Cities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Cities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {citiesData.cities.map((city) => (
              <View key={city.id} style={styles.cityCardContainer}>
                <CityCard 
                  city={city} 
                  onPress={() => handleCityPress(city.name)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Trending Properties */}
        {trendingProperties.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Properties</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {trendingProperties.map((property) => (
                <View key={property.id} style={styles.propertyCardContainer}>
                  <PropertyCard 
                    property={property} 
                    onPress={() => handlePropertyPress(property.id)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recommended Properties */}
        {recommendedProperties.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended for You</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            {recommendedProperties.slice(0, 3).map((property) => (
              <PropertyCard 
                key={property.id}
                property={property} 
                onPress={() => handlePropertyPress(property.id)}
              />
            ))}
          </View>
        )}

        {propertiesData.properties.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Properties Yet</Text>
            <Text style={styles.emptyText}>Start by posting your first property!</Text>
          </View>
        )}
      </ScrollView>

      <DrawerModal
        visible={showDrawer}
        onDismiss={() => setShowDrawer(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#f1f2f6',
    elevation: 0,
    paddingRight: 50,
  },
  searchFilterIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    gap: 10,
  },
  toggleButton: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  seeAll: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
  },
  cityCardContainer: {
    width: 280,
  },
  propertyCardContainer: {
    width: 300,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginTop: 50,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
  },
});