import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions, Animated} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, CheckBox, Toast, Item, Input} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import { useSelector, useDispatch } from 'react-redux';
import { allCommission } from '../actions';
import * as Animatable from "react-native-animatable";
import HTML from "react-native-render-html";
import Modal from "react-native-modal";



function Commission({navigation}) {

    const lang                              = useSelector(state => state.lang.lang);
    const dataCommission                    = useSelector(state => state.commission.data ? state.commission.data : null);

    const [checked, setChecked]             = useState('');
    const [selectId, setSelectId]           = useState(null);
    const [bankImg, setBankImg]             = useState('');
    const [bankNumber, setBankNumber]       = useState('');
    const [bankName, setBankName]           = useState('');
    const [ibanNum, setIbanNum]             = useState('');
    const dispatch                          = useDispatch();

    const [showModalCommission, setShowModalCommission]                 = useState(true);
    const [textErr, setTextErr]                                         = useState('');
    const [priceNum, setPriceNum]                                       = useState(0);
    const [nameCommission, setNameCommission]                           = useState('');
    const [commissionStatus, setCommissionStatus]                       = useState(0);
    const [commissionValue]                                             = useState(new Animated.Value(0));

    function fetchData(){
        dispatch(allCommission(lang));
    }

    useEffect(() => {
        fetchData();
    }, []);

    function selectBankId(id,name,number,image,iban) {
        setChecked(id);
        setSelectId(id);
        setBankImg(image);
        setBankNumber(number);
        setBankName(name);
        setIbanNum(iban);
    }

    function moveBank() {
        if(selectId !== null) {
            const data = { selectId, bankImg, bankNumber, bankName, ibanNum };
            navigation.navigate('addTransfer',{ data });
        }else{
            Toast.show({
                text        : i18n.t('chooseBank'),
                type        : "danger",
                duration    : 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'FairuzBlack',
                    textAlign   	: 'center'
                }
            });
        }
    }

    function activeInput(type) {
        if (type === 'commission' || nameCommission !== ''){
            setCommissionStatus(1);
            const toValue = -25;
            Animated.spring(
                commissionValue,
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
        if (type === 'commission' && nameCommission === ''){
            setCommissionStatus(0);
            const toValue   = 0;
            Animated.spring(
                commissionValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }
    }

    function toggleModal (type) {

        if (type === 'commission'){
            setShowModalCommission(!showModalCommission);
        }

    }

    function clickVal() {
        if (priceNum != 0){
            toggleModal('commission');
        }else {
            setTextErr( i18n.t('enpobay') )
        }
    }

    function handleKeyUp(keyword) {
        const total = (keyword * 1 / 100);
        setTimeout(()=>{
            setPriceNum(total);
        },500);
    }

    return (
        <Container>

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
                        { i18n.t('commission') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R ]}>

                <View style={[ styles.Width_90, styles.paddingHorizontal_10, styles.marginVertical_10]}>
                    <HTML
                        html                  = {dataCommission ? dataCommission.commission : ''}
                        imagesMaxWidth        = {Dimensions.get('window').width}
                        baseFontStyle         = {{
                            fontSize            : 16,
                            fontFamily          : 'FairuzNormal',
                            color               : '#363636',
                            writingDirection    : I18nManager.isRTL ? 'rtl' : 'ltr'
                        }}
                    />
                </View>

                <View style={[ styles.marginVertical_10 ]}>
                    {
                        dataCommission ?
                            dataCommission.banks.map((bank) => {
                                    return (
                                        <TouchableOpacity
                                            onPress             = {() => selectBankId(bank.id,bank.name,bank.account_number,bank.icon, bank.iban)}
                                            style               = {[ styles.marginVertical_5, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.Width_100, styles.SelfCenter, styles.position_R]}>
                                            <TouchableOpacity
                                                style               = {[styles.position_A , { top : 10, right : 20 , zIndex : 999 }]}
                                                onPress             = {() => selectBankId(bank.id,bank.name,bank.account_number,bank.icon, bank.iban)}
                                            >
                                                <CheckBox
                                                    style               = {[styles.checkBox ,{ backgroundColor : COLORS.default, borderColor : COLORS.default, borderWidth : 1, }]}
                                                    color               = {styles.text_White}
                                                    selectedColor       = {styles.text_White}
                                                    checked             = {checked === bank.id}
                                                    onPress             = {() => selectBankId(bank.id,bank.name,bank.account_number,bank.icon, bank.iban)}
                                                />
                                            </TouchableOpacity>
                                            <View style={[ styles.Border, styles.border_light_gray, styles.bg_White, styles.paddingHorizontal_10, styles.paddingVertical_5 ,styles.rowGroup, styles.Width_100, styles.position_R, { zIndex : -1 } ]}>
                                                <View style={[ styles.height_80, styles.Radius_5, styles.flex_30, styles.Border, styles.border_light_gray ]}>
                                                    <Image style={[styles.Width_100, styles.height_full]} source={{ uri: bank.icon }} resizeMode={'contain'}/>
                                                </View>
                                                <View style={[ styles.overHidden, styles.paddingHorizontal_10, styles.flex_70 ]}>
                                                    <View style={[ styles.rowIng ]}>
                                                        <Text style={[styles.FairuzNormal, styles.textSize_14, styles.text_default]}>{ i18n.t('accountName')}</Text>
                                                        <Text style={[styles.FairuzNormal, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                                        <Text style={[styles.FairuzNormal, styles.textSize_12,]}>{ bank.name }</Text>
                                                    </View>
                                                    <View style={[ styles.rowIng ]}>
                                                        <Text style={[styles.FairuzNormal, styles.textSize_14,]}>{ i18n.t('account_number')}</Text>
                                                        <Text style={[styles.FairuzNormal, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                                        <Text style={[styles.FairuzNormal, styles.textSize_12]}>{ bank.account_number }</Text>
                                                    </View>
                                                    <View style={[ styles.rowIng ]}>
                                                        <Text style={[styles.FairuzNormal, styles.textSize_14,]}>{ i18n.t('iban_number')}</Text>
                                                        <Text style={[styles.FairuzNormal, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                                        <Text style={[styles.FairuzNormal, styles.textSize_12]}>{ bank.iban }</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            )
                            :
                            <View style={[ styles.Width_100, styles.height_300, styles.flexCenter ]}>
                                <Text style={[ styles.FairuzBold, styles.text_red, styles.textSize_18 ]}>
                                    {i18n.t('notcity')}
                                </Text>
                            </View>
                    }
                </View>

                <Modal avoidKeyboard={true} isVisible={showModalCommission} style={[ styles.bottomCenter, styles.Width_100 ]}>
                    <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                        <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                            <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>
                                {i18n.t('pobay')}
                            </Text>
                        </View>

                        <View style={[styles.paddingHorizontal_10, styles.paddingVertical_10, styles.bg_White]}>

                            <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, styles.text_default]}>
                                {i18n.translate('ifbay')}
                            </Text>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_5]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: commissionValue}]}, (commissionStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (commissionStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                        {i18n.translate('saleop')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.text_default ,styles.Border ,(commissionStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(keyword)=> handleKeyUp(keyword)}
                                        onBlur={() => unActiveInput('commission')}
                                        onFocus={() => activeInput('commission')}
                                        keyboardType={'number-pad'}
                                    />
                                </Item>
                            </View>

                            <Text style={[ styles.FairuzNormal, styles.textCenter, styles.textSize_14, styles.text_red ]}>
                                { textErr }
                            </Text>

                            <View style={[styles.Width_100, styles.marginVertical_5]}>
                                <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, styles.text_default]}>
                                    {i18n.t('serbay')}
                                </Text>
                                <View style={[styles.Width_100, styles.marginVertical_10]}>
                                    <View style={[ styles.Border, styles.border_light_gray, styles.height_50 , styles.paddingHorizontal_15, styles.SelfRight, styles.Width_100 ]} >
                                        <Text style={[ styles.FairuzNormal, styles.textSize_14, styles.text_default, styles.textDir ]}>
                                            { priceNum }
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{flexDirection :'row' , justifyContent :'space-between' , alignItems:'center'}}>
                                <TouchableOpacity
                                    style       = {[ styles.bg_default ,styles.marginVertical_10 , styles.width_150, styles.height_45 , styles.flexCenter, styles.Radius_5]}
                                    onPress     = { ()=> clickVal()}
                                >
                                    <Text style={[ styles.text_White, styles.FairuzBold, styles.textSize_15 ]}>
                                        {i18n.t('sent')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style       = {[ styles.bg_orange ,styles.marginVertical_10 , styles.width_150, styles.height_45 , styles.flexCenter, styles.Radius_5]}
                                    onPress     = { ()=> navigation.navigate('home') }
                                >
                                    <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                        { i18n.t('cans') }
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </Modal>

                <TouchableOpacity style={[ styles.bg_default, styles.flexCenter, styles.height_50, styles.Radius_5, styles.width_200, styles.marginVertical_10 ]} onPress={() => moveBank()}>
                    <Text style={[ styles.FairuzNormal, styles.text_White, styles.textSize_14 ]}> {i18n.t('sent')}</Text>
                </TouchableOpacity>

            </Content>
        </Container>
    );
}

export default Commission;
