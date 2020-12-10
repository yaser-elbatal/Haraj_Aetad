import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Container, Content } from 'native-base';
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import { useSelector, useDispatch } from 'react-redux';
import { chooseLang } from '../actions';

function Language({ navigation }) {

    const [lang, setLang] = useState('');
    const language = useSelector(state => state.lang);
    const dispatch = useDispatch();

    useEffect(() => {
        setLang(language.lang)
        console.log('language', language)
    }, []);

    function selectLang(lang) {
        setLang(lang)
    }

    function onChooseLang() {
        dispatch(chooseLang(lang));
    }

    return (
        <Container style={[styles.bg_default]}>

            <Content contentContainerStyle={[styles.bgFullWidth]}>

                {/* <View style={[styles.width_150, styles.height_150, styles.Radius_100, styles.position_A, styles.bg_default_2, { top: -40, right: -40 }]} /> */}

                <View style={[styles.paddingHorizontal_30, styles.paddingVertical_10, styles.bgFullWidth, styles.flexCenter, styles.Width_100]}>

                    <View style={[styles.overHidden, styles.flexCenter, styles.marginVertical_25]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100]}>
                            <Image
                                style={[styles.width_170, styles.height_170]}
                                source={require('../../assets/image/LogoHarag.png')}
                                resizeMode='contain'
                            />
                        </Animatable.View>
                    </View>

                    {/* <View style={[styles.overHidden, styles.marginVertical_25, styles.SelfLeft]}>
                        <Text style={[styles.FairuzBlack, styles.textSize_22, styles.text_White, styles.textDir]}>
                            {language.lang ? i18n.t('language') : 'إختر اللغة'}
                        </Text>
                    </View> */}

                    <View style={[styles.marginVertical_10, styles.Width_100]}>

                        <View style={[styles.overHidden, styles.marginVertical_5]}>
                            <Animatable.View animation="fadeIn" easing="ease-out" delay={500} style={[styles.marginVertical_5]}>
                                <TouchableOpacity
                                    style={[styles.rowGroup, styles.Border, styles.paddingVertical_15, styles.Radius_5, styles.paddingHorizontal_20, (lang === 'ar' ? styles.border_orange : styles.border_White)]}
                                    onPress={() => selectLang('ar')}
                                >
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (lang === 'ar' ? styles.text_orange : styles.text_White)]}>عربي</Text>
                                    <Animatable.View animation={lang === 'ar' ? 'zoomIn' : 'zoomOut'} easing="ease-out" delay={1000}>
                                        <Image
                                            style={[styles.width_30, styles.height_30]}
                                            source={lang === 'ar' ? require('../../assets/image/select.png') : null}
                                            resizeMode='contain'
                                        />
                                    </Animatable.View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                        <View style={[styles.overHidden, styles.marginVertical_5]}>
                            <Animatable.View animation="fadeIn" easing="ease-out" delay={800} style={[styles.marginVertical_5]}>
                                <TouchableOpacity
                                    style={[styles.rowGroup, styles.Border, styles.paddingVertical_15, styles.Radius_5, styles.paddingHorizontal_20, (lang === 'en' ? styles.border_orange : styles.border_White)]}
                                    onPress={() => selectLang('en')}
                                >
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (lang === 'en' ? styles.text_orange : styles.text_White)]}>English</Text>
                                    <Animatable.View animation={lang === 'en' ? 'zoomIn' : 'zoomOut'} easing="ease-out" delay={1000}>
                                        <Image
                                            style={[styles.width_30, styles.height_30]}
                                            source={lang === 'en' ? require('../../assets/image/select.png') : null}
                                            resizeMode='contain'
                                        />
                                    </Animatable.View>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>

                    </View>

                    <Animatable.View animation="fadeIn" easing="ease-out" delay={1000} style={[styles.Width_100]}>
                        <TouchableOpacity
                            style={[styles.bg_orange, styles.marginVertical_30, styles.Width_100, styles.height_55, styles.flexCenter, styles.Radius_10]}
                            onPress={onChooseLang}
                        >
                            <Text style={[styles.FairuzBlack, styles.textSize_16, styles.text_defaultHarag]}>
                                {language.lang ? i18n.t('selection') : 'تاكيد'}
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>

                </View>

            </Content>
        </Container>
    );
}

export default Language;
