import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProductDetails = ({ product, locate, setLocate }) => {
    if (!product) return null;

    return (
        <View style={{ padding: 16, backgroundColor: 'white', borderTopWidth: 1 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name}</Text>
                <Text style={{ fontSize: 16, color: 'gray' }}>₹ {product.price}</Text>
                <Text>{product.description}</Text>
                <Text>Aisle ID: {product.aisleId}</Text>
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={() => setLocate(!locate)} style={locate ? styles.buttonStop : styles.button}>
                    <Text style={styles.buttonText}>{locate ? 'Stop' : 'Locate'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonStop:{
        marginTop: 10,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default ProductDetails;
