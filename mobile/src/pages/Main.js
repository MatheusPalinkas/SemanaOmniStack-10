import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect,subscribeToNewDevs } from '../services/socket'

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState("");

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
    useEffect(() => {
        subscribeToNewDevs(dev =>  setDevs([...devs, dev]));
    },[devs]);

    if (!currentRegion) {
        return null;
    }
    function setupWebSocket() {
        disconnect();
        
        const { latitude, longitude } = currentRegion;
        connect(
            latitude,
            longitude,
            techs,
        );
    }

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const response = await api.get(`/search`, {
            params: {
                latitude,
                longitude,
                techs: techs.toUpperCase(),
            }
        });

        setDevs(response.data.devs);
        setupWebSocket();
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
                {devs.map(dev => (
                    <Marker
                        key={dev._id}
                        style={styles.teste}
                        coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0] }}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: dev.avatar_url }} />
                        <Callout onPress={() => {
                            //navegação
                            navigation.navigate('Profile', { github_username: dev.gitHub_username });

                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por tecnologias"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs} />
                <TouchableOpacity
                    style={styles.loadButton}
                    onPress={loadDevs}>
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
        borderWidth: 2,
        borderColor: "#8e4dff",
        backgroundColor: '#FFF'
    },
    teste: {
        width: 60,
        height: 60,

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