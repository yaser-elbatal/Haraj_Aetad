import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator, AsyncStorage
} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Title,
    CheckBox,
    Toast,
    Form,
    Item,
    Input,
    Icon,
    Right
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import Modal from "react-native-modal";
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { allCountries, allCities, register } from "../actions";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

function Register({ navigation, route }) {

    const lang = useSelector(state => state.lang.lang);
    const [name, setName] = useState('');
    const [nameStatus, setNameStatus] = useState(0);
    const [nameValue] = useState(new Animated.Value(0));
    const [phone, setPhone] = useState('');
    const [phoneStatus, setPhoneStatus] = useState(0);
    const [phoneValue] = useState(new Animated.Value(0));
    const [email, setEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState(0);
    const [emailValue] = useState(new Animated.Value(0));
    const [pass, setPass] = useState('');
    const [passStatus, setPassStatus] = useState(0);
    const [passValue] = useState(new Animated.Value(0));
    const [conPass, setConPass] = useState('');
    const [conPassStatus, setConPassStatus] = useState(0);
    const [conPassValue] = useState(new Animated.Value(0));
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const allCity = useSelector(state => state.cities.allCities ? state.cities.allCities : []);
    const countries = useSelector(state => state.countries.countries);
    const codeCountry = useSelector(state => state.countries.countries);
    console.log("xx" + countries);

    const [showModalCountry, setShowModalCountry] = useState(false);
    const [showModalCity, setShowModalCity] = useState(false);
    const [showModalCode, setShowModalCode] = useState(false);

    const [country, setCountry] = useState(i18n.t('choosecountry'));
    const [countryId, setCountryId] = useState(null);
    const [city, setCity] = useState(i18n.t('choosecity'));
    const [cityId, setCityId] = useState(null);
    const [code, setCode] = useState(i18n.t('codeCon'));
    const [codeId, setCodeId] = useState(null);
    const [checkTerms, setCheckTerms] = useState(false);

    const [userImage, setUserImage] = useState('');
    const [base64, setBase64] = useState('');

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const toggle = () => setCheckTerms(!checkTerms);

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

    function activeInput(type) {
        if (type === 'name' || name !== '') {
            setNameStatus(1);
            const toValue = -25;
            Animated.spring(
                nameValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }

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

        if (type === 'email' || email !== '') {
            setEmailStatus(1);
            const toValue = -25;
            Animated.spring(
                emailValue,
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

        if (type === 'conPass' || conPass !== '') {
            setConPassStatus(1);
            const toValue = -25;
            Animated.spring(
                conPassValue,
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
        if (type === 'name' && name === '') {
            setNameStatus(0);
            const toValue = 0;
            Animated.spring(
                nameValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }

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

        if (type === 'email' && email === '') {
            setEmailStatus(0);
            const toValue = 0;
            Animated.spring(
                emailValue,
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

        if (type === 'conPass' && conPass === '') {
            setConPassStatus(0);
            const toValue = 0;
            Animated.spring(
                conPassValue,
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

        if (name.length <= 0) {
            isError = true;
            msg = i18n.t('entername');
        } else if (phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
        } else if (codeId === null) {
            isError = true;
            msg = i18n.t('codeCo');
        } else if (email.length <= 0) {
            isError = true;
            msg = i18n.t('enemail');
        } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
            isError = true;
            msg = i18n.t('entermail');
        } else if (countryId === null) {
            isError = true;
            msg = i18n.translate('choosecountry');
        } else if (cityId === null) {
            isError = true;
            msg = i18n.translate('choosecity');
        } else if (pass.length <= 0) {
            isError = true;
            msg = i18n.translate('passVal');
        } else if (pass.length < 6) {
            isError = true;
            msg = i18n.translate('passreq');
        } else if (pass !== conPass) {
            isError = true;
            msg = i18n.translate('notmatch');
        } else if (checkTerms === false) {
            isError = true;
            msg = i18n.translate('aggreTerms');
        }
        if (msg !== '') {
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBlack',
                    textAlign: 'center',
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
            base64: true
        });

        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        if (!result.cancelled) {
            if (type === 'userImg') {
                setUserImage(result.uri);
                setBase64(result.base64);
            }
        }
    };

    function toggleModal(type) {

        if (type === 'country') {
            setShowModalCountry(!showModalCountry);
        }

        if (type === 'city') {
            if (countryId === null) {
                Toast.show({
                    text: i18n.t('selcountry'),
                    type: "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'FairuzBlack',
                        textAlign: 'center'
                    }
                });
            } else {
                setShowModalCity(!showModalCity);
            }
        }

        if (type === 'code') {
            setShowModalCode(!showModalCode);
        }
    }

    function selectId(type, id, name,) {

        if (type === 'country') {
            setCountryId(id);
            setCountry(name);
            setShowModalCountry(!showModalCountry);
            setCityId(null);
            setCity(i18n.t('choosecity'));
            dispatch(allCities(lang, id));
        }

        if (type === 'city') {
            setCityId(id);
            setCity(name);
            setShowModalCity(!setShowModalCity);
        }

        if (type === 'code') {
            setCodeId(name);
            setCode(name);
            setShowModalCode(!setShowModalCode);
        }

    }

    function onSubmit() {
        const err = validate();

        if (!err) {
            setLoader(true);
            const data = { base64, name, phone, codeId, email, countryId, cityId, pass, expoPushToken, lang };
            dispatch(register(data, navigation)).then(() => setLoader(false).catch(() => setLoader(false)));
        }

    }

    function renderLoader() {
        if (loader) {
            return (
                <View style={[styles.position_A, styles.flexCenter, styles.overlay_black_up, styles.right_0, styles.top_0, styles.Width_100, styles.height_full, { zIndex: 999 }]}>
                    <ActivityIndicator animating={true} size="large" color="#fff" />
                    <Text style={[styles.FairuzBold, styles.text_White, styles.textSize_18, styles.marginTop_25]}>
                        {i18n.t('wait')}
                    </Text>
                </View>
            );
        }
    }

    let image = userImage;

    return (
        <Content contentContainerStyle={[styles.bgFullWidth, styles.bg_default]}>
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
                        {i18n.t('register')}
                    </Title>
                </Body>
            </Header>

            <View style={[styles.overHidden]}>
                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100]}>
                    <Image
                        style={[styles.width_170, styles.height_170, { alignSelf: 'center' }]}
                        source={require('../../assets/image/LogoHarag.png')}
                        resizeMode='contain'
                    />
                </Animatable.View>
            </View>
            <Text style={[styles.FairuzNormal, styles.textPlatform12, styles.textDir, (phoneStatus === 1 ? styles.text_orange : styles.text_White), { fontSize: 18, alignSelf: 'center' }]}>
                {i18n.translate('register')}
            </Text>


            <View style={[styles.position_R, styles.flexCenter, styles.Width_100, styles.zIndex]}>
                {/*<KeyboardAvoidingView behavior={'padding'} style={[styles.Width_90 , styles.paddingHorizontal_10]}>*/}
                <View style={[styles.flexCenter, styles.Width_90, styles.marginVertical_20]}>

                    <View style={[styles.marginVertical_30, styles.position_R]}>
                        <TouchableOpacity onPress={() => _pickImage('userImg')} style={[styles.overHidden, styles.flexCenter, styles.position_R]}>
                            {
                                image !== '' ?
                                    <Image source={{ uri: image }} style={[styles.width_80, styles.height_80, styles.Radius_10]} />
                                    :
                                    <Image resizeMode={'contain'} source={require('../../assets/image/picture.png')} style={[styles.width_70, styles.height_70,]} />
                            }
                        </TouchableOpacity>
                        <Text style={[styles.FairuzBold, styles.textSize_14, styles.text_White, styles.textCenter, styles.marginTop_20]}>
                            {i18n.translate('idpo')}
                        </Text>
                    </View>

                    <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                        <Animated.View style={[styles.position_A, styles.left_10, { transform: [{ translateY: nameValue }] }, (nameStatus === 1 ? styles.inAct : styles.unAct)]}>
                            <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (nameStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                {i18n.translate('userName')}
                            </Text>
                        </Animated.View>
                        <Item style={[styles.item, styles.position_R]}>
                            <Input
                                style={[styles.input, styles.height_50, styles.Radius_5, (nameStatus === 1 ? styles.Active : styles.noActive)]}
                                onChangeText={(name) => setName(name)}
                                onBlur={() => unActiveInput('name')}
                                onFocus={() => activeInput('name')}
                                value={name}
                            />
                        </Item>
                    </View>

                    <View style={[styles.overHidden, styles.rowGroup, styles.Width_100]}>

                        <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_5, styles.flex_70]}>
                            <Animated.View style={[styles.position_A, styles.left_10, { transform: [{ translateY: phoneValue }] }, (phoneStatus === 1 ? styles.inAct : styles.unAct)]}>
                                <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (phoneStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                    {i18n.translate('phone')}
                                </Text>
                            </Animated.View>
                            <Item style={[styles.item, styles.position_R]}>
                                <Input
                                    style={[styles.input, styles.height_50, (phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                    onChangeText={(phone) => setPhone(phone)}
                                    onBlur={() => unActiveInput('phone')}
                                    onFocus={() => activeInput('phone')}
                                    keyboardType={'number-pad'}
                                />
                            </Item>
                        </View>

                        <View style={[styles.overHidden, styles.rowGroup, styles.flex_30]}>
                            <TouchableOpacity onPress={() => toggleModal('code')} style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.paddingHorizontal_10, styles.flexCenter, styles.Border, styles.border_White, styles.Width_100, (codeId !== null) ? styles.border_orange : styles.border_White, { flexDirection: 'row', justifyContent: "space-between" }]}>
                                <Text style={[styles.FairuzNormal, styles.textPlatform12, (codeId !== null) ? styles.text_orange : styles.text_White]}>
                                    {code}
                                </Text>
                                <Icon style={[styles.textPlatform12, (codeId !== null) ? styles.text_orange : styles.text_White]} type="AntDesign" name='down' />
                            </TouchableOpacity>
                        </View>

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

                    <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                        <Animated.View style={[styles.position_A, styles.left_10, { transform: [{ translateY: emailValue }] }, (emailStatus === 1 ? styles.inAct : styles.unAct)]}>
                            <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (emailStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                {i18n.translate('email')}
                            </Text>
                        </Animated.View>
                        <Item style={[styles.item, styles.position_R]}>
                            <Input
                                style={[styles.input, styles.height_50, styles.Radius_5, (emailStatus === 1 ? styles.Active : styles.noActive)]}
                                onChangeText={(email) => setEmail(email)}
                                onBlur={() => unActiveInput('email')}
                                onFocus={() => activeInput('email')}
                                value={email}
                            />
                        </Item>
                    </View>

                    <View style={[styles.overHidden, styles.rowGroup]}>
                        <TouchableOpacity onPress={() => toggleModal('country')} style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.paddingHorizontal_20, styles.paddingVertical_10, styles.rowGroup, styles.Border, styles.Radius_5, (countryId !== null ? styles.border_orange : styles.border_White)]}>
                            <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (countryId !== null) ? styles.text_orange : styles.text_White]}>
                                {country}
                            </Text>
                            <Icon style={[styles.textPlatform12, (countryId !== null) ? styles.text_orange : styles.text_White]} type="AntDesign" name='down' />
                        </TouchableOpacity>
                    </View>

                    <Modal isVisible={showModalCountry} onBackdropPress={() => toggleModal('country')} style={[styles.bottomCenter, styles.Width_100]}>
                        <View style={[styles.overHidden, styles.bg_White, styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius: 30, borderTopRightRadius: 30 }]}>

                            <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter]}>
                                    {i18n.t('choosecountry')}
                                </Text>
                            </View>

                            <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                <ScrollView style={{ height: 300, width: '100%' }}>
                                    {
                                        (countries.length === 0) ?
                                            <View style={[styles.Width_100, styles.height_300, styles.flexCenter]}>
                                                <Text style={[styles.FairuzBold, styles.text_red, styles.textSize_18]}>
                                                    {i18n.t('notcountrey')}
                                                </Text>
                                            </View>
                                            :
                                            countries.map((country) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={[styles.rowGroup, styles.marginVertical_10]}
                                                        onPress={() => selectId('country', country.id, country.name)}
                                                    >
                                                        <View style={[styles.overHidden, styles.rowRight]}>
                                                            <CheckBox
                                                                style={[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                color={styles.text_White}
                                                                selectedColor={styles.text_White}
                                                                checked={countryId === country.id}
                                                            />
                                                            <Text style={[styles.FairuzBlack, styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                {country.name}
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

                    <View style={[styles.overHidden, styles.rowGroup]}>
                        <TouchableOpacity onPress={() => toggleModal('city')} style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.paddingHorizontal_20, styles.paddingVertical_10, styles.rowGroup, styles.Border, styles.Radius_5, (cityId !== null ? styles.border_orange : styles.border_White)]}>
                            <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (cityId !== null) ? styles.text_orange : styles.text_White]}>
                                {city}
                            </Text>
                            <Icon style={[styles.textPlatform12, (cityId !== null) ? styles.text_orange : styles.text_White]} type="AntDesign" name='down' />
                        </TouchableOpacity>
                    </View>

                    {
                        countryId !== null || allCity.length !== 0 ?
                            <Modal isVisible={showModalCity} onBackdropPress={() => toggleModal('city')} style={[styles.bottomCenter, styles.Width_100]}>
                                <View style={[styles.overHidden, styles.bg_White, styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius: 30, borderTopRightRadius: 30 }]}>

                                    <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                        <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter]}>
                                            {i18n.t('choosecity')}
                                        </Text>
                                    </View>

                                    <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                        <ScrollView style={{ height: 300, width: '100%' }}>
                                            {
                                                (allCity.length === 0) ?
                                                    <View style={[styles.Width_100, styles.height_300, styles.flexCenter]}>
                                                        <Text style={[styles.FairuzBold, styles.text_red, styles.textSize_18]}>
                                                            {i18n.t('notcity')}
                                                        </Text>
                                                    </View>
                                                    :
                                                    allCity.map((city) => {
                                                        return (
                                                            <TouchableOpacity
                                                                style={[styles.rowGroup, styles.marginVertical_10]}
                                                                onPress={() => selectId('city', city.id, city.name)}
                                                            >
                                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                                    <CheckBox
                                                                        style={[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                        color={styles.text_White}
                                                                        selectedColor={styles.text_White}
                                                                        checked={cityId === city.id}
                                                                    />
                                                                    <Text style={[styles.FairuzBlack, styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                        {city.name}
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
                            :
                            <View />
                    }

                    <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                        <Animated.View style={[styles.position_A, styles.left_10, { transform: [{ translateY: passValue }] }, (passStatus === 1 ? styles.inAct : styles.unAct)]}>
                            <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (passStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                {i18n.translate('password')}
                            </Text>
                        </Animated.View>
                        <Item style={[styles.item, styles.position_R]}>
                            <Input
                                style={[styles.input, styles.height_50, styles.Radius_5, (passStatus === 1 ? styles.Active : styles.noActive)]}
                                onChangeText={(pass) => setPass(pass)}
                                onBlur={() => unActiveInput('pass')}
                                onFocus={() => activeInput('pass')}
                                secureTextEntry
                            />
                        </Item>
                    </View>

                    <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                        <Animated.View style={[styles.position_A, styles.left_10, { transform: [{ translateY: conPassValue }] }, (conPassStatus === 1 ? styles.inAct : styles.unAct)]}>
                            <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (conPassStatus === 1 ? styles.text_orange : styles.text_White)]}>
                                {i18n.translate('confirmPassword')}
                            </Text>
                        </Animated.View>
                        <Item style={[styles.item, styles.position_R]}>
                            <Input
                                style={[styles.input, styles.height_50, styles.Radius_5, (conPassStatus === 1 ? styles.Active : styles.noActive)]}
                                onChangeText={(conPass) => setConPass(conPass)}
                                onBlur={() => unActiveInput('conPass')}
                                onFocus={() => activeInput('conPass')}
                                secureTextEntry
                            />
                        </Item>
                    </View>

                    <TouchableOpacity onPress={toggle} style={[styles.rowRight, styles.marginVertical_20]}>
                        <TouchableOpacity>
                            <CheckBox
                                style={[styles.checkBox, styles.Border, styles.bg_default, styles.Border, styles.border_White]}
                                color={styles.text_gray}
                                selectedColor={styles.text_White}
                                // onPress={setCheckTerms(!checkTerms)}
                                checked={checkTerms}
                                onPress={toggle}
                            />
                        </TouchableOpacity>
                        <View style={[styles.paddingHorizontal_10, styles.rowRight]}>
                            <Text style={[styles.FairuzNormal, styles.text_White, styles.textSize_13, styles.marginHorizontal_5]}>
                                {i18n.t('regisact')}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.bg_orange, styles.marginVertical_30, styles.width_200, styles.height_50, styles.flexCenter, styles.Radius_10]}
                        onPress={() => onSubmit()}
                    >
                        <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_defaultHarag]}>
                            {i18n.t('confirm')}
                        </Text>
                    </TouchableOpacity>

                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('login')}
                            style={[styles.paddingHorizontal_10, styles.rowCenter]}
                        >
                            <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_White,]}>
                                {i18n.translate('havec')}
                            </Text>
                            <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_orange, styles.textDecoration, styles.marginHorizontal_5]}>
                                {i18n.translate('doHaveAcc')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {/*</KeyboardAvoidingView>*/}
            </View>

        </Content>

    );
}

export default Register;
