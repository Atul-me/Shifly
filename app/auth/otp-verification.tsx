import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function OTPVerificationScreen() {
  const { verifyOTP, pendingUser } = useAuth();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const success = await verifyOTP(otp);
      if (success) {
        router.replace('/(tabs)');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      alert('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    alert('OTP resent to your phone number');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3498db', '#2980b9']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Verify OTP</Text>
              <Text style={styles.subtitle}>
                Enter the 6-digit code sent to {pendingUser?.phone_number}
              </Text>
              <Text style={styles.hint}>
                Demo OTP: 123456
              </Text>
            </View>

            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <TextInput
                  label="Enter OTP"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
                  maxLength={6}
                  style={styles.input}
                  textAlign="center"
                />

                <Button
                  mode="contained"
                  onPress={handleVerifyOTP}
                  loading={loading}
                  disabled={loading}
                  style={styles.verifyButton}
                  contentStyle={styles.verifyButtonContent}
                >
                  Verify OTP
                </Button>

                <Button
                  mode="text"
                  onPress={handleResendOTP}
                  style={styles.resendButton}
                  textColor="#3498db"
                >
                  Resend OTP
                </Button>
              </Card.Content>
            </Card>

            <Button
              mode="text"
              onPress={() => router.back()}
              style={styles.backButton}
              textColor="#fff"
            >
              Back to Registration
            </Button>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  card: {
    borderRadius: 16,
    elevation: 8,
  },
  cardContent: {
    padding: 32,
  },
  input: {
    marginBottom: 24,
    backgroundColor: '#fff',
    fontSize: 24,
    letterSpacing: 8,
  },
  verifyButton: {
    borderRadius: 12,
    marginBottom: 16,
  },
  verifyButtonContent: {
    height: 50,
  },
  resendButton: {
    marginBottom: 16,
  },
  backButton: {
    marginTop: 24,
    alignSelf: 'center',
  },
});