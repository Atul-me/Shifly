import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Chip, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';

export default function PostPropertyScreen() {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    city: '',
    bhk: 0,
    type: 'Buy' as 'Buy' | 'Rent',
    category: '',
    area: '',
  });

  const cities = ['Delhi', 'Noida', 'Gurgaon'];
  const categories = ['Apartment', 'Villa', 'Commercial'];
  const bhkOptions = [1, 2, 3, 4, 5];

  const handleSubmit = () => {
    // Validate form
    if (!formData.title || !formData.price || !formData.location || !formData.city) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    // In real app, this would be API call
    Alert.alert(
      'Success',
      'Property posted successfully!',
      [{ text: 'OK', onPress: () => router.push('/(tabs)') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Post Your Property</Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Basic Details</Text>
            
            <TextInput
              label="Property Title *"
              value={formData.title}
              onChangeText={(text) => setFormData({...formData, title: text})}
              style={styles.input}
            />

            <TextInput
              label="Description"
              value={formData.description}
              onChangeText={(text) => setFormData({...formData, description: text})}
              multiline
              numberOfLines={4}
              style={styles.input}
            />

            <TextInput
              label="Price *"
              value={formData.price}
              onChangeText={(text) => setFormData({...formData, price: text})}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              label="Location *"
              value={formData.location}
              onChangeText={(text) => setFormData({...formData, location: text})}
              style={styles.input}
            />

            <TextInput
              label="Area (sq ft)"
              value={formData.area}
              onChangeText={(text) => setFormData({...formData, area: text})}
              keyboardType="numeric"
              style={styles.input}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Property Type</Text>
            <View style={styles.chipContainer}>
              <Chip
                selected={formData.type === 'Buy'}
                onPress={() => setFormData({...formData, type: 'Buy'})}
                style={styles.chip}
              >
                Buy
              </Chip>
              <Chip
                selected={formData.type === 'Rent'}
                onPress={() => setFormData({...formData, type: 'Rent'})}
                style={styles.chip}
              >
                Rent
              </Chip>
            </View>

            <Text style={styles.sectionTitle}>City *</Text>
            <View style={styles.chipContainer}>
              {cities.map((city) => (
                <Chip
                  key={city}
                  selected={formData.city === city}
                  onPress={() => setFormData({...formData, city: city})}
                  style={styles.chip}
                >
                  {city}
                </Chip>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.chipContainer}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  selected={formData.category === category}
                  onPress={() => setFormData({...formData, category: category})}
                  style={styles.chip}
                >
                  {category}
                </Chip>
              ))}
            </View>

            <Text style={styles.sectionTitle}>BHK</Text>
            <View style={styles.chipContainer}>
              {bhkOptions.map((bhk) => (
                <Chip
                  key={bhk}
                  selected={formData.bhk === bhk}
                  onPress={() => setFormData({...formData, bhk: bhk})}
                  style={styles.chip}
                >
                  {bhk}BHK
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          contentStyle={styles.submitButtonContent}
        >
          Post Property
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
    marginTop: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  chip: {
    marginBottom: 8,
  },
  submitButton: {
    borderRadius: 12,
    marginTop: 20,
  },
  submitButtonContent: {
    height: 50,
  },
});