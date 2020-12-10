import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    I18nManager,
    Dimensions,
    ActivityIndicator,
    ScrollView, Linking, Animated
} from "react-native";
import { Container, Content, Header, Button, Left, Body, Title, CheckBox, Icon, Item, Textarea } from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import { aboutUs } from '../actions';
import * as Animatable from "react-native-animatable";
import HTML from "react-native-render-html";
import Loading from "../components/Loading";



function About({ navigation }) {

    const lang = useSelector(state => state.lang.lang);
    const [loader, setLoader] = useState(true);
    const about = useSelector(state => state.article.about ? state.article.about : '');
    const dispatch = useDispatch();

    function fetchData() {
        dispatch(aboutUs(lang)).then(() => setLoader(false)).catch(() => setLoader(false));
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
                    <TouchableOpacity style={[styles.Button]} transparent onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.width_25, styles.height_25]}
                            source={lang !== 'ar' || lang == null ? require('../../assets/image/left.png') : require('../../assets/image/right.png')}
                        />
                    </TouchableOpacity>
                </Left>
                <Body style={[styles.bodyText]}>
                    <Title style={[styles.FairuzBold, styles.text_White, styles.textSize_18,]}>
                        {i18n.t('about')}
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[styles.bgFullWidth, styles.position_R]}>

                <View style={[styles.flexCenter, styles.marginVertical_20, styles.Width_100,]}>
                    <Image
                        style={[styles.width_170, styles.height_170, { borderRadius: 25 }]}
                        source={require('../../assets/image/LogoHarag.png')}
                        resizeMode='contain'
                    />
                </View>

                <View style={[styles.Width_90, styles.flexCenter, styles.paddingHorizontal_10]}>
                    <HTML
                        html={about}
                        imagesMaxWidth={Dimensions.get('window').width}
                        baseFontStyle={{
                            fontSize: 16,
                            fontFamily: 'FairuzNormal',
                            color: '#363636',
                            writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
                        }}
                    />
                </View>


            </Content>
        </Container>
    );
}

export default About
