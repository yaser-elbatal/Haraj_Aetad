import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, Animated, KeyboardAvoidingView, ActivityIndicator} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Toast, Form, Item, Input,} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import {newPassword} from '../actions';
import Loading from "../components/Loading";
import * as Animatable from "react-native-animatable";

function NewPassword({navigation, route}) {

    const lang                                  = useSelector(state => state.lang.lang);
    const [loader, setLoader]                   = useState(false);
    // const { coding, token } = route.params;
    const [token]                               = useState(route.params.token);
    const [coding, setCoding]                   = useState(route.params.code);
    const [code, setCode]                       = useState('');
    const [codeStatus, setCodeStatus]           = useState(0);
    const [codeValue]                           = useState(new Animated.Value(0));
    const [newPass, setNewPass]                 = useState('');
    const [newPassStatus, setNewPassStatus]     = useState(0);
    const [newPassValue]                        = useState(new Animated.Value(0));
    const [conPass, setConPass]                 = useState('');
    const [conPassStatus, setConPassStatus]     = useState(0);
    const [conPassValue]                        = useState(new Animated.Value(0));
    const dispatch                              = useDispatch();

    useEffect(() => {
        alert(i18n.translate('code') + ':' + coding);
    }, []);

    function activeInput(type) {
        if (type === 'code' || code !== ''){
            setCodeStatus(1);
            const toValue = -25;
            Animated.spring(
                codeValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'newPass' || newPass !== ''){
            setNewPassStatus(1);
            const toValue = -25;
            Animated.spring(
                newPassValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'conPass' || conPass !== ''){
            setConPassStatus(1);
            const toValue = -25;
            Animated.spring(
                conPassValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

    }

    function unActiveInput(type) {
        if (type === 'code' && code === ''){
            setCodeStatus(0);
            const toValue   = -3;
            Animated.spring(
                codeValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'newPass' && newPass === ''){
            setNewPassStatus(0);
            const toValue   = -3;
            Animated.spring(
                newPassValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'conPass' && conPass === ''){
            setConPassStatus(0);
            const toValue   = -3;
            Animated.spring(
                conPassValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }
    }

    const validate = () => {

        let isError     = false;
        let msg         = '';

        if (code.length <= 0) {
            isError     = true;
            msg         = i18n.t('codeN');
        }
        else if (code != coding){
            isError     = true;
            msg         = i18n.t('codeNotCorrect');
        }
        else if (newPass.length <= 0){
            isError     = true;
            msg         = i18n.translate('newmpass');
        } else if (newPass.length < 6){
            isError     = true;
            msg         = i18n.translate('passreq');
        } else if (newPass !== conPass){
            isError     = true;
            msg         = i18n.translate('notmatch');
        }
        if (msg !== '') {
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle       : {
                    color       : "white",
                    fontFamily  : 'FairuzBlack',
                    textAlign   : 'center',
                }
            });
        }
        return isError;


    };

    function onSubmit(){
        const err = validate();
        if (!err){
            setLoader(true);
            dispatch(newPassword(token , newPass, lang, navigation)).then(()=> setLoader(false).catch(()=> setLoader(false)));
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
        <Container style={[ styles.bg_default ]}>

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
                        {/*{ i18n.t('newpass') }*/}
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth ]}>

                <View style={[ styles.overHidden, styles.flexCenter ]}>
                    <View style={[ styles.overHidden ]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100]}>
                            <Image
                                style={[styles.width_170, styles.height_170]}
                                source={require('../../assets/image/LogoHarag.png')}
                                resizeMode='contain'
                            />
                        </Animatable.View>
                    </View>

                    <View style={[ styles.paddingHorizontal_10, styles.flexCenter, styles.marginVertical_15, styles.border_orange, { borderLeftWidth : 2 } ]}>
                        <Text style={[styles.FairuzNormal, styles.textSize_16, styles.text_White ]}>
                            {i18n.translate('newpass')}
                        </Text>
                    </View>

                </View>

                {/*<View style={[ styles.overHidden, styles.paddingHorizontal_30, styles.marginTop_30, ]}>*/}
                {/*    <Text style={[ styles.FairuzBold, styles.textSize_18, styles.text_White, styles.textDir, ]}>*/}
                {/*        {i18n.translate('codeSee')}*/}
                {/*    </Text>*/}
                {/*</View>*/}

                <View style={[styles.position_R,styles.flexCenter, styles.Width_100, styles.zIndex]}>

                    <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_90 , styles.paddingHorizontal_10]}>
                        <Form style={[styles.flexCenter, styles.Width_100, styles.marginVertical_20]}>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: codeValue}]}, (codeStatus === 1 ? styles.inAct : styles.unAct) ]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (codeStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                        {i18n.translate('code')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.Radius_5 ,(codeStatus === 1 ? styles.Active : styles.noActive)]}
                                        onChangeText={(code) => setCode(code)}
                                        onBlur={() => unActiveInput('code')}
                                        onFocus={() => activeInput('code')}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: newPassValue}]}, (newPassStatus === 1 ? styles.inAct : styles.unAct) ]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (newPassStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                        {i18n.translate('newpass')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.Radius_5 ,(newPassStatus === 1 ? styles.Active : styles.noActive)]}
                                        onChangeText={(newPass) => setNewPass(newPass)}
                                        onBlur={() => unActiveInput('newPass')}
                                        onFocus={() => activeInput('newPass')}
                                        secureTextEntry
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: conPassValue}]}, (conPassStatus === 1 ? styles.inAct : styles.unAct) ]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (conPassStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                        {i18n.translate('confirmpass')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.Radius_5 ,(conPassStatus === 1 ? styles.Active : styles.noActive)]}
                                        onChangeText={(conPass) => setConPass(conPass)}
                                        onBlur={() => unActiveInput('conPass')}
                                        onFocus={() => activeInput('conPass')}
                                        secureTextEntry
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity
                                style       = {[ styles.bg_orange ,styles.marginVertical_30 , styles.width_200, styles.height_55 , styles.flexCenter, styles.Radius_10]}
                                onPress     = {() => onSubmit()}
                            >
                                <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_default]}>
                                    { i18n.t('confirm') }
                                </Text>
                            </TouchableOpacity>

                        </Form>
                    </KeyboardAvoidingView>
                </View>

            </Content>

        </Container>
    );
}

export default NewPassword;
