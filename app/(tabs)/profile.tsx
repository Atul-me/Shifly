import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card, List, Divider, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { User, Settings, Heart, Chrome as Home, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => logout() }
      ]
    );
  };

  const menuItems = [
    {
      title: 'My Listings',
      description: 'Properties you have posted',
      icon: () => <Home size={20} color="#3498db" />,
      onPress: () => router.push('/listings'),
    },
    {
      title: 'Favorites',
      description: 'Your saved properties',
      icon: () => <Heart size={20} color="#e74c3c" />,
      onPress: () => router.push('/(tabs)/favorites'),
    },
    {
      title: 'Settings',
      description: 'App preferences and notifications',
      icon: () => <Settings size={20} color="#7f8c8d" />,
      onPress: () => router.push('/settings'),
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: () => <HelpCircle size={20} color="#9b59b6" />,
      onPress: () => router.push('/help'),
    },
  ];

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginPrompt}>
          <User size={64} color="#bdc3c7" />
          <Text style={styles.loginTitle}>Welcome to PropertyHub</Text>
          <Text style={styles.loginText}>
            Login to access your profile, save favorites, and manage your listings
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push('/auth/login')}
            style={styles.loginButton}
            contentStyle={styles.loginButtonContent}
          >
            Login / Register
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Profile Header */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Text 
              size={80} 
              label={user?.name?.charAt(0) || 'U'} 
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.userPhone}>{user?.phone}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Menu Items */}
        <Card style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <View key={item.title}>
              <List.Item
                title={item.title}
                description={item.description}
                left={item.icon}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={item.onPress}
                style={styles.menuItem}
              />
              {index < menuItems.length - 1 && <Divider />}
            </View>
          ))}
        </Card>

        {/* Logout Button */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          contentStyle={styles.logoutButtonContent}
          icon={() => <LogOut size={20} color="#e74c3c" />}
          textColor="#e74c3c"
        >
          Logout
        </Button>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>PropertyHub v1.0.0</Text>
          <Text style={styles.appInfoText}>Made with ❤️ for real estate</Text>
        </View>
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
  loginPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  loginText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  loginButton: {
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  loginButtonContent: {
    height: 50,
  },
  profileCard: {
    marginBottom: 20,
    borderRadius: 12,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    backgroundColor: '#3498db',
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  menuCard: {
    marginBottom: 20,
    borderRadius: 12,
  },
  menuItem: {
    paddingVertical: 8,
  },
  logoutButton: {
    borderRadius: 12,
    borderColor: '#e74c3c',
    marginBottom: 20,
  },
  logoutButtonContent: {
    height: 50,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  appInfoText: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 4,
  },
});