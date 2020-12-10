import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import {ImageBrowser} from 'expo-image-picker-multiple';
import i18n from "../../locale/i18n";
function ImageBrowserScreen ({ navigation, route }) {

    const [photos, setPhotos] = useState([]);

    const imagesCallback = (callback) => {
        navigation.setParams({ loading: true });
        callback.then(async (photos) => {
            const cPhotos = [];
            for(let photo of photos) {
                const pPhoto = await _processImageAsync(photo.uri);
                cPhotos.push({
                    uri: pPhoto.uri,
                    name: photo.filename,
                    type: 'image/jpg'
                })
            }
            setPhotos(cPhotos);
        })
            .catch((e) => console.log(e))
            .finally(() => navigation.setParams({ loading: false }));
    };

    function navigateWithPhotos(){
        const { routeName } = route.params;
        return navigation.navigate(routeName, {photos});
    }

    async function _processImageAsync(uri) {
        const file = await ImageManipulator.manipulateAsync(
            uri,
            [{resize: { width: 1000 }}],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return file;
    }

    const updateHandler = (count, onSubmit) => {
        navigation.setParams({
            headerTitle: `Selected ${count} files`,
            headerRight: onSubmit,
        });
    };

    const renderSelectedComponent = (number) => (
        <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{number}</Text>
        </View>
    );

    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

    return (
        <View style={[styles.flex, styles.container]}>
            <View style={{ backgroundColor: '#2E234D', width: '100%', height: 60, top: 0, flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[ styles.FairuzBold, { color : '#FFF' } ]}>
                        { i18n.t('cancel') }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity title={'Done'} onPress={() => navigateWithPhotos()}>
                    <Text style={[ styles.FairuzBold, { color : '#FFF' } ]}>
                        { i18n.t('ok') }
                    </Text>
                </TouchableOpacity>
            </View>
            <ImageBrowser
                max={4}
                onChange={updateHandler}
                callback={imagesCallback}
                renderSelectedComponent={renderSelectedComponent}
                emptyStayComponent={emptyStayComponent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        position: 'relative'
    },
    emptyStay:{
        textAlign: 'center',
    },
    countBadge: {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: '#2E234D'
    },
    countBadgeText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        color: '#ffffff'
    },
    FairuzBold : {
        fontFamily          : 'FairuzBold'
    },
});

export default ImageBrowserScreen;
