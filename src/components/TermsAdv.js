import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions, ActivityIndicator} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import { addAdvTerms } from '../actions';
import * as Animatable from "react-native-animatable";
import HTML from "react-native-render-html";
import Loading from "../components/Loading";


function TermsAdv({navigation, route}) {

    const lang                          = useSelector(state => state.lang.lang);
    const [num]                         = useState(route.params.num);
    const [loader, setLoader]           = useState(true);
    const terms                         = useSelector(state => state.article.addTerms ? state.article.addTerms : '');
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(addAdvTerms(lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
    }

    useEffect(() => {
        fetchData();
    }, []);

    function onSubmit(num){
        if (num === 0){
            navigation.navigate('chooseCategory', { namePage : 'addAdv' });
        } else {
            navigation.navigate('uploadPhotoAdv');
        }
    }

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
                        { i18n.t('ter') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth ]}>

                <View style={[ styles.Width_100, styles.height_full , styles.flexCenter ]}>

                    <View>

                        <View style={[ styles.flexCenter, styles.paddingHorizontal_10 ]}>
                            <Text style={[styles.FairuzNormal, styles.text_black, styles.textSize_16, styles.textCenter, styles.marginVertical_10]}>
                                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                            </Text>

                            <Text style={[styles.FairuzNormal, styles.text_black, styles.textSize_16, styles.textCenter]}>
                                ( وَأَوْفُوا بِعَهْدِ اللَّهِ إِذَا عَاهَدتُّمْ وَلَا تَنقُضُوا الْأَيْمَانَ بَعْدَ تَوْكِيدِهَا وَقَدْ جَعَلْتُمُ اللَّهَ عَلَيْكُمْ كَفِيلًا ۚ إِنَّ اللَّهَ يَعْلَمُ مَا تَفْعَلُونَ )
                            </Text>
                        </View>

                        <View style={[ styles.Width_90, styles.flexCenter, styles.paddingHorizontal_10, styles.marginVertical_10 ]}>
                            <HTML
                                html                  = {terms}
                                imagesMaxWidth        = {Dimensions.get('window').width}
                                baseFontStyle         = {{
                                    fontSize            : 16,
                                    fontFamily          : 'FairuzNormal',
                                    color               : '#363636',
                                    writingDirection    : I18nManager.isRTL ? 'rtl' : 'ltr'
                                }}
                            />
                        </View>

                        <View style={[ styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10, styles.overHidden ]}>

                            <Animatable.View animation="zoomIn" easing="ease-out" delay={300}>

                                <TouchableOpacity
                                    style       = {[ styles.bg_orange ,styles.marginVertical_10 , styles.width_150, styles.height_50 , styles.flexCenter, styles.Radius_10]}
                                    onPress     = {() => onSubmit(num)}
                                >
                                    <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_default]}>
                                        { i18n.t('ok') }
                                    </Text>
                                </TouchableOpacity>

                            </Animatable.View>

                            <Animatable.View animation="zoomIn" easing="ease-out" delay={500}>

                                <TouchableOpacity
                                    style       = {[ styles.bg_default ,styles.marginVertical_10 , styles.width_150, styles.height_50 , styles.flexCenter, styles.Radius_10]}
                                    onPress     = {() => navigation.navigate('chooseAdv')}
                                >
                                    <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_orange]}>
                                        { i18n.t('cancel') }
                                    </Text>
                                </TouchableOpacity>

                            </Animatable.View>

                        </View>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default TermsAdv;
