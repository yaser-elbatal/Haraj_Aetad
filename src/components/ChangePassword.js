import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, Animated, KeyboardAvoidingView, ActivityIndicator} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Toast, Form, Item, Input,} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";

import { useSelector, useDispatch } from 'react-redux';
import {changePassword} from '../actions';
import Loading from "../components/Loading";

function ChangePassword({navigation}) {

    const lang                                  = useSelector(state => state.lang.lang);
    const [loader, setLoader]                   = useState(false);
    const [oldPass, setOldPass]                 = useState('');
    const [oldPassStatus, setOldPassStatus]     = useState(0);
    const [oldPassValue]                        = useState(new Animated.Value(0));
    const [newPass, setNewPass]                 = useState('');
    const [newPassStatus, setNewPassStatus]     = useState(0);
    const [newPassValue]                        = useState(new Animated.Value(0));
    const [conPass, setConPass]                 = useState('');
    const [conPassStatus, setConPassStatus]     = useState(0);
    const [conPassValue]                        = useState(new Animated.Value(0));
    const token                                 = useSelector(state => state.auth.user ? state.auth.user.token : null);

    const dispatch                              = useDispatch();

    function activeInput(type) {

        if (type === 'oldPass' || oldPass !== ''){
            setOldPassStatus(1);
            const toValue = -25;
            Animated.spring(
                oldPassValue,
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

        if (type === 'oldPass' && oldPass === ''){
            setOldPassStatus(0);
            const toValue   = -3;
            Animated.spring(
                oldPassValue,
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

        if (oldPass.length <= 0){
            isError     = true;
            msg         = i18n.translate('curtpass');
        } else if (newPass.length <= 0){
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
            dispatch(changePassword(token, oldPass, newPass, lang, navigation)).then(()=> setLoader(false).catch(()=> setLoader(false)));
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
                        { i18n.t('changepass') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.flexCenter, styles.Width_100 ]}>

                <View style={[styles.position_R, styles.flexCenter, styles.Width_90, styles.zIndex]}>

                    <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_100 , styles.paddingHorizontal_10]}>
                        <Form style={[styles.flexCenter, styles.Width_100, styles.marginVertical_20]}>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: oldPassValue}]}, (oldPassStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (oldPassStatus === 1 ? styles.text_orange : styles.text_bold_gray)]}>
                                        {i18n.translate('currentpass')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.Radius_5, styles.text_default ,(oldPassStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(oldPass) => setOldPass(oldPass)}
                                        onBlur={() => unActiveInput('oldPass')}
                                        onFocus={() => activeInput('oldPass')}
                                        secureTextEntry
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: newPassValue}]}, (newPassStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (newPassStatus === 1 ? styles.text_orange : styles.text_bold_gray)]}>
                                        {i18n.translate('newpass')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.Radius_5, styles.text_default ,(newPassStatus === 1 ?  styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(newPass) => setNewPass(newPass)}
                                        onBlur={() => unActiveInput('newPass')}
                                        onFocus={() => activeInput('newPass')}
                                        secureTextEntry
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: conPassValue}]}, (conPassStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (conPassStatus === 1 ? styles.text_orange : styles.text_bold_gray)]}>
                                        {i18n.translate('confirmpass')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.Radius_5, styles.text_default ,(conPassStatus === 1 ?  styles.border_orange : styles.border_light_gray)]}
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
                                <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_White]}>
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

export default ChangePassword;
