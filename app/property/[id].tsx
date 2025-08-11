import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert, FlatList } from 'react-native';
import { Text, Button, Card, Chip, IconButton, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import propertiesData from '../../data/properties.json';
import { ArrowLeft, Heart, MapPin, Chrome as Home, Share, CircleCheck as CheckCircle, Send } from 'lucide-react-native';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const { isAuthenticated, user, incrementMessageCount } = useAuth();
  const { favorites, toggleFavorite } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m interested in this property. Can you provide more details?',
      sender: 'user',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      text: 'Hi! I\'d be happy to help. This is a beautiful 3BHK apartment with modern amenities. Would you like to schedule a viewing?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 3000000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showLimitReached, setShowLimitReached] = useState(false);

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

  const handleSendMessage = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'Please login to chat with the agent',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/auth/login') }
        ]
      );
      return;
    }

    if (!newMessage.trim()) return;

    // Check message limit for free users
    if (user?.subscription === 'free') {
      const canSend = incrementMessageCount();
      if (!canSend) {
        setShowLimitReached(true);
        return;
      }
    }

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate agent response after 2 seconds
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message. I\'ll get back to you with more details shortly.',
        sender: 'agent',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  const handleContactAgent = () => {
    Alert.alert(
      'Contact Agent',
      `Would you like to call ${property.agent.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling agent') }
      ]
    );
  };

  const renderChatMessage = ({ item }: { item: ChatMessage }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.agentMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'user' ? styles.userMessageText : styles.agentMessageText
      ]}>
        {item.text}
      </Text>
      <Text style={styles.messageTime}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  const getMessagesRemaining = () => {
    if (!user || user.subscription !== 'free') return null;
    return user.messagesLimit - user.messagesUsed;
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

        {/* Chat Interface */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Chat with {property.agent.name}</Text>
            
            {user?.subscription === 'free' && (
              <Text style={styles.messageLimit}>
                Messages remaining: {getMessagesRemaining()}/5
              </Text>
            )}

            <View style={styles.chatContainer}>
              <FlatList
                data={chatMessages}
                renderItem={renderChatMessage}
                keyExtractor={(item) => item.id}
                style={styles.messagesList}
                showsVerticalScrollIndicator={false}
              />
              
              {showLimitReached ? (
                <View style={styles.limitReachedContainer}>
                  <Text style={styles.limitReachedText}>
                    You have reached your free message limit. Please subscribe to continue.
                  </Text>
                  <Button
                    mode="contained"
                    onPress={() => router.push('/subscriptions')}
                    style={styles.subscribeButton}
                  >
                    Subscribe
                  </Button>
                </View>
              ) : (
                <View style={styles.messageInputContainer}>
                  <TextInput
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type your message..."
                    style={styles.messageInput}
                    multiline
                  />
                  <IconButton
                    icon={() => <Send size={20} color="#3498db" />}
                    onPress={handleSendMessage}
                    disabled={!newMessage.trim()}
                  />
                </View>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Agent Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Agent Information</Text>
            <View style={styles.agentContainer}>
              <View style={styles.agentInfo}>
                <Text style={styles.agentName}>{property.agent.name}</Text>
                <Text style={styles.agentContact}>{property.agent.phone}</Text>
                <Text style={styles.agentContact}>{property.agent.email}</Text>
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
  chatContainer: {
    height: 300,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 8,
    overflow: 'hidden',
  },
  messagesList: {
    flex: 1,
    padding: 12,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
    borderRadius: 12,
    borderBottomRightRadius: 4,
    padding: 12,
  },
  agentMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    borderBottomLeftRadius: 4,
    padding: 12,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  agentMessageText: {
    color: '#2c3e50',
  },
  messageTime: {
    fontSize: 10,
    opacity: 0.7,
    marginTop: 4,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    backgroundColor: '#fff',
  },
  messageInput: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: 'transparent',
  },
  messageLimit: {
    fontSize: 12,
    color: '#e74c3c',
    marginBottom: 8,
    textAlign: 'center',
  },
  limitReachedContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  limitReachedText: {
    fontSize: 14,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  subscribeButton: {
    borderRadius: 8,
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