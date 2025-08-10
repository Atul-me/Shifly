import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, IconButton, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, Home, Heart, MessageCircle } from 'lucide-react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'property' | 'favorite' | 'message' | 'system';
  read: boolean;
}

const dummyNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Property Match',
    message: 'A new 3BHK apartment in Gurgaon matches your search criteria',
    time: '2 hours ago',
    type: 'property',
    read: false,
  },
  {
    id: '2',
    title: 'Price Drop Alert',
    message: 'Price reduced by ₹2L for Luxury Villa in Delhi',
    time: '5 hours ago',
    type: 'favorite',
    read: false,
  },
  {
    id: '3',
    title: 'Agent Message',
    message: 'Rajesh Kumar sent you a message about property inquiry',
    time: '1 day ago',
    type: 'message',
    read: true,
  },
  {
    id: '4',
    title: 'Welcome to Shifly',
    message: 'Thank you for joining Shifly! Start exploring properties now.',
    time: '2 days ago',
    type: 'system',
    read: true,
  },
];

export default function NotificationsScreen() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'property':
        return <Home size={20} color="#3498db" />;
      case 'favorite':
        return <Heart size={20} color="#e74c3c" />;
      case 'message':
        return <MessageCircle size={20} color="#27ae60" />;
      default:
        return <Bell size={20} color="#f39c12" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'property':
        return '#e8f4f8';
      case 'favorite':
        return '#fdf2f2';
      case 'message':
        return '#f0f9f0';
      default:
        return '#fef9e7';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon={() => <ArrowLeft size={24} color="#2c3e50" />}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerRight}>
          <Chip style={styles.unreadChip} textStyle={styles.unreadText}>
            {dummyNotifications.filter(n => !n.read).length} New
          </Chip>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {dummyNotifications.map((notification) => (
          <TouchableOpacity key={notification.id}>
            <Card 
              style={[
                styles.notificationCard,
                { backgroundColor: notification.read ? '#fff' : getNotificationColor(notification.type) }
              ]}
            >
              <Card.Content style={styles.cardContent}>
                <View style={styles.notificationHeader}>
                  <View style={styles.iconContainer}>
                    {getNotificationIcon(notification.type)}
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

        {dummyNotifications.length === 0 && (
          <View style={styles.emptyContainer}>
            <Bell size={64} color="#bdc3c7" />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptyText}>
              We'll notify you about new properties, price changes, and messages
            </Text>
          </View>
        )}
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
  headerRight: {
    width: 80,
    alignItems: 'flex-end',
  },
  unreadChip: {
    backgroundColor: '#e74c3c',
    height: 28,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  notificationCard: {
    margin: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e74c3c',
    marginLeft: 8,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 100,
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