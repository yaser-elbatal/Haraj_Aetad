import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView,
    Animated,
    ActivityIndicator,
    Keyboard
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
import { useSelector, useDispatch } from 'react-redux';
import { allCountries, userLogin } from '../actions';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import Modal from "react-native-modal";
import Loading from "../components/Loading";
import colors from "../consts/colors";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

function Login({ navigation }) {

    const lang = useSelector(state => state.lang.lang);
    const codeCountry = useSelector(state => state.countries.countries);
    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const [phone, setPhone] = useState('');
    const [phoneStatus, setPhoneStatus] = useState(0);
    const [phoneValue] = useState(new Animated.Value(0));
    const [pass, setPass] = useState('');
    const [passStatus, setPassStatus] = useState(0);
    const [passValue] = useState(new Animated.Value(0));

    const [showModalCode, setShowModalCode] = useState(false);
    const [code, setCode] = useState(i18n.t('codeCon'));
    const [codeId, setCodeId] = useState(null);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    function fetchData() {
        dispatch(allCountries(lang));
    }

    useEffect(() => {
        fetchData();

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('response ?????', response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };

    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        // لان الاشعارات مش بتشتغل ع السيميولاتور
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    function toggleModal(type) {

        if (type === 'code') {
            setShowModalCode(!showModalCode);
        }

    }

    function selectId(type, id, key) {

        if (type === 'code') {
            setCodeId(key);
            setCode(key);
            setShowModalCode(!setShowModalCode);
        }

    }

    function activeInput(type) {
        if (type === 'phone' || phone !== '') {
            setPhoneStatus(1);
            const toValue = -25;
            Animated.spring(
                phoneValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }

        if (type === 'pass' || pass !== '') {
            setPassStatus(1);
            const toValue = -25;
            Animated.spring(
                passValue,
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
        if (type === 'phone' && phone === '') {
            setPhoneStatus(0);
            const toValue = 0;
            Animated.spring(
                phoneValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }

        if (type === 'pass' && pass === '') {
            setPassStatus(0);
            const toValue = 0;
            Animated.spring(
                passValue,
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

        if (phone.length <= 0) {
            isError = true;
            msg = i18n.t('enail');
        } else if (codeId === null && show === true) {
            isError = true;
            msg = i18n.t('codeCo');
        } else if (pass.length <= 0) {
            isError = true;
            msg = i18n.t('passVal');
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

    function handleKeyUp(keyword) {
        setPhone(keyword);
        // if (keyword.search("@") === -1){
        //     setShow(true);
        // }else {
        //     setShow(false);
        // }

        const regex = /^[0-9]+$/;
        if (keyword.match(regex)) {
            setShow(true);
        } else {
            setShow(false);
        }

    }

    function onSubmit() {
        const err = validate();
        if (!err) {
            Keyboard.dismiss();
            setLoader(true);
            dispatch(userLogin(phone, pass, codeId, expoPushToken, lang, navigation)).then(() => setLoader(false)).catch(() => setLoader(false));
        }
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

            <Content contentContainerStyle={[styles.bgFullWidth]}>

                <View style={[styles.position_R, styles.flexCenter, styles.Width_100, styles.bgFullWidth]}>

                    <View style={[ styles.overHidden, styles.flexCenter ]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100]}>
                            <Image
                                style={[styles.width_170, styles.height_170]}
                                source={require('../../assets/image/LogoHarag.png')}
                                resizeMode='contain'
                            />
                        </Animatable.View>

                        <View style={[ styles.paddingHorizontal_10, styles.flexCenter, styles.marginVertical_15, styles.border_orange, { borderLeftWidth : 2 } ]}>
                            <Text style={[styles.FairuzNormal, styles.textSize_16, styles.text_White ]}>
                                {i18n.translate('login')}
                            </Text>
                        </View>

                    </View>

                    <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_90, styles.paddingHorizontal_10]}>
                        <Form style={[styles.flexCenter, styles.Width_100, styles.marginVertical_20]}>

                            <View style={[styles.overHidden, styles.rowGroup, styles.Width_100]}>

                                <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_5, show ? styles.flex_70 : styles.flex_100]}>
                                    <Animated.View style={[styles.position_A, styles.left_10, { transform: [{ translateY: phoneValue }] }, (phoneStatus === 1 ? styles.inAct : styles.unAct)]}>
                                        <Text style={[styles.FairuzNormal, styles.textPlatform12, styles.textDir, (phoneStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                            {i18n.translate('meai')}
                                        </Text>
                                    </Animated.View>
                                    <Item style={[styles.item, styles.position_R]}>
                                        <Input
                                            style={[styles.input, styles.height_50, (phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                            // onChangeText={(phone) => setPhone(phone)}
                                            onBlur={() => unActiveInput('phone')}
                                            onFocus={() => activeInput('phone')}
                                            onChangeText={(phone) => handleKeyUp(phone)}
                                        />
                                    </Item>
                                </View>

                                {
                                    show ?
                                        <View style={[styles.overHidden, styles.rowGroup, styles.flex_30]}>
                                            <TouchableOpacity onPress={() => toggleModal('code')} style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.paddingHorizontal_10, styles.flexCenter, styles.Border, styles.border_White, styles.Width_100, (codeId !== null) ? styles.border_orange : styles.border_White, { flexDirection: 'row', justifyContent: "space-between" }]}>
                                                <Text style={[styles.FairuzNormal, styles.textPlatform12, (codeId !== null) ? styles.text_orange : styles.text_White]}>
                                                    {code}
                                                </Text>
                                                <Icon style={[styles.textPlatform12, (codeId !== null) ? styles.text_orange : styles.text_White]} type="AntDesign" name='down' />
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View />
                                }


                            </View>

                            <Modal isVisible={showModalCode} onBackdropPress={() => toggleModal('code')} style={[styles.bottomCenter, styles.Width_100]}>
                                <View style={[styles.overHidden, styles.bg_White, styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius: 30, borderTopRightRadius: 30 }]}>

                                    <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                        <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter]}>
                                            {i18n.t('codeCon')}
                                        </Text>
                                    </View>

                                    <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                        {
                                            codeCountry.map((code) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={[styles.rowGroup, styles.marginVertical_10]}
                                                        onPress={() => selectId('code', code.id, code.key)}
                                                    >
                                                        <View style={[styles.overHidden, styles.rowRight]}>
                                                            <CheckBox
                                                                style={[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                color={styles.text_White}
                                                                selectedColor={styles.text_White}
                                                                checked={codeId === code.key}
                                                            />
                                                            <Text style={[styles.FairuzBlack, styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
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

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_5]}>
                                <Animated.View style={[styles.position_A, styles.left_10, { transform: [{ translateY: passValue }] }, (passStatus === 1 ? styles.inAct : styles.unAct)]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (passStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                        {i18n.translate('password')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, (passStatus === 1 ? styles.Active : styles.noActive)]}
                                        onChangeText={(pass) => setPass(pass)}
                                        onBlur={() => unActiveInput('pass')}
                                        onFocus={() => activeInput('pass')}
                                        secureTextEntry
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('forgetPassword')}
                                style={[styles.marginVertical_5, styles.marginTop_15]}
                            >
                                <Text style={[styles.FairuzNormal, styles.textSize_15, styles.marginVertical_5, styles.text_White, styles.textCenter]}>
                                    {i18n.translate('forgetPassword')}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.bg_orange, styles.marginVertical_10, styles.width_200, styles.height_50, styles.flexCenter, styles.Radius_10]}
                                onPress={() => onSubmit()}
                            >
                                <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_defaultHarag]}>
                                    {i18n.t('login')}
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => navigation.navigate('home')}
                                style={[styles.flexCenter, , styles.width_200, styles.height_50, styles.Radius_10, { backgroundColor: colors.orange }]}
                            >
                                <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_defaultHarag]}>
                                    {i18n.translate('vistor')}
                                </Text>
                            </TouchableOpacity>

                            <View style={[styles.zIndex, styles.Width_100, { marginVertical: 30 }]}>
                                <View style={[styles.Width_100]}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('register')}
                                        style={[styles.paddingHorizontal_10, styles.rowCenter]}
                                    >
                                        <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_White,]}>
                                            {i18n.translate('haveAcc')}
                                        </Text>
                                        <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_orange, styles.textDecoration, styles.marginHorizontal_5]}>
                                            {i18n.translate('register')}
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Form>
                    </KeyboardAvoidingView>



                </View>

            </Content>

        </Container>
    );
}

export default Login;
