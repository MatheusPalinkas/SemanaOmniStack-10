import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';


function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                });
            }
        }

        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    function handRegionChanged(region) {
        setCurrentRegion(region);
    }
    return (
        <>
            <MapView
                onRegionChangeComplete={handRegionChanged}
                style={styles.map}
                initialRegion={currentRegion}>
                <Marker
                    style={styles.teste}
                    coordinate={{ latitude: -23.9499042, longitude: -46.4489193 }}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: 'https://avatars3.githubusercontent.com/u/47289940?v=4' }} />
                    <Callout onPress={() => {
                        //navegação
                        navigation.navigate('Profile', { github_username: 'josuefonseca' });

                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>Josue</Text>
                            <Text style={styles.devBio}>Apenas um dev</Text>
                            <Text style={styles.devTechs}> C#, Java</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por tecnologias"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false} />
                <TouchableOpacity style={styles.loadButton}
                    onPress={() => { }}>
                    <MaterialIcons
                        name="my-location"
                        size={20}
                        color='#FFF' />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 15,
        borderWidth: 4,
        backgroundColor: '#FFF'
    },
    teste: {
        width: 60,
        height: 60,
        padding: 3,

    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 5,
        right: 5,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        backgroundColor: '#fafafa',
        padding: 10,
        flex: 1,
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: "#8e4dff",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
});


export default Main;