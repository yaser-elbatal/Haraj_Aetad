import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView,
    Animated,
    ActivityIndicator
} from "react-native";
import { Body, Button, Container, Content, Form, Header, Icon, Input, Item, Left, Title, Toast, } from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import { useSelector, useDispatch } from 'react-redux';
import { activate, resentCode } from '../actions';
import Loading from "../components/Loading";
import CountDown from "react-native-countdown-component";

function ActiveAccount({ navigation, route }) {

    const lang = useSelector(state => state.lang.lang);
    const newCode = useSelector(state => state.resentCode.code);
    const [loader, setLoader] = useState(false);
    const [fading, setFading] = useState(true);
    const dispatch = useDispatch();
    const [token] = useState(route.params.token);
    const [coding] = useState(route.params.code);
    const [code, setCode] = useState('');
    const [codeStatus, setCodeStatus] = useState(0);
    const [codeValue] = useState(new Animated.Value(0));

    useEffect(() => {
        alert(i18n.t('actcode') + ':' + coding)
    }, []);

    function activeInput(type) {
        if (type === 'code' || code !== '') {
            setCodeStatus(1);
            const toValue = -25;
            Animated.spring(
                codeValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }

    }

    function unActiveInput(type) {
        if (type === 'code' && code === '') {
            setCodeStatus(0);
            const toValue = -3;
            Animated.spring(
                codeValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }
    }

    const validate = () => {

        let isError = false;
        let msg = '';

        if (code.length <= 0) {
            isError = true;
            msg = i18n.t('codeN');
        } else if (code != coding) {
            isError = true;
            msg = i18n.t('codeNotCorrect');
        }

        if (msg !== '') {
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBlack',
                    textAlign: 'center'
                }
            });
        }

        return isError;

    };

    function onSubmit() {
        const err = validate();
        if (!err) {
            setLoader(true);
            dispatch(activate(token, code, lang, navigation)).then(() => setLoader(false)).catch(() => setLoader(false));
        }

    }

    function onResentCode() {
        dispatch(resentCode(token, lang)).then(() => {
            setFading(true);
            setTimeout(() => {
                alert(i18n.t('coNew') + ':' + newCode)
            }, 500);
        }).catch(() => setFading(false));
    }

    function renderLoader() {
        if (loader) {
            return (
                <Loading />
            );
        }
    }

    return (
        <Container style={[styles.bg_default]}>

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
                        {/*{i18n.t('actcode')}*/}
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[styles.bgFullWidth, styles.flexCenter]}>
                <View style={[styles.overHidden]}>
                    <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100]}>
                        <Image
                            style={[styles.width_170, styles.height_170, { alignSelf: 'center' }]}
                            source={require('../../assets/image/LogoHarag.png')}
                            resizeMode='contain'
                        />
                    </Animatable.View>
                </View>

                <View style={[styles.overHidden, styles.paddingHorizontal_30, styles.marginTop_30,]}>
                    <Text style={[styles.FairuzBold, styles.textSize_18, styles.text_White, styles.textDir,]}>
                        {i18n.translate('codeen')}
                    </Text>
                </View>

                <View style={[styles.position_R, styles.flexCenter, styles.Width_100]}>



                    <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_90, styles.paddingHorizontal_10]}>
                        <Form style={[styles.flexCenter, styles.Width_100, styles.marginVertical_20]}>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_10]}>
                                <Animated.View style={[styles.position_A, styles.left_10, { transform: [{ translateY: codeValue }] }, (codeStatus === 1 ? styles.inAct : styles.unAct)]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (codeStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                        {i18n.translate('code')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.Radius_5, (codeStatus === 1 ? styles.Active : styles.noActive)]}
                                        onChangeText={(code) => setCode(code)}
                                        onBlur={() => unActiveInput('code')}
                                        onFocus={() => activeInput('code')}
                                        keyboardType={'number-pad'}
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity
                                style={[styles.bg_orange, styles.marginVertical_30, styles.width_200, styles.height_55, styles.flexCenter, styles.Radius_10]}
                                onPress={() => onSubmit()}
                            >
                                <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_defaultHarag]}>
                                    {i18n.t('sent')}
                                </Text>
                            </TouchableOpacity>

                        </Form>
                    </KeyboardAvoidingView>

                    {
                        fading ?
                            <View style={[styles.flexCenter]}>
                                <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_White, styles.marginVertical_15]}>
                                    {i18n.t('mon')}
                                </Text>
                                <CountDown
                                    until={60 * 1}
                                    size={15}
                                    onFinish={() => setFading(false)}
                                    digitStyle={[ styles.bg_trans, styles.Border, styles.border_White ]}
                                    digitTxtStyle={[ styles.text_White ]}
                                    timeLabelStyle={[ styles.text_red, styles.FairuzBold ]}
                                    separatorStyle={[ styles.text_White ]}
                                    timeToShow={['M', 'S']}
                                    timeLabels={{ m: null, s: null }}
                                    showSeparator={true}
                                    style={{}}
                                />
                                <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_White, styles.marginVertical_15]}>
                                    {i18n.t('mon2')}
                                </Text>
                            </View>
                            :
                            <View style={[styles.flexCenter, styles.Width_100]}>
                                <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_White, styles.marginVertical_15, styles.textCenter]}>
                                    {i18n.t('codeNew')}
                                </Text>
                                <TouchableOpacity
                                    style={[styles.marginVertical_20, styles.flexCenter, styles.Radius_10]}
                                    onPress={() => onResentCode()}
                                >
                                    <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_orange, styles.textDecoration]}>
                                        {i18n.t('codRe')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    }

                </View>
            </Content>

        </Container>
    );
}

export default ActiveAccount;
