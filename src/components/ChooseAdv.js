import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from "react-native-animatable";


function ChooseAdv({navigation}) {

    const lang                          = useSelector(state => state.lang.lang);

    function onSubmit(num){
        navigation.navigate('termsAdv', {num : num});
    }

    return (
        <Container>

            <Header style={[ styles.headerView, styles.bg_default, styles.Width_100, styles.paddingHorizontal_15 ]}>
                <Left style={[ styles.leftIcon, ]}>
                    <TouchableOpacity style={[styles.Button ]} transparent onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.width_25, styles.height_25]}
                            source={lang !== 'ar' || lang == null ? require('../../assets/image/left.png') : require('../../assets/image/right.png')}
                        />
                    </TouchableOpacity>
                </Left>
                <Body style={[styles.bodyText]}>
                    <Title style={[styles.FairuzBold , styles.text_White, styles.textSize_18,]}>
                        { i18n.t('addads') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.flexCenter, styles.Width_100 ]}>

                <View style={[ styles.overHidden, styles.Width_100 ]}>

                    <Animatable.View animation="zoomIn" easing="ease-out" delay={300} style={[styles.Width_100]}>

                        <TouchableOpacity
                            style       = {[ styles.bg_default ,styles.marginVertical_10 , styles.width_200, styles.height_50 , styles.flexCenter]}
                            onPress     = {() => onSubmit(0)}
                        >
                            <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                { i18n.t('ad') }
                            </Text>
                        </TouchableOpacity>

                    </Animatable.View>

                    <Animatable.View animation="zoomIn" easing="ease-out" delay={500} style={[styles.Width_100]}>

                        <TouchableOpacity
                            style       = {[ styles.bg_orange ,styles.marginVertical_10 , styles.width_200, styles.height_50 , styles.flexCenter]}
                            onPress     = {() => onSubmit(1)}
                        >
                            <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                { i18n.t('pho') }
                            </Text>
                        </TouchableOpacity>

                    </Animatable.View>

                </View>

            </Content>
        </Container>
    );
}

export default ChooseAdv;
