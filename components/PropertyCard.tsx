import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Chip, IconButton } from 'react-native-paper';
import { Heart, MapPin, Chrome as Home } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bhk: number;
  type: 'Buy' | 'Rent';
  images: string[];
  verified: boolean;
  trending: boolean;
  area: number;
}

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPress }) => {
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(property.id);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.images[0] }} style={styles.image} />
        <View style={styles.badgeContainer}>
          {property.trending && (
            <Chip style={styles.trendingBadge} textStyle={styles.badgeText}>
              Trending
            </Chip>
          )}
          {property.verified && (
            <Chip style={styles.verifiedBadge} textStyle={styles.badgeText}>
              Verified
            </Chip>
          )}
        </View>
        <IconButton
          icon={() => <Heart size={20} color={isFavorite ? '#e74c3c' : '#fff'} fill={isFavorite ? '#e74c3c' : 'transparent'} />}
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(property.id)}
        />
      </View>
      
      <Card.Content style={styles.content}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(property.price)}</Text>
          <Chip style={styles.typeChip} textStyle={styles.typeText}>
            {property.type}
          </Chip>
        </View>
        
        <Text style={styles.title} numberOfLines={1}>
          {property.title}
        </Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#666" />
          <Text style={styles.location} numberOfLines={1}>
            {property.location}
          </Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Home size={14} color="#666" />
            <Text style={styles.detailText}>{property.bhk}BHK</Text>
          </View>
          <Text style={styles.area}>{property.area} sq ft</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    gap: 5,
  },
  trendingBadge: {
    backgroundColor: '#e74c3c',
    height: 24,
  },
  verifiedBadge: {
    backgroundColor: '#27ae60',
    height: 24,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    margin: 0,
  },
  content: {
    padding: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  typeChip: {
    backgroundColor: '#3498db',
    height: 24,
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  area: {
    fontSize: 14,
    color: '#666',
  },
});


// Based on your requirements, I'll create a comprehensive, scalable real estate listing mobile app with modern UI/UX design. This will be a fully functional demo suitable for showcasing to investors.

// **Core Features**:
// - Complete authentication flow with Firebase-ready UI
// - Multi-navigation system (tabs, stack, drawer)
// - City-based property browsing with Delhi, Noida, Gurgaon
// - Advanced property filtering and search functionality
// - Property listing and detail views with image carousels
// - Post property form for sellers
// - Favorites and user profile management
// - Contact agent system with authentication gating

// **Design Elements**:
// - Modern flat UI with React Native Paper components
// - Custom "Rockybilly\" header font integration
// - City cards with beautiful gradient overlays
// - Trending properties carousel with smooth animations
// - Professional property cards with heart favorites
// - Minimalist spacing with subtle shadows and rounded corners
// - Smooth page transitions and micro-interactions
// - Light theme with excellent contrast ratios

// <boltArtifact id="real-estate-app" title="Complete Real Estate Listing Mobile App">