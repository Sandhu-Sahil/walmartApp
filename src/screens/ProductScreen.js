import React from 'react';
import { View } from 'react-native';
import MapView from '../components/MapView';
import ProductDetails from '../components/ProductDetails';

const ProductScreen = ({ route }) => {
    const { product } = route.params;
    const [locate, setLocate] = React.useState(false);

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <MapView 
                aisleId={product.aisleId} 
                locate={locate}
                setLocate={setLocate}
                style={{ flex: 3 }} 
            />
            <ProductDetails 
                product={product} 
                locate={locate} 
                setLocate={setLocate}
                style={{ flex: 1 }} 
            />
        </View>
    );
};

export default ProductScreen;
