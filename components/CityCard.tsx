import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface City {
  id: string;
  name: string;
  image: string;
  properties: number;
  description: string;
}

interface CityCardProps {
  city: City;
  onPress: () => void;
}

export const CityCard: React.FC<CityCardProps> = ({ city, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: city.image }} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
          <View style={styles.overlay}>
            <Text style={styles.cityName}>{city.name}</Text>
            <Text style={styles.propertyCount}>{city.properties}+ Properties</Text>
            <Text style={styles.description}>{city.description}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 16,
    elevation: 5,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    borderRadius: 16,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  propertyCount: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
});