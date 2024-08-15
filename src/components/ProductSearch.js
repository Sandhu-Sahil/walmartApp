import React from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import productsData from '../data/productDetails.json';

const ProductSearch = ({ onProductSelect }) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={{ padding: 16 }}>
            <TextInput
                placeholder="Search Product"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={{ padding: 8, borderWidth: 1, borderRadius: 4, marginBottom: 16 }}
            />
            <FlatList
                data={filteredProducts}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onProductSelect(item)}>
                        <Text style={{ padding: 8, borderBottomWidth: 1 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.productId}
            />
        </View>
    );
};

export default ProductSearch;
