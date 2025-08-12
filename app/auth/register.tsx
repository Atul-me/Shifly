import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Card, Checkbox, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    age: '',
    sex: '',
    role: 'both',
    tnc_agreement: false
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSexMenu, setShowSexMenu] = useState(false);

  const sexOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: 'Other' }
  ];

  const handleRegister = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone_number || !formData.password || !formData.age || !formData.sex) {
      alert('Please fill all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    if (!formData.tnc_agreement) {
      alert('Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      const success = await register(formData);
      
      if (success) {
        router.push('/auth/otp-verification');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#27ae60', '#2ecc71']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join PropertyHub today</Text>
            </View>

            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <TextInput
                  label="First Name"
                  value={formData.first_name}
                  onChangeText={(text) => setFormData({...formData, first_name: text})}
                  style={styles.input}
                />

                <TextInput
                  label="Last Name"
                  value={formData.last_name}
                  onChangeText={(text) => setFormData({...formData, last_name: text})}
                  style={styles.input}
                />

                <TextInput
                  label="Email"
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />

                <TextInput
                  label="Phone Number"
                  value={formData.phone_number}
                  onChangeText={(text) => setFormData({...formData, phone_number: text})}
                  keyboardType="phone-pad"
                  style={styles.input}
                />

                <TextInput
                  label="Age"
                  value={formData.age}
                  onChangeText={(text) => setFormData({...formData, age: text})}
                  keyboardType="numeric"
                  style={styles.input}
                />

                <Menu
                  visible={showSexMenu}
                  onDismiss={() => setShowSexMenu(false)}
                  contentStyle={styles.menuContent}
                  anchor={
                    <TextInput
                      label="Sex"
                      value={sexOptions.find(opt => opt.value === formData.sex)?.label || ''}
                      onTouchStart={() => setShowSexMenu(true)}
                      right={<TextInput.Icon icon="chevron-down" />}
                      style={styles.input}
                      editable={false}
                      showSoftInputOnFocus={false}
                    />
                  }
                >
                  {sexOptions.map((option) => (
                    <Menu.Item
                      key={option.value}
                      onPress={() => {
                        setFormData({...formData, sex: option.value});
                        setShowSexMenu(false);
                      }}
                      title={option.label}
                    />
                  ))}
                </Menu>

                <TextInput
                  label="Password"
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={styles.input}
                />

                <TextInput
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />

                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={formData.tnc_agreement ? 'checked' : 'unchecked'}
                    onPress={() => setFormData({...formData, tnc_agreement: !formData.tnc_agreement})}
                  />
                  <Text style={styles.checkboxText}>
                    I agree to the Terms and Conditions
                  </Text>
                </View>

                <Button
                  mode="contained"
                  onPress={handleRegister}
                  loading={loading}
                  disabled={loading || !formData.tnc_agreement}
                  style={styles.registerButton}
                  contentStyle={styles.registerButtonContent}
                >
                  Create Account
                </Button>

                <View style={styles.divider}>
                  <Text style={styles.dividerText}>Already have an account?</Text>
                </View>

                <Button
                  mode="outlined"
                  onPress={() => router.push('/auth/login')}
                  style={styles.loginButton}
                  contentStyle={styles.loginButtonContent}
                >
                  Login
                </Button>
              </Card.Content>
            </Card>

            <Button
              mode="text"
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace('/(tabs)');
                }
              }}
              style={styles.backButton}
              textColor="#fff"
            >
              Back to App
            </Button>
          </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
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
  },
  card: {
    borderRadius: 16,
    elevation: 8,
  },
  cardContent: {
    padding: 32,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  registerButton: {
    borderRadius: 12,
    marginTop: 8,
  },
  registerButtonContent: {
    height: 50,
  },
  divider: {
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 12,
    borderColor: '#27ae60',
  },
  loginButtonContent: {
    height: 50,
  },
  backButton: {
    marginTop: 24,
    alignSelf: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxText: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 8,
    flex: 1,
  },
  menuContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});