import React, { useState , useEffect } from "react";
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
import {Body, Button, Container, Content, Form, Header, Icon, Input, Item, Left, Title, Toast,} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import {useSelector, useDispatch} from 'react-redux';
import {changeEmail, changePhone} from '../actions';
import Loading from "../components/Loading";

function updateSetUser({navigation, route}) {

    const lang                          = useSelector(state => state.lang.lang);
    const [loader, setLoader]           = useState(false);
    const token                         = useSelector(state => state.auth.user ? state.auth.user.token : null);
    const dispatch                      = useDispatch();
    const [coding]                      = useState(route.params.code);
    const [type]                        = useState(route.params.type);
    const [code, setCode]               = useState('');
    const [codeStatus, setCodeStatus]   = useState(0);
    const [codeValue]                   = useState(new Animated.Value(0));

    useEffect(() => {
        alert('activation code : ' + coding);
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
    }

    const validate = () => {

        let isError         = false;
        let msg             = '';

        if (code.length <= 0) {
            isError     = true;
            msg         = i18n.t('codeN');
        }
        else if (code != coding){
            isError     = true;
            msg         = i18n.t('codeNotCorrect');
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
            if (type === 'phone'){
                console.log('type phone', type)
                setLoader(true);
                dispatch(changePhone(token, lang , navigation)).then(()=> setLoader(false).catch(()=> setLoader(false)));
            } else if (type === 'email'){
                console.log('type email', type)
                setLoader(true);
                dispatch(changeEmail(token, lang , navigation)).then(()=> setLoader(false).catch(()=> setLoader(false)));
            }
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
                        { i18n.t('actcode') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.flexCenter ]}>

                <View style={[ styles.overHidden, styles.paddingHorizontal_30, styles.marginTop_30, ]}>
                    <Text style={[ styles.FairuzBold, styles.textSize_18, styles.text_default, styles.textDir, ]}>
                        {
                            type === 'email' ?
                                i18n.translate('codEM')
                                :
                                i18n.translate('conPH')
                        }
                    </Text>
                </View>

                <View style={[styles.position_R,styles.flexCenter, styles.Width_100]}>

                    <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_90 , styles.paddingHorizontal_10]}>
                        <Form style={[styles.flexCenter, styles.Width_100, styles.marginVertical_20]}>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_10]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: codeValue}]}, (codeStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzBlack, styles.textSize_14, (codeStatus === 1 ? styles.text_orange : styles.text_bold_gray)]}>
                                        {i18n.translate('code')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.text_default, styles.Border ,(codeStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(code) => setCode(code)}
                                        onBlur={() => unActiveInput('code')}
                                        onFocus={() => activeInput('code')}
                                        keyboardType={'number-pad'}
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity
                                style       = {[ styles.bg_orange ,styles.marginVertical_30 , styles.width_200, styles.height_55 , styles.flexCenter, styles.Radius_10]}
                                onPress     = {() => onSubmit()}
                            >
                                <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_White]}>
                                    { i18n.t('sent') }
                                </Text>
                            </TouchableOpacity>

                        </Form>
                    </KeyboardAvoidingView>

                </View>
            </Content>

        </Container>
    );
}

export default updateSetUser;
