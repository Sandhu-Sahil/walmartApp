import React from 'react';
import { View } from 'react-native';
import MapView from '../components/MapView';
import ProductDetails from '../components/ProductDetails';

const ProductScreen = ({ route }) => {
    const { product } = route.params;

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <MapView aisleId={product.aisleId} style={{ flex: 3 }} />
            <ProductDetails product={product} style={{ flex: 1 }} />
        </View>
    );
};

export default ProductScreen;
