import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, I18nManager, Dimensions, Linking } from "react-native";
import { Container, Content, Header, Button, Left, Body, Title } from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from "react-native-animatable";
import { photoAds } from "../actions";
import Loading from "../components/Loading";

function PhotoAdv({ navigation }) {

    const lang = useSelector(state => state.lang.lang);
    const allPhoto = useSelector(state => state.allPhotoAdv.allPhoto ? state.allPhotoAdv.allPhoto : []);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);

    function fetchData() {
        dispatch(photoAds(lang)).then(() => setLoader(false)).catch(() => setLoader(false));
    }

    useEffect(() => {
        fetchData();
    }, []);

    function renderLoader() {
        if (loader) {
            return (
                <Loading />
            );
        }
    }

    return (
        <Container>

            {renderLoader()}

            <Header style={[styles.headerView, styles.bg_default, styles.Width_100, styles.paddingHorizontal_15]}>
                <Left style={[styles.leftIcon,]}>
                    <TouchableOpacity style={[styles.Button]} transparent onPress={() => navigation.openDrawer()}>
                        <Image
                            style={[styles.width_25, styles.height_25]}
                            source={require('../../assets/image/menu.png')}
                        />
                    </TouchableOpacity>
                </Left>
                <Body style={[styles.bodyText]}>
                    <Title style={[styles.FairuzBold, styles.text_White, styles.textSize_18,]}>
                        {i18n.t('Imageads')}
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[styles.bgFullWidth, styles.position_R, styles.paddingBottom_60]}>

                {
                    allPhoto.length !== 0 ?
                        <View style={[styles.rowGroup, styles.paddingHorizontal_5, styles.paddingVertical_10, styles.height_full]}>

                            {
                                allPhoto.map((photo) => {
                                    return (
                                        <View style={[styles.overHidden, styles.flex_50, styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                            <Animatable.View animation="zoomIn" easing="ease-out" delay={900} style={[styles.Width_100, styles.paddingVertical_10]}>
                                                <TouchableOpacity
                                                    onPress={() => { Linking.openURL(photo.url) }}
                                                    style={[styles.boxShadow, styles.bg_White, styles.marginHorizontal_5, styles.flexCenter, styles.Width_100, styles.Radius_10, styles.height_250]}>

                                                    <Image
                                                        style={[styles.Width_100, styles.height_full, styles.Radius_5]}
                                                        source={{ uri: photo.icon }}
                                                    />
                                                </TouchableOpacity>
                                            </Animatable.View>
                                        </View>
                                    )
                                }
                                )
                            }

                        </View>
                        :
                        <Animatable.View animation="zoomIn" easing="ease-out" delay={500} style={[styles.Width_100]}>
                            <View style={[styles.flexCenter, styles.height_full]}>
                                <Image
                                    style={[styles.width_150, styles.height_150]}
                                    source={require('../../assets/image/empty.png')}
                                    resizeMode='contain'
                                />
                            </View>
                        </Animatable.View>
                }

            </Content>
        </Container>
    );
}

export default PhotoAdv;
