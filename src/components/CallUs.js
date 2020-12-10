import React, { useState , useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    I18nManager,
    Dimensions,
    Animated,
    Linking,
    ActivityIndicator
} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Icon} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import { social } from '../actions';
import * as Animatable from "react-native-animatable";
import Loading from "../components/Loading";
import HTML from "react-native-render-html";



function CallUs({navigation}) {

    const lang                          = useSelector(state => state.lang.lang);
    const [loader, setLoader]           = useState(true);
    const follower                      = useSelector(state => state.article.social ? state.article.social : '');
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(social(lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
    }

    useEffect(() => {
        fetchData();
    }, []);

    function renderLoader(){
        if (loader){
            return(
                <Loading/>
            );
        }
    }

    return (
        <Container>

            { renderLoader() }

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
                        { i18n.t('contact') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R, styles.flexCenter, styles.Width_100 ]}>

                <View style={[ styles.marginVertical_30, styles.paddingHorizontal_30, styles.Width_100 ]}>
                    <Animatable.View animation="zoomIn" easing="ease-out" delay={500} style={[styles.Width_100]}>
                        <TouchableOpacity
                            onPress={() => {Linking.openURL('tel://' + follower.phone )}}
                            style={[ styles.Width_100, styles.paddingVertical_10, styles.SelfRight, styles.marginVertical_10, styles.Radius_50, styles.paddingHorizontal_15, { backgroundColor : '#00AFF0'} ]}
                        >
                            <View style={[ styles.width_35, styles.height_35, styles.flexCenter, styles.Radius_50, styles.bg_White, styles.marginHorizontal_10]}>
                                <Icon style={[styles.textSize_20, { color : '#00AFF0' }]} type="FontAwesome5" name='phone' />
                            </View>
                            <Text style={[styles.FairuzBold , styles.text_White , styles.textSize_15, styles.textDir]}>
                                { follower.phone }
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View animation="zoomIn" easing="ease-out" delay={700} style={[styles.Width_100]}>
                        <TouchableOpacity
                            onPress={() => {Linking.openURL('mailto:' + follower.email )}}
                            style={[ styles.Width_100, styles.paddingVertical_10, styles.SelfRight, styles.marginVertical_10, styles.Radius_50, styles.paddingHorizontal_15, { backgroundColor : '#dd4b39' } ]}>
                            <View style={[ styles.width_35, styles.height_35, styles.flexCenter, styles.Radius_50, styles.bg_White, styles.marginHorizontal_10]}>
                                <Icon style={[styles.textSize_20, { color : '#dd4b39' }]} type="Zocial" name='email' />
                            </View>
                            <Text style={[styles.FairuzBold , styles.text_White , styles.textSize_15, styles.textDir]}>
                                { follower.email }
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View animation="zoomIn" easing="ease-out" delay={1000} style={[styles.Width_100]}>
                        <TouchableOpacity
                            onPress={() => {Linking.openURL('http://api.whatsapp.com/send?phone=' + follower.whatsapp )}}
                            style={[ styles.Width_100, styles.paddingVertical_10, styles.SelfRight, styles.marginVertical_10, styles.Radius_50, styles.paddingHorizontal_15 , { backgroundColor : '#25D366' } ]}>
                            <View style={[ styles.width_35, styles.height_35, styles.flexCenter, styles.Radius_50, styles.bg_White, styles.marginHorizontal_10]}>
                                <Icon style={[styles.textSize_20, { color : '#25D366' }]} type="FontAwesome" name='whatsapp' />
                            </View>
                            <Text style={[styles.FairuzBold , styles.text_White , styles.textSize_15, styles.textDir]}>
                                { follower.whatsapp }
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>

            </Content>
        </Container>
    );
}

export default CallUs;
