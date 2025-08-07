import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Text, Button, Card, Chip, IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import propertiesData from '../../data/properties.json';
import { ArrowLeft, Heart, MapPin, Chrome as Home, Phone, Mail, Share, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const { isAuthenticated } = useAuth();
  const { favorites, toggleFavorite } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const property = propertiesData.properties.find(p => p.id === id);

  if (!property) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Property not found</Text>
      </SafeAreaView>
    );
  }

  const isFavorite = favorites.includes(property.id);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Crore`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const handleContactAgent = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'Please login to contact the agent',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/auth/login') }
        ]
      );
      return;
    }

    Alert.alert(
      'Contact Agent',
      `Contact ${property.agent.name} at ${property.agent.phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Call agent') },
        { text: 'Email', onPress: () => console.log('Email agent') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon={() => <ArrowLeft size={24} color="#2c3e50" />}
          onPress={() => router.back()}
        />
        <View style={styles.headerActions}>
          <IconButton
            icon={() => <Share size={24} color="#2c3e50" />}
            onPress={() => console.log('Share property')}
          />
          <IconButton
            icon={() => (
              <Heart 
                size={24} 
                color={isFavorite ? '#e74c3c' : '#2c3e50'} 
                fill={isFavorite ? '#e74c3c' : 'transparent'} 
              />
            )}
            onPress={() => toggleFavorite(property.id)}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
              setCurrentImageIndex(index);
            }}
          >
            {property.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.propertyImage} />
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {property.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  { backgroundColor: index === currentImageIndex ? '#3498db' : '#bdc3c7' }
                ]}
              />
            ))}
          </View>

          {/* Badges */}
          <View style={styles.badgeContainer}>
            {property.trending && (
              <Chip style={styles.trendingBadge} textStyle={styles.badgeText}>
                Trending
              </Chip>
            )}
            {property.verified && (
              <Chip style={styles.verifiedBadge} textStyle={styles.badgeText}>
                <CheckCircle size={12} color="#fff" /> Verified
              </Chip>
            )}
          </View>
        </View>

        {/* Property Details */}
        <Card style={styles.detailsCard}>
          <Card.Content>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{formatPrice(property.price)}</Text>
              <Chip style={styles.typeChip} textStyle={styles.typeText}>
                {property.type}
              </Chip>
            </View>

            <Text style={styles.title}>{property.title}</Text>

            <View style={styles.locationContainer}>
              <MapPin size={16} color="#7f8c8d" />
              <Text style={styles.location}>{property.location}</Text>
            </View>

            <View style={styles.specs}>
              <View style={styles.specItem}>
                <Home size={16} color="#3498db" />
                <Text style={styles.specText}>{property.bhk}BHK</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specText}>{property.area} sq ft</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specText}>{property.category}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Description */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </Card.Content>
        </Card>

        {/* Amenities */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {property.amenities.map((amenity, index) => (
                <Chip key={index} style={styles.amenityChip} mode="outlined">
                  {amenity}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Agent Details */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Contact Agent</Text>
            <View style={styles.agentContainer}>
              <View style={styles.agentInfo}>
                <Text style={styles.agentName}>{property.agent.name}</Text>
                <Text style={styles.agentContact}>{property.agent.phone}</Text>
                <Text style={styles.agentContact}>{property.agent.email}</Text>
              </View>
              <View style={styles.agentActions}>
                <IconButton
                  icon={() => <Phone size={20} color="#27ae60" />}
                  mode="contained"
                  containerColor="#e8f5e8"
                  onPress={handleContactAgent}
                />
                <IconButton
                  icon={() => <Mail size={20} color="#3498db" />}
                  mode="contained"
                  containerColor="#e8f4f8"
                  onPress={handleContactAgent}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Button
          mode="contained"
          onPress={handleContactAgent}
          style={styles.contactButton}
          contentStyle={styles.contactButtonContent}
        >
          Contact Agent
        </Button>
      </View>
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
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  headerActions: {
    flexDirection: 'row',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  propertyImage: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  trendingBadge: {
    backgroundColor: '#e74c3c',
    height: 28,
  },
  verifiedBadge: {
    backgroundColor: '#27ae60',
    height: 28,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsCard: {
    margin: 16,
    borderRadius: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  typeChip: {
    backgroundColor: '#3498db',
    height: 32,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  location: {
    fontSize: 16,
    color: '#7f8c8d',
    flex: 1,
  },
  specs: {
    flexDirection: 'row',
    gap: 20,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    fontSize: 14,
    color: '#34495e',
    fontWeight: '500',
  },
  card: {
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    marginBottom: 8,
  },
  agentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  agentContact: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  agentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  bottomSpace: {
    height: 100,
  },
  bottomActions: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  contactButton: {
    borderRadius: 12,
  },
  contactButtonContent: {
    height: 50,
  },
});