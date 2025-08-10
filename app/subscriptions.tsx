import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, IconButton, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Check, Star } from 'lucide-react-native';

const subscriptionPlans = [
  {
    id: '1',
    name: 'Basic',
    price: 'Free',
    duration: 'Forever',
    features: [
      'Browse properties',
      'Basic search filters',
      'Contact agents',
      'Save up to 5 favorites',
    ],
    popular: false,
    buttonText: 'Current Plan',
    disabled: true,
  },
  {
    id: '2',
    name: 'Premium',
    price: '₹299',
    duration: 'per month',
    features: [
      'All Basic features',
      'Advanced search filters',
      'Unlimited favorites',
      'Priority customer support',
      'Property alerts',
      'Market insights',
    ],
    popular: true,
    buttonText: 'Upgrade Now',
    disabled: false,
  },
  {
    id: '3',
    name: 'Agent Pro',
    price: '₹999',
    duration: 'per month',
    features: [
      'All Premium features',
      'Post unlimited properties',
      'Featured listings',
      'Lead management',
      'Analytics dashboard',
      'Dedicated account manager',
    ],
    popular: false,
    buttonText: 'Choose Plan',
    disabled: false,
  },
];

export default function SubscriptionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon={() => <ArrowLeft size={24} color="#2c3e50" />}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Subscriptions</Text>
        <View />
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.subtitle}>Choose the perfect plan for your needs</Text>
        
        {subscriptionPlans.map((plan) => (
          <Card key={plan.id} style={[styles.planCard, plan.popular && styles.popularCard]}>
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Chip style={styles.popularChip} textStyle={styles.popularText}>
                  <Star size={12} color="#fff" /> Most Popular
                </Chip>
              </View>
            )}
            
            <Card.Content style={styles.cardContent}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.duration}>{plan.duration}</Text>
              </View>
              
              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Check size={16} color="#27ae60" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              <Button
                mode={plan.popular ? 'contained' : 'outlined'}
                onPress={() => console.log(`Selected ${plan.name} plan`)}
                disabled={plan.disabled}
                style={[styles.planButton, plan.popular && styles.popularButton]}
                contentStyle={styles.buttonContent}
              >
                {plan.buttonText}
              </Button>
            </Card.Content>
          </Card>
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All plans include 7-day free trial. Cancel anytime.
          </Text>
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
  planCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    position: 'relative',
  },
  popularCard: {
    borderWidth: 2,
    borderColor: '#3498db',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    right: 20,
    zIndex: 1,
    alignItems: 'center',
  },
  popularChip: {
    backgroundColor: '#3498db',
    height: 28,
  },
  popularText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 20,
    paddingTop: 30,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3498db',
  },
  duration: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 8,
    flex: 1,
  },
  planButton: {
    borderRadius: 8,
  },
  popularButton: {
    backgroundColor: '#3498db',
  },
  buttonContent: {
    height: 45,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
  },
});