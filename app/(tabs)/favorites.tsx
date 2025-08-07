import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { PropertyCard } from '../../components/PropertyCard';
import { useApp } from '../../context/AppContext';
import propertiesData from '../../data/properties.json';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  const { favorites } = useApp();

  const favoriteProperties = propertiesData.properties.filter(
    property => favorites.includes(property.id)
  );

  const handlePropertyPress = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.count}>{favoriteProperties.length} properties</Text>
      </View>

      {favoriteProperties.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Heart size={64} color="#bdc3c7" />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyText}>
            Start browsing properties and tap the heart icon to add them to your favorites
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteProperties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              onPress={() => handlePropertyPress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  count: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
    lineHeight: 24,
  },
});