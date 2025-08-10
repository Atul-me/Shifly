import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Switch, Button, IconButton, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function CustomizeSearchScreen() {
  const [preferences, setPreferences] = useState({
    instantAlerts: true,
    priceDropAlerts: true,
    newListingAlerts: false,
    weeklyDigest: true,
    emailNotifications: true,
    pushNotifications: true,
  });

  const [savedSearches, setSavedSearches] = useState([
    { id: '1', name: '3BHK in Gurgaon', filters: 'Buy • 3BHK • ₹50L-₹1Cr' },
    { id: '2', name: 'Rent in Noida', filters: 'Rent • 2BHK • ₹20K-₹40K' },
  ]);

  const togglePreference = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon={() => <ArrowLeft size={24} color="#2c3e50" />}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Customize Search</Text>
        <View />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Saved Searches */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Saved Searches</Text>
            <Text style={styles.sectionDescription}>
              Manage your saved search criteria and get alerts for new matches
            </Text>
            
            {savedSearches.map((search) => (
              <View key={search.id} style={styles.savedSearchItem}>
                <View style={styles.searchInfo}>
                  <Text style={styles.searchName}>{search.name}</Text>
                  <Text style={styles.searchFilters}>{search.filters}</Text>
                </View>
                <Button mode="outlined" compact onPress={() => console.log('Edit search')}>
                  Edit
                </Button>
              </View>
            ))}
            
            <Button 
              mode="contained" 
              style={styles.addButton}
              onPress={() => router.push('/(tabs)/search')}
            >
              Add New Search
            </Button>
          </Card.Content>
        </Card>

        {/* Alert Preferences */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Alert Preferences</Text>
            <Text style={styles.sectionDescription}>
              Choose how you want to be notified about new properties
            </Text>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceName}>Instant Alerts</Text>
                <Text style={styles.preferenceDescription}>
                  Get notified immediately when new properties match your criteria
                </Text>
              </View>
              <Switch
                value={preferences.instantAlerts}
                onValueChange={() => togglePreference('instantAlerts')}
              />
            </View>

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceName}>Price Drop Alerts</Text>
                <Text style={styles.preferenceDescription}>
                  Get notified when prices drop on your favorite properties
                </Text>
              </View>
              <Switch
                value={preferences.priceDropAlerts}
                onValueChange={() => togglePreference('priceDropAlerts')}
              />
            </View>

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceName}>New Listing Alerts</Text>
                <Text style={styles.preferenceDescription}>
                  Get notified about all new listings in your preferred areas
                </Text>
              </View>
              <Switch
                value={preferences.newListingAlerts}
                onValueChange={() => togglePreference('newListingAlerts')}
              />
            </View>

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceName}>Weekly Digest</Text>
                <Text style={styles.preferenceDescription}>
                  Receive a weekly summary of market trends and new properties
                </Text>
              </View>
              <Switch
                value={preferences.weeklyDigest}
                onValueChange={() => togglePreference('weeklyDigest')}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Notification Methods */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Notification Methods</Text>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceName}>Email Notifications</Text>
                <Text style={styles.preferenceDescription}>
                  Receive alerts via email
                </Text>
              </View>
              <Switch
                value={preferences.emailNotifications}
                onValueChange={() => togglePreference('emailNotifications')}
              />
            </View>

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceName}>Push Notifications</Text>
                <Text style={styles.preferenceDescription}>
                  Receive alerts on your mobile device
                </Text>
              </View>
              <Switch
                value={preferences.pushNotifications}
                onValueChange={() => togglePreference('pushNotifications')}
              />
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          style={styles.saveButton}
          contentStyle={styles.saveButtonContent}
          onPress={() => {
            console.log('Preferences saved');
            router.back();
          }}
        >
          Save Preferences
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
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
    lineHeight: 20,
  },
  savedSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  searchInfo: {
    flex: 1,
  },
  searchName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  searchFilters: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  addButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  preferenceInfo: {
    flex: 1,
    marginRight: 16,
  },
  preferenceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 16,
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  saveButtonContent: {
    height: 50,
  },
});