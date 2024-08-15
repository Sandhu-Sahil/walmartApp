import React from 'react';
import { View } from 'react-native';
import ProductSearch from '../components/ProductSearch';

const HomeScreen = ({ navigation }) => {
    const handleProductSelect = (product) => {
        navigation.navigate('Product', { product });
    };

    return (
        <View style={{ flex: 1 }}>
            <ProductSearch onProductSelect={handleProductSelect} />
        </View>
    );
};

export default HomeScreen;
