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
import {
    Body,
    Button,
    CheckBox,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Left,
    Title,
    Toast,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import {useSelector, useDispatch} from 'react-redux';
import {allCountries, forgetPass} from '../actions';
import Modal from "react-native-modal";
import Loading from "../components/Loading";

function ForgetPassword({navigation}) {

    const lang                              = useSelector(state => state.lang.lang);
    const auth                              = useSelector(state => state.auth.user ? state.auth.user : null);
    const codeCountry                       = useSelector(state => state.countries.countries);
    const dispatch                          = useDispatch();
    const [loader, setLoader]               = useState(false);
    const [phone, setPhone]                 = useState('');
    const [phoneStatus, setPhoneStatus]     = useState(0);
    const [phoneValue]                      = useState(new Animated.Value(0));
    const [showModalCode, setShowModalCode] = useState(false);
    const [code, setCode]                   = useState(i18n.t('codeCon'));
    const [codeId, setCodeId]               = useState(null);

    function fetchData(){
        dispatch(allCountries(lang));
    }

    useEffect(() => {
        fetchData();
    }, []);

    function activeInput(type) {
        if (type === 'phone' || phone !== ''){
            setPhoneStatus(1);
            const toValue = -25;
            Animated.spring(
                phoneValue,
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
        if (type === 'phone' && phone === ''){
            setPhoneStatus(0);
            const toValue   = 0;
            Animated.spring(
                phoneValue,
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

        if (phone.length <= 0) {
            isError     = true;
            msg         = i18n.t('namereq');
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

    function toggleModal (type) {

        if (type === 'code'){
            setShowModalCode(!showModalCode);
        }

    }

    function selectId(type, id, key) {

        if (type === 'code'){
            setCodeId(key);
            setCode(key);
            setShowModalCode(!setShowModalCode);
        }

    }

    function onSubmit(){
        const err = validate();

        if (!err){
            setLoader(true);
            dispatch(forgetPass(phone, codeId, lang, navigation)).then(()=> setLoader(false).catch(()=> setLoader(false)));
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
                        {/*{ i18n.t('PassReco') }*/}
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
                            {i18n.translate('PassReco')}
                        </Text>
                    </View>

                </View>

                {/*<View style={[ styles.overHidden, styles.paddingHorizontal_30, styles.marginTop_30, ]}>*/}
                {/*    <Text style={[ styles.FairuzBold, styles.textSize_18, styles.text_White, styles.textDir, ]}>*/}
                {/*        {i18n.translate('forpassSee')}*/}
                {/*    </Text>*/}
                {/*</View>*/}

                <View style={[styles.position_R,styles.flexCenter, styles.Width_100]}>

                    <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_90 , styles.paddingHorizontal_10]}>
                        <Form style={[styles.flexCenter, styles.Width_100, styles.marginVertical_20]}>

                            <View style={[styles.overHidden, styles.rowGroup, styles.Width_100]}>

                                <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_5, styles.flex_70]}>
                                    <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: phoneValue}]}, (phoneStatus === 1 ? styles.inAct : styles.unAct) ]}>
                                        <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (phoneStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                            {i18n.translate('phone')}
                                        </Text>
                                    </Animated.View>
                                    <Item style={[styles.item, styles.position_R]}>
                                        <Input
                                            style={[styles.input, styles.height_50 ,(phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(phone) => setPhone(phone)}
                                            onBlur={() => unActiveInput('phone')}
                                            onFocus={() => activeInput('phone')}
                                            keyboardType={'number-pad'}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.overHidden, styles.rowGroup, styles.flex_30]}>
                                    <TouchableOpacity onPress={() => toggleModal('code')} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_10 , styles.flexCenter, styles.Border , styles.border_White, styles.Width_100, (codeId !== null) ? styles.border_orange : styles.border_White ,{ flexDirection : 'row',justifyContent: "space-between" }]}>
                                        <Text style={[styles.FairuzNormal, styles.textPlatform12, (codeId !== null) ? styles.text_orange : styles.text_White]}>
                                            { code }
                                        </Text>
                                        <Icon style={[styles.textPlatform12, (codeId !== null) ? styles.text_orange : styles.text_White]} type="AntDesign" name='down' />
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <Modal isVisible={showModalCode} onBackdropPress={() => toggleModal('code')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                    <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                        <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>
                                            {i18n.t('codeCon')}
                                        </Text>
                                    </View>

                                    <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                        {
                                            codeCountry.map((code) => {
                                                    return (
                                                        <TouchableOpacity
                                                            style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                            onPress             = {() => selectId('code', code.id, code.key)}
                                                        >
                                                            <View style={[styles.overHidden, styles.rowRight]}>
                                                                <CheckBox
                                                                    style               = {[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                    color               = {styles.text_White}
                                                                    selectedColor       = {styles.text_White}
                                                                    checked             = {codeId === code.key}
                                                                />
                                                                <Text style={[styles.FairuzBlack , styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                    {code.key}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            )
                                        }
                                    </View>

                                </View>
                            </Modal>

                            <TouchableOpacity
                                style       = {[ styles.bg_orange ,styles.marginVertical_30 , styles.width_200, styles.height_55 , styles.flexCenter, styles.Radius_10]}
                                onPress     = {() => onSubmit()}
                            >
                                <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_default]}>
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

export default ForgetPassword;
