import React, { useState , useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import {
    Container,
    Content,
    Header,
    Left,
    Body,
    Title,
    CheckBox,
    Toast,
    Form,
    Item,
    Input,
    Icon,
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import Modal from "react-native-modal";
import  * as Permissions from 'expo-permissions'
import  * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import {addTransfer, transferAdv} from "../actions";
import COLORS from "../consts/colors";
import Loading from "../components/Loading";

function AddTransfer({navigation, route}) {

    const lang                                      = useSelector(state => state.lang.lang);
    const auth                                      = useSelector(state => state.auth);
    const advArray                                  = useSelector(state => state.transferAdv.data ? state.transferAdv.data : []);
    const [data]                                    = useState(route.params.data);
    const [bankId, setBankId]                       = useState('');
    const [userName, setUserName]                   = useState('');
    const [userNameStatus, setUserNameStatus]       = useState(0);
    const [userNameValue]                           = useState(new Animated.Value(0));
    const [bankName, setBankName]                   = useState('');
    const [bankNameStatus, setBankNameStatus]       = useState(0);
    const [bankNameValue]                           = useState(new Animated.Value(0));
    const [numAcc, setNumAcc]                       = useState('');
    const [numAccStatus, setNumAccStatus]           = useState(0);
    const [numAccValue]                             = useState(new Animated.Value(0));
    const [countNum, setCountNum]                   = useState('');
    const [countNumStatus, setCountNumStatus]       = useState(0);
    const [countNumValue]                           = useState(new Animated.Value(0));
    const [loader, setLoader]                       = useState(false);
    const [userImage, setUserImage]                 = useState('');
    const [base64, setBase64]                       = useState('');
    const [numAdv, setNumAdv]                       = useState(i18n.t('numord'));
    const [advId, setAdvId]                         = useState(null);
    const [showModalAdv, setShowModalAdv]           = useState(false);
    const dispatch                                  = useDispatch();

    function fetchData(){
        setBankId(data.selectId);
        dispatch(transferAdv(lang));
    }

    useEffect(() => {
        fetchData();
    }, []);

    function toggleModal (type) {
        if (type === 'numAdv'){
            setShowModalAdv(!showModalAdv);
        }
    }

    function selectId(type, id, name) {
        if (type === 'numAdv'){
            setAdvId(id);
            setNumAdv(name);
            setShowModalAdv(!showModalAdv);
        }

    }

    function activeInput(type) {

        if (type === 'name' || userName !== ''){
            setUserNameStatus(1);
            const toValue = -25;
            Animated.spring(
                userNameValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'bank' || bankName !== ''){
            setBankNameStatus(1);
            const toValue = -25;
            Animated.spring(
                bankNameValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'num' || numAcc !== ''){
            setNumAccStatus(1);
            const toValue = -25;
            Animated.spring(
                numAccValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'count' || countNum !== ''){
            setCountNumStatus(1);
            const toValue = -25;
            Animated.spring(
                countNumValue,
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

        if (type === 'name' && userName === ''){
            setUserNameStatus(0);
            const toValue   = 0;
            Animated.spring(
                userNameValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'bank' && bankName === ''){
            setBankNameStatus(0);
            const toValue   = 0;
            Animated.spring(
                bankNameValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'num' && numAcc === ''){
            setNumAccStatus(0);
            const toValue   = 0;
            Animated.spring(
                numAccValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'count' && countNum === ''){
            setCountNumStatus(0);
            const toValue   = 0;
            Animated.spring(
                countNumValue,
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

        if (base64 === '') {
            isError     = true;
            msg         = i18n.t('hawala');
        } else if (bankName.length <= 0) {
            isError     = true;
            msg         = i18n.t('namean');
        } else if (advId === null) {
            isError     = true;
            msg         = i18n.t('numord');
        } else if (userName.length <= 0){
            isError     = true;
            msg         = i18n.t('accountName');
        } else if (numAcc.length <= 0){
            isError     = true;
            msg         = i18n.t('numtran');
        } else if (countNum.length <= 0){
            isError     = true;
            msg         = i18n.t('montran');
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

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    const _pickImage = async (type) => {

        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        if (!result.cancelled) {
            if (type === 'userImg'){
                setUserImage(result.uri);
                setBase64(result.base64);
            }
        }
    };

    function onSubmit(){
        const err = validate();
        if (!err){
            setLoader(true);
            const dataFun = { bankId, bankName, advId, userName, numAcc, countNum, base64, lang };
            dispatch(addTransfer(dataFun, navigation)).then(()=> setLoader(false).catch(()=> setLoader(false)));
        }

    }

    function renderLoader(){
        if (loader){
            return(
                <Loading/>
            );
        }
    }

    let image   = userImage;

    return (
        <Container style={[ styles.bg_White ]}>

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
                        { i18n.t('hasBa') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={styles.bgFullWidth}>

                <View style={[styles.position_R, styles.flexCenter, styles.Width_100, styles.zIndex]}>

                    <View style = {[ styles.marginVertical_5, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.Width_100, styles.SelfCenter, styles.position_R]}>
                        <View style = {[styles.position_A , { top : 10, right : 20 , zIndex : 999 }]}>
                            <CheckBox
                                style               = {[styles.checkBox ,{ backgroundColor : COLORS.orange, borderColor : COLORS.orange, borderWidth : 1, }]}
                                color               = {styles.text_default}
                                selectedColor       = {styles.text_default}
                                checked             = {true}
                            />
                        </View>
                        <View style={[ styles.Border, styles.border_light_gray, styles.bg_White, styles.paddingHorizontal_10, styles.paddingVertical_5 ,styles.rowGroup, styles.Width_100, styles.position_R, { zIndex : -1 } ]}>
                            <View style={[ styles.height_80, styles.Radius_5, styles.flex_30, styles.Border, styles.border_light_gray ]}>
                                <Image style={[styles.Width_100, styles.height_full]} source={{ uri: data.bankImg }} resizeMode={'contain'}/>
                            </View>
                            <View style={[ styles.overHidden, styles.paddingHorizontal_10, styles.flex_70 ]}>
                                <View style={[ styles.rowIng ]}>
                                    <Text style={[styles.FairuzNormal, styles.textSize_14, styles.text_default]}>{ i18n.t('accountName')}</Text>
                                    <Text style={[styles.FairuzNormal, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                    <Text style={[styles.FairuzNormal, styles.textSize_12,]}>{ data.bankName }</Text>
                                </View>
                                <View style={[ styles.rowIng ]}>
                                    <Text style={[styles.FairuzNormal, styles.textSize_14,]}>{ i18n.t('account_number')}</Text>
                                    <Text style={[styles.FairuzNormal, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                    <Text style={[styles.FairuzNormal, styles.textSize_12]}>{ data.bankNumber }</Text>
                                </View>
                                <View style={[ styles.rowIng ]}>
                                    <Text style={[styles.FairuzNormal, styles.textSize_14,]}>{ i18n.t('iban_number')}</Text>
                                    <Text style={[styles.FairuzNormal, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                    <Text style={[styles.FairuzNormal, styles.textSize_12]}>{ data.ibanNum }</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/*<KeyboardAvoidingView behavior={'padding'} style={[styles.Width_90 , styles.paddingHorizontal_10]}>*/}
                        <View style={[styles.flexCenter, styles.Width_90, styles.marginVertical_20]}>

                            <View style={[ styles.marginVertical_30, styles.position_R ]}>
                                <TouchableOpacity onPress={() => _pickImage('userImg')} style={[ styles.overHidden, styles.flexCenter,styles.position_R ]}>
                                    {
                                        image !== '' ?
                                            <Image source={{ uri: image }} style={[ styles.width_80, styles.height_80, styles.Radius_10 ]} />
                                            :
                                            <Image resizeMode={'contain'} source={require('../../assets/image/picture.png')} style={[ styles.width_70, styles.height_70, ]} />
                                    }
                                </TouchableOpacity>
                                <Text style={[ styles.FairuzBold, styles.textSize_14, styles.text_bold_gray, styles.textCenter, styles.marginTop_20 ]}>
                                    {i18n.translate('hawala')}
                                </Text>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: bankNameValue}]}, (bankNameStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (bankNameStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                        {i18n.translate('namean')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.text_default, styles.Radius_5, styles.Border ,(bankNameStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(bank) => setBankName(bank)}
                                        onBlur={() => unActiveInput('bank')}
                                        onFocus={() => activeInput('bank')}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.overHidden, styles.Width_100]}>
                                <TouchableOpacity onPress={() => toggleModal('numAdv')} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.flexCenter, styles.Border, styles.Radius_5, (advId ? styles.border_orange : styles.border_light_gray), { flexDirection : 'row',justifyContent: "space-between" }]}>
                                    <Text style={[styles.FairuzNormal, styles.textSize_15, (advId ? styles.text_orange : styles.text_black)]}>
                                        { numAdv }
                                    </Text>
                                    <Icon style={[styles.textSize_13, (advId ? styles.text_orange : styles.text_black)]} type="AntDesign" name='down' />
                                </TouchableOpacity>
                            </View>

                            <Modal isVisible={showModalAdv} onBackdropPress={() => toggleModal('numAdv')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                    <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                        <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>
                                            {i18n.t('numord')}
                                        </Text>
                                    </View>

                                    <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                        <ScrollView style={{ height : 300, width : '100%' }}>
                                            {
                                                advArray.map((adv) => {
                                                        return (
                                                            <TouchableOpacity
                                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                                onPress             = {() => selectId('numAdv', adv.id, adv.title)}
                                                            >
                                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                                    <CheckBox
                                                                        style               = {[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                        color               = {styles.text_White}
                                                                        selectedColor       = {styles.text_White}
                                                                        checked             = {advId === adv.id}
                                                                    />
                                                                    <Text style={[styles.FairuzBlack , styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                        {adv.title}
                                                                    </Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                )
                                            }
                                        </ScrollView>
                                    </View>

                                </View>
                            </Modal>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: userNameValue}]}, (userNameStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (userNameStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                        {i18n.translate('accountName')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.text_default, styles.Radius_5, styles.Border ,(userNameStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(name) => setUserName(name)}
                                        onBlur={() => unActiveInput('name')}
                                        onFocus={() => activeInput('name')}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: numAccValue}]}, (numAccStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (numAccStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                        {i18n.translate('numtran')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.text_default ,styles.Radius_5, styles.Border ,(numAccStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(num) => setNumAcc(num)}
                                        onBlur={() => unActiveInput('num')}
                                        onFocus={() => activeInput('num')}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: countNumValue}]}, (countNumStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (countNumStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                        {i18n.translate('montran')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.text_default, styles.Radius_5, styles.Border ,(countNumStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(count) => setCountNum(count)}
                                        onBlur={() => unActiveInput('count')}
                                        onFocus={() => activeInput('count')}
                                        keyboardType={'number-pad'}
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity
                                style       = {[ styles.bg_orange ,styles.marginVertical_30 , styles.width_200, styles.height_50 , styles.flexCenter, styles.Radius_10]}
                                onPress     = {() => onSubmit()}
                            >
                                <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_default]}>
                                    { i18n.t('confirm') }
                                </Text>
                            </TouchableOpacity>

                        </View>
                    {/*</KeyboardAvoidingView>*/}
                </View>

            </Content>

        </Container>
    );
}

export default AddTransfer;
