import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Building, Home, Store, Warehouse } from 'lucide-react-native';

const propertyTypes = [
  {
    id: '1',
    name: 'Apartments',
    description: 'Modern apartments and flats',
    icon: () => <Building size={32} color="#3498db" />,
    count: 150,
  },
  {
    id: '2',
    name: 'Villas',
    description: 'Independent houses and villas',
    icon: () => <Home size={32} color="#27ae60" />,
    count: 85,
  },
  {
    id: '3',
    name: 'Commercial',
    description: 'Office spaces and shops',
    icon: () => <Store size={32} color="#e74c3c" />,
    count: 45,
  },
  {
    id: '4',
    name: 'Industrial',
    description: 'Warehouses and factories',
    icon: () => <Warehouse size={32} color="#f39c12" />,
    count: 25,
  },
];

export default function PropertyTypesScreen() {
  const handleTypePress = (type: string) => {
    router.push(`/(tabs)/search?category=${type}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon={() => <ArrowLeft size={24} color="#2c3e50" />}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Property Types</Text>
        <View />
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.subtitle}>Choose from different property categories</Text>
        
        {propertyTypes.map((type) => (
          <TouchableOpacity key={type.id} onPress={() => handleTypePress(type.name)}>
            <Card style={styles.typeCard}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  {type.icon()}
                </View>
                <View style={styles.typeInfo}>
                  <Text style={styles.typeName}>{type.name}</Text>
                  <Text style={styles.typeDescription}>{type.description}</Text>
                  <Text style={styles.typeCount}>{type.count} properties available</Text>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  typeCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 6,
  },
  typeCount: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
  },
});