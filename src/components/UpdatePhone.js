import React, { useState , useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
} from "react-native";
import {
    Container,
    Content,
    Header,
    Left,
    Body,
    Title,
    CheckBox,
    Item,
    Input,
    Icon, Toast
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import { useSelector, useDispatch } from 'react-redux';
import {allCountries, updateSetPhone} from '../actions';
import Modal from "react-native-modal";
import Loading from "../components/Loading";

function UpdatePhone({navigation}) {

    const lang                                  = useSelector(state => state.lang.lang);
    const [loader, setLoader]                   = useState(false);
    const userDate                              = useSelector(state => state.auth.user ? state.auth.user : null);
    const codeCountry                           = useSelector(state => state.countries.countries);
    const token                                 = useSelector(state => state.auth.user ? state.auth.user.token : null);
    const [phone, setPhone]                     = useState(userDate.phone);
    const [phoneStatus, setPhoneStatus]         = useState(1);
    const [phoneValue]                          = useState(new Animated.Value(-25));
    const dispatch                              = useDispatch();

    const [showModalPhone, setShowModalPhone]   = useState(false);

    const [showModalCode, setShowModalCode]     = useState(false);
    const [code, setCode]                       = useState(userDate.key);
    const [codeId, setCodeId]                   = useState(userDate.country_id);

    function fetchData(){
        dispatch(allCountries(lang));
    }

    useEffect(() => {
        fetchData();
    }, []);

    function toggleModal (type) {

        if (type === 'phone'){
            setShowModalPhone(!showModalPhone);
        }

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
            const toValue   = -3;
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

        let isError     = false;
        let msg         = '';

        if (phone.length <= 0){
            isError     = true;
            msg         = i18n.t('namereq');
        }else if (phone.length < 10){
            isError     = true;
            msg         = i18n.t('aggnumber');
        } else if (phone === userDate.phone){
            isError     = true;
            msg         = i18n.t('phoneIN');
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
            dispatch(updateSetPhone(token, phone, code, lang, navigation)).then(()=> setLoader(false).catch(()=> setLoader(false)));
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
                        { i18n.t('changephon') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={styles.bgFullWidth}>

                <View style={[ styles.marginVertical_10 ]}>


                    <View style={[styles.paddingHorizontal_10, styles.paddingVertical_20 , styles.Width_100]}>

                        <View style={[styles.marginVertical_20, styles.Width_100]}>
                            <Text style={[ styles.text_default, styles.textCenter, styles.textSize_14, styles.FairuzBold ]}>
                                { i18n.t('conPH') }
                            </Text>
                        </View>

                        <View style={[styles.overHidden, styles.rowGroup, styles.Width_100]}>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_5, styles.flex_70]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: phoneValue}]}, (phoneStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (phoneStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                        {i18n.translate('phone')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.text_default, styles.Border ,(phoneStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(phone) => setPhone(phone)}
                                        onBlur={() => unActiveInput('phone')}
                                        onFocus={() => activeInput('phone')}
                                        keyboardType={'number-pad'}
                                        value={ phone }
                                    />
                                </Item>
                            </View>

                            <View style={[styles.overHidden, styles.rowGroup, styles.flex_30]}>
                                <TouchableOpacity onPress={() => toggleModal('code')} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_10 , styles.flexCenter, styles.Border , styles.border_White, styles.Width_100, (codeId !== null) ? styles.border_orange : styles.border_light_gray ,{ flexDirection : 'row',justifyContent: "space-between" }]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform12, (codeId !== null) ? styles.text_orange : styles.text_default]}>
                                        { code }
                                    </Text>
                                    <Icon style={[styles.textPlatform12, (codeId !== null) ? styles.text_orange : styles.text_default]} type="AntDesign" name='down' />
                                </TouchableOpacity>
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

                </View>

            </Content>
        </Container>
    );
}

export default UpdatePhone;
