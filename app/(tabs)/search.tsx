import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Searchbar, FAB, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { PropertyCard } from '../../components/PropertyCard';
import { FilterModal } from '../../components/FilterModal';
import { useApp } from '../../context/AppContext';
import propertiesData from '../../data/properties.json';
import { Filter } from 'lucide-react-native';

export default function SearchScreen() {
  const { filters, searchQuery, setSearchQuery } = useApp([]);
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);

  // Filter properties based on current filters and search query
  const filteredProperties = useMemo(() => {
    return propertiesData.properties.filter((property) => {
      // Type filter
      if (filters.type !== property.type) return false;
      
      // City filter
      if (filters.city && property.city !== filters.city) return false;
      
      // Category filter
      if (filters.category && property.category !== filters.category) return false;
      
      // BHK filter
      if (filters.bhk && property.bhk !== filters.bhk) return false;
      
      // Price filter
      if (property.price < filters.minPrice || property.price > filters.maxPrice) return false;
      
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.city.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [filters, searchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== 'Buy' && value !== '' && value !== 0 && value !== 100000000
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search properties..."
          onChangeText={setSearchValue}
          value={searchValue}
          onSubmitEditing={handleSearch}
          style={styles.searchBar}
          right={() => (
            <TouchableOpacity 
              onPress={() => setShowFilters(true)}
              style={styles.filterIcon}
            >
              <Filter size={20} color="#7f8c8d" />
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredProperties.length} properties found
        </Text>
        <Text style={styles.filtersText}>
          {filters.city && `in ${filters.city}`}
          {filters.type && ` for ${filters.type}`}
        </Text>
      </View>

      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => handlePropertyPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No properties found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
          </View>
        }
      />

      <FAB
        icon={() => <Filter size={20} color="#fff" />}
        label={activeFiltersCount > 0 ? `Filters (${activeFiltersCount})` : 'Filters'}
        style={styles.fab}
        onPress={() => setShowFilters(true)}
      />

      <FilterModal
        visible={showFilters}
        onDismiss={() => setShowFilters(false)}
        onApply={() => setShowFilters(false)}
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
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#f1f2f6',
    elevation: 0,
    paddingRight: 50,
  },
  filterIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 8,
  },
  resultsHeader: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  filtersText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f8c8d',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: '#3498db',
  },
});