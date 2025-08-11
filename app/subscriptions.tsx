import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, IconButton, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Check, Star } from 'lucide-react-native';

const subscriptionPlans = [
  {
    id: '1',
    name: 'Free',
    price: '$0',
    duration: 'forever',
    features: [
      'Browse properties',
      'Basic search filters',
      '5 messages per month',
      'Save favorites',
    ],
    popular: false,
    buttonText: 'Current Plan',
    disabled: true,
    plan: 'free' as const,
  },
  {
    id: '2',
    name: 'Basic',
    price: '$5',
    duration: 'per month',
    features: [
      'All Free features',
      'Advanced search filters',
      '50 messages per month',
      'Priority customer support',
    ],
    popular: false,
    buttonText: 'Upgrade Now',
    disabled: false,
    plan: 'basic' as const,
  },
  {
    id: '3',
    name: 'Pro',
    price: '$10',
    duration: 'per month',
    features: [
      'All Basic features',
      'Unlimited messages',
      'Priority support',
      'Advanced analytics',
    ],
    popular: true,
    buttonText: 'Choose Plan',
    disabled: false,
    plan: 'pro' as const,
  },
  {
    id: '4',
    name: 'Enterprise',
    price: '$25',
    duration: 'per month',
    features: [
      'All Pro features',
      'Unlimited messages',
      'Priority Support',
      'Dedicated account manager',
      'Custom integrations',
    ],
    popular: false,
    buttonText: 'Choose Plan',
    disabled: false,
    plan: 'enterprise' as const,
  },
];

export default function SubscriptionsScreen() {
  const { user, updateSubscription } = useAuth();

  const handleSelectPlan = (plan: 'basic' | 'pro' | 'enterprise') => {
    updateSubscription(plan);
    alert(`Successfully subscribed to ${plan} plan!`);
    router.back();
  };

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
                onPress={() => plan.plan !== 'free' ? handleSelectPlan(plan.plan) : null}
                disabled={plan.disabled || user?.subscription === plan.plan}
                style={[styles.planButton, plan.popular && styles.popularButton]}
                contentStyle={styles.buttonContent}
              >
                {user?.subscription === plan.plan ? 'Current Plan' : plan.buttonText}
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