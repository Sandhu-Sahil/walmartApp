import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetails = ({ product }) => {
    if (!product) return null;

    return (
        <View style={{ padding: 16, backgroundColor: 'white', borderTopWidth: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name}</Text>
            <Text>{product.details}</Text>
            <Text>Aisle: {product.aisleId}</Text>
        </View>
    );
};


export default ProductDetails;
