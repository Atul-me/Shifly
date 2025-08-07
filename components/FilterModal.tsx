import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Button, Chip, TextInput, Divider } from 'react-native-paper';
import { useApp } from '../context/AppContext';

interface FilterModalProps {
  visible: boolean;
  onDismiss: () => void;
  onApply: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ visible, onDismiss, onApply }) => {
  const { filters, updateFilters } = useApp();
  const [localFilters, setLocalFilters] = useState(filters);

  const cities = ['Delhi', 'Noida', 'Gurgaon'];
  const categories = ['Apartment', 'Villa', 'Commercial'];
  const bhkOptions = [1, 2, 3, 4, 5];

  const handleApply = () => {
    updateFilters(localFilters);
    onApply();
  };

  const handleReset = () => {
    const resetFilters = {
      type: 'Buy' as 'Buy' | 'Rent',
      city: '',
      category: '',
      minPrice: 0,
      maxPrice: 100000000,
      bhk: 0
    };
    setLocalFilters(resetFilters);
    updateFilters(resetFilters);
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <ScrollView>
          <Text style={styles.title}>Filter Properties</Text>
          
          {/* Property Type */}
          <Text style={styles.sectionTitle}>Property Type</Text>
          <View style={styles.chipContainer}>
            <Chip
              selected={localFilters.type === 'Buy'}
              onPress={() => setLocalFilters({...localFilters, type: 'Buy'})}
              style={styles.chip}
            >
              Buy
            </Chip>
            <Chip
              selected={localFilters.type === 'Rent'}
              onPress={() => setLocalFilters({...localFilters, type: 'Rent'})}
              style={styles.chip}
            >
              Rent
            </Chip>
          </View>

          <Divider style={styles.divider} />

          {/* City */}
          <Text style={styles.sectionTitle}>City</Text>
          <View style={styles.chipContainer}>
            {cities.map((city) => (
              <Chip
                key={city}
                selected={localFilters.city === city}
                onPress={() => setLocalFilters({...localFilters, city: city === localFilters.city ? '' : city})}
                style={styles.chip}
              >
                {city}
              </Chip>
            ))}
          </View>

          <Divider style={styles.divider} />

          {/* Category */}
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.chipContainer}>
            {categories.map((category) => (
              <Chip
                key={category}
                selected={localFilters.category === category}
                onPress={() => setLocalFilters({...localFilters, category: category === localFilters.category ? '' : category})}
                style={styles.chip}
              >
                {category}
              </Chip>
            ))}
          </View>

          <Divider style={styles.divider} />

          {/* BHK */}
          <Text style={styles.sectionTitle}>BHK</Text>
          <View style={styles.chipContainer}>
            {bhkOptions.map((bhk) => (
              <Chip
                key={bhk}
                selected={localFilters.bhk === bhk}
                onPress={() => setLocalFilters({...localFilters, bhk: bhk === localFilters.bhk ? 0 : bhk})}
                style={styles.chip}
              >
                {bhk}BHK
              </Chip>
            ))}
          </View>

          <Divider style={styles.divider} />

          {/* Price Range */}
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.priceContainer}>
            <TextInput
              label="Min Price"
              value={localFilters.minPrice.toString()}
              onChangeText={(text) => setLocalFilters({...localFilters, minPrice: parseInt(text) || 0})}
              keyboardType="numeric"
              style={styles.priceInput}
            />
            <TextInput
              label="Max Price"
              value={localFilters.maxPrice === 100000000 ? '' : localFilters.maxPrice.toString()}
              onChangeText={(text) => setLocalFilters({...localFilters, maxPrice: parseInt(text) || 100000000})}
              keyboardType="numeric"
              style={styles.priceInput}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button mode="outlined" onPress={handleReset} style={styles.button}>
              Reset
            </Button>
            <Button mode="contained" onPress={handleApply} style={styles.button}>
              Apply Filters
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  priceInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
});