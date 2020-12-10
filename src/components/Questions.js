import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions, ActivityIndicator} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import { allQuestions } from '../actions';
import * as Animatable from "react-native-animatable";
import HTML from "react-native-render-html";
import Loading from "../components/Loading";



function Questions({navigation}) {

    const lang                          = useSelector(state => state.lang.lang);
    const [loader, setLoader]           = useState(true);
    const questions                     = useSelector(state => state.article.data ? state.article.data : []);
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(allQuestions(lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
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
                        { i18n.t('FAQs') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R ]}>

                <View style={[ styles.flexCenter, styles.marginVertical_20, styles.Width_100, ]}>
                    <Image
                        style={[styles.width_170, styles.height_170]}
                        source={require('../../assets/image/logo.png')}
                        resizeMode='contain'
                    />
                </View>

                <View style={[ styles.Width_100, styles.paddingHorizontal_10 ]}>
                    {
                        questions.map((quest) => {
                                return (
                                    <View style={[ styles.overHidden, styles.flex_50, styles.paddingHorizontal_5 ]}>
                                        <View style={[ styles.bg_White, styles.Radius_10, styles.paddingVertical_10, styles.paddingHorizontal_10, styles.marginVertical_10 ]}>
                                            <Text style={[ styles.textSize_16, styles.FairuzNormal, styles.text_default, styles.textDir ]}>- { quest.question }</Text>
                                        </View>
                                        <View style={[ styles.paddingHorizontal_20 ]}>
                                            <Text style={[ styles.textSize_16, styles.FairuzNormal, styles.text_bold_gray, styles.textDir ]}>
                                                { quest.answer }
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }
                        )
                    }
                </View>

            </Content>
        </Container>
    );
}

export default Questions;
