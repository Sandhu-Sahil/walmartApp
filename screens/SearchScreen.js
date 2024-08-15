import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import products from '../data/products.json';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductSelect = (product) => {
    navigation.navigate('Map', { product });
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Search for a product..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ padding: 8, borderWidth: 1, borderRadius: 4, marginBottom: 16 }}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductSelect(item)}>
            <Text style={{ padding: 8, borderBottomWidth: 1 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchScreen;
