import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Modal, Portal, Divider } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Building, 
  ChevronDown, 
  CreditCard, 
  Search, 
  BookOpen, 
  FileText, 
  Upload, 
  Heart, 
  Calendar, 
  Settings, 
  Bell, 
  LogOut, 
  UserPlus 
} from 'lucide-react-native';

interface DrawerModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const DrawerModal: React.FC<DrawerModalProps> = ({ visible, onDismiss }) => {
  const { isAuthenticated, logout } = useAuth();

  const handleNavigation = (route: string) => {
    onDismiss();
    router.push(route);
  };

  const handleLogout = () => {
    onDismiss();
    logout();
  };

  const menuItems = [
    {
      title: 'Home',
      icon: () => <Home size={20} color="#e74c3c" />,
      onPress: () => handleNavigation('/(tabs)'),
    },
    {
      title: 'Property Types',
      icon: () => <Building size={20} color="#e74c3c" />,
      hasDropdown: true,
      onPress: () => handleNavigation('/property-types'),
    },
  ];

  const userItems = [
    {
      title: 'Subscriptions',
      icon: () => <CreditCard size={20} color="#e74c3c" />,
      onPress: () => handleNavigation('/subscriptions'),
    },
    {
      title: 'Customize Search',
      icon: () => <Search size={20} color="#e74c3c" />,
      onPress: () => handleNavigation('/customize-search'),
    },
    {
      title: 'Agent Guide',
      icon: () => <BookOpen size={20} color="#e74c3c" />,
      onPress: () => handleNavigation('/agent-guide'),
    },
    {
      title: 'Listing posts',
      icon: () => <FileText size={20} color="#e74c3c" />,
      onPress: () => handleNavigation('/listing-posts'),
    },
    {
      title: 'Upload to advertise',
      icon: () => <Upload size={20} color="#e74c3c" />,
      onPress: () => handleNavigation('/upload-advertise'),
    },
  ];

  const otherItems = [
    {
      title: 'Favourite',
      icon: () => <Heart size={20} color="#e74c3c" />,
      onPress: () => handleNavigation('/(tabs)/favorites'),
    },
    {
      title: 'Property Events',
      icon: () => <Calendar size={20} color="#e74c3c" />,
      onPress: () => handleNavigation('/property-events'),
    },
    {
      title: 'Settings',
      icon: () => <Settings size={20} color="#e74c3c" />,
      onPress: () => handleNavigation('/settings'),
    },
    {
      title: 'Notifications',
      icon: () => <Bell size={20} color="#e74c3c" />,
      onPress: () => handleNavigation('/notifications'),
    },
  ];

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Main Menu</Text>
            <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Main Menu Items */}
          <View style={styles.section}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                <View style={styles.menuItemContent}>
                  {item.icon()}
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                {item.hasDropdown && <ChevronDown size={16} color="#e74c3c" />}
              </TouchableOpacity>
            ))}
          </View>

          <Divider style={styles.divider} />

          {/* For Users Section */}
          <Text style={styles.sectionTitle}>For Users</Text>
          <View style={styles.section}>
            {userItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                <View style={styles.menuItemContent}>
                  {item.icon()}
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Divider style={styles.divider} />

          {/* Others Section */}
          <Text style={styles.sectionTitle}>Others</Text>
          <View style={styles.section}>
            {otherItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                <View style={styles.menuItemContent}>
                  {item.icon()}
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Divider style={styles.divider} />

          {/* Login Section */}
          <Text style={styles.sectionTitle}>Login</Text>
          <View style={styles.section}>
            {isAuthenticated ? (
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <View style={styles.menuItemContent}>
                  <LogOut size={20} color="#e74c3c" />
                  <Text style={styles.menuItemText}>Login out</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/auth/login')}>
                  <View style={styles.menuItemContent}>
                    <UserPlus size={20} color="#e74c3c" />
                    <Text style={styles.menuItemText}>Login</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/auth/register')}>
                  <View style={styles.menuItemContent}>
                    <UserPlus size={20} color="#e74c3c" />
                    <Text style={styles.menuItemText}>Login with different Id</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#4a5568',
    margin: 0,
    marginRight: 80,
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 12,
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 10,
  },
});