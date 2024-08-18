import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { putDiscoverZone } from './services/putDiscoverZone';

const Offer = () => {
  const [idZone] = useState(3);
  const [idUser] = useState(1);
  const [unlock] = useState(true);

  const handleButtonClick = async () => {
    try {
      const result = await putDiscoverZone(idZone, idUser, unlock);
      console.log('Discover zone result:', result);
    } catch (error) {
      console.error('Error discovering zone:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Discover Zone" onPress={handleButtonClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Offer;
