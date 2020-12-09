import React, { useState , useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Right,
    Body,
    Title,
    CheckBox,
    Form,
    Item,
    Input,
    Icon, Toast, Textarea
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import { useSelector, useDispatch } from 'react-redux';
import {updateSetEmail} from '../actions';
import Loading from "../components/Loading";

function UpdatePhone({navigation}) {

    const lang                                  = useSelector(state => state.lang.lang);
    const [loader, setLoader]                   = useState(false);
    const userDate                              = useSelector(state => state.auth.user ? state.auth.user : null);
    const token                                 = useSelector(state => state.auth.user ? state.auth.user.token : null);
    const [email, setEmail]                     = useState(userDate.email);
    const [emailStatus, setEmailStatus]         = useState(1);
    const [emailValue]                          = useState(new Animated.Value(-25));
    const dispatch                              = useDispatch();

    function activeInput(type) {

        if (type === 'email' || email !== ''){
            setEmailStatus(1);
            const toValue = -25;
            Animated.spring(
                emailValue,
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

        if (type === 'email' && email === ''){
            setEmailStatus(0);
            const toValue   = -3;
            Animated.spring(
                EmailValue,
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

        if (email.length <= 0){
            isError     = true;
            msg         = i18n.t('enemail');
        }else if (email.indexOf("@") === -1 || email.indexOf(".") === -1){
            isError     = true;
            msg         = i18n.t('entermail');
        }else if (email === userDate.email){
            isError     = true;
            msg         = i18n.t('emailIN');
        }

        if (msg !== '') {
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'FairuzBlack',
                    textAlign   	: 'center'
                }
            });
        }

        return isError;

    };

    function onSubmit(){
        const err = validate();

        if (!err){
            setLoader(true);
            dispatch(updateSetEmail(token, email, lang, navigation)).then(()=> setLoader(false).catch(()=> setLoader(false)));
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
                        { i18n.t('chnemail') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={styles.bgFullWidth}>

                <View style={[ styles.marginVertical_10 ]}>


                    <View style={[styles.paddingHorizontal_10, styles.paddingVertical_20 , styles.Width_100]}>

                        <View style={[styles.marginVertical_20, styles.Width_100]}>
                            <Text style={[ styles.text_default, styles.textCenter, styles.textSize_14, styles.FairuzBold ]}>
                                { i18n.t('maaD') }
                            </Text>
                        </View>

                        <View style={[styles.overHidden, styles.rowGroup, styles.Width_100]}>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_5, styles.flex_100]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: emailValue}]}, (emailStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (emailStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                        {i18n.translate('email')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.text_default, styles.Border ,(emailStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(email) => setEmail(email)}
                                        onBlur={() => unActiveInput('email')}
                                        onFocus={() => activeInput('email')}
                                        value={ email }
                                    />
                                </Item>
                            </View>

                        </View>

                        <TouchableOpacity
                            style       = {[ styles.bg_orange ,styles.marginVertical_10 , styles.width_150, styles.height_45 , styles.flexCenter]}
                            onPress     = {() => onSubmit()}
                        >
                            <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                { i18n.t('confirm') }
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default UpdatePhone;
