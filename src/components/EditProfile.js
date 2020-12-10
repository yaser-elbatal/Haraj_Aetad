import React, { useState , useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator
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
import {allCountries, allCities, updateProfile} from "../actions";
import Loading from "../components/Loading";

function EditProfile({navigation}) {

    const lang                                  = useSelector(state => state.lang.lang);
    const userDate                              = useSelector(state => state.auth.user ? state.auth.user : null);
    const [name, setName]                       = useState(userDate.name);
    const [nameStatus, setNameStatus]           = useState(1);
    const [nameValue]                           = useState(new Animated.Value(-25));
    const [loader, setLoader]                   = useState(false);
    const dispatch                              = useDispatch();

    const allCity                               = useSelector(state => state.cities.allCities ? state.cities.allCities : []);
    const countries                             = useSelector(state => state.countries.countries);


    const [showModalCountry, setShowModalCountry]               = useState(false);
    const [showModalCity, setShowModalCity]                     = useState(false);

    const token                             = useSelector(state => state.auth.user ? state.auth.user.token : null);

    const [country, setCountry]             = useState(userDate.country);
    const [countryId, setCountryId]         = useState(userDate.country_id);
    const [city, setCity]                   = useState(userDate.city);
    const [cityId, setCityId]               = useState(userDate.city_id);

    const [userImage, setUserImage]         = useState(null);
    const [base64, setBase64]               = useState(null);

    function fetchData(){
        dispatch(allCountries(lang));
        const id = userDate.country_id;
        dispatch(allCities(lang, id));
    }

    useEffect(() => {
        fetchData();
    }, []);

    function activeInput(type) {

        if (type === 'name' || name !== ''){
            setNameStatus(1);
            const toValue = -25;
            Animated.spring(
                nameValue,
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

        if (type === 'name' && name === ''){
            setNameStatus(0);
            const toValue   = 0;
            Animated.spring(
                nameValue,
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

        if (name.length <= 0) {
            isError     = true;
            msg         = i18n.t('entername');
        } else if (countryId === null ){
            isError     = true;
            msg         = i18n.translate('choosecity');
        } else if (cityId === null){
            isError     = true;
            msg         = i18n.translate('chnation');
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

    function toggleModal (type) {

        if (type === 'country'){
            setShowModalCountry(!showModalCountry);
        }

        if (type === 'city'){
            if (countryId === null) {
                Toast.show({
                    text        : i18n.t('selcountry') ,
                    type        : "danger",
                    duration    : 3000,
                    textStyle   	: {
                        color       	: "white",
                        fontFamily  	: 'FairuzBlack',
                        textAlign   	: 'center'
                    }
                });
            } else {
                setShowModalCity(!showModalCity);
            }
        }

        if (type === 'code'){
            setShowModalCode(!showModalCode);
        }
    }

    function selectId(type, id, name,) {

        if (type === 'country'){
            setCountryId(id);
            setCountry(name);
            setCityId(null);
            setCity(i18n.t('choosecity'));
            setShowModalCountry(!showModalCountry);
            dispatch(allCities(lang, id));
        }

        if (type === 'city'){
            setCityId(id);
            setCity(name);
            setShowModalCity(!setShowModalCity);
        }

    }

    function onSubmit(){
        const err = validate();

        if (!err){
            setLoader(true);
            const data = { base64, name, countryId, cityId, token, lang };
            dispatch(updateProfile(data, navigation)).then(()=> setLoader(false).catch(()=> setLoader(false)));
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
                        { i18n.t('editdata') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={styles.bgFullWidth}>

                <View style={[styles.position_R,styles.flexCenter, styles.Width_100, styles.zIndex]}>
                    <KeyboardAvoidingView behavior={'padding'} style={[styles.Width_90 , styles.paddingHorizontal_10]}>
                        <Form style={[styles.flexCenter, styles.Width_100, styles.marginVertical_20]}>

                            <View style={[ styles.marginVertical_30, styles.position_R ]}>
                                <TouchableOpacity onPress={() => _pickImage('userImg')} style={[ styles.overHidden, styles.flexCenter,styles.position_R ]}>
                                    {
                                        image !== null ?
                                            <Image source={{ uri: image }} style={[ styles.width_80, styles.height_80, styles.Radius_10 ]} />
                                            :
                                            <Image source={{ uri: userDate.avatar }} style={[ styles.width_80, styles.height_80, styles.Radius_10 ]} />
                                    }
                                </TouchableOpacity>
                                <Text style={[ styles.FairuzBold, styles.textSize_14, styles.text_default, styles.textCenter, styles.marginTop_20 ]}>
                                    {i18n.translate('idpo')}
                                </Text>
                            </View>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: nameValue}]}, (nameStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (nameStatus === 1 ? styles.text_orange : styles.text_bold_gray)]}>
                                        {i18n.translate('userName')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.Radius_5, styles.text_default ,(nameStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(name) => setName(name)}
                                        onBlur={() => unActiveInput('name')}
                                        onFocus={() => activeInput('name')}
                                        value={ name }
                                    />
                                </Item>
                            </View>

                            <View style={[styles.overHidden, styles.rowGroup]}>
                                <TouchableOpacity onPress={() => toggleModal('country')} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, styles.Radius_5 ,(countryId !== null ? styles.border_orange :  styles.border_light_gray )]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (countryId !== null) ? styles.text_orange : styles.text_bold_gray]}>
                                        { country }
                                    </Text>
                                    <Icon style={[styles.textPlatform12, (countryId !== null) ? styles.text_orange : styles.text_bold_gray]} type="AntDesign" name='down' />
                                </TouchableOpacity>
                            </View>

                            <Modal isVisible={showModalCountry} onBackdropPress={() => toggleModal('country')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                    <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                        <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>
                                            {i18n.t('choosecountry')}
                                        </Text>
                                    </View>

                                    <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                        <ScrollView style={{ height : 300, width : '100%' }}>
                                            {
                                                ( countries.length === 0 ) ?
                                                    <View style={[ styles.Width_100, styles.height_300, styles.flexCenter ]}>
                                                        <Text style={[ styles.FairuzBold, styles.text_red, styles.textSize_18 ]}>
                                                            {i18n.t('notcountrey')}
                                                        </Text>
                                                    </View>
                                                    :
                                                    countries.map((country) => {
                                                            return (
                                                                <TouchableOpacity
                                                                    style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                                    onPress             = {() => selectId('country', country.id, country.name)}
                                                                >
                                                                    <View style={[styles.overHidden, styles.rowRight]}>
                                                                        <CheckBox
                                                                            style               = {[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                            color               = {styles.text_White}
                                                                            selectedColor       = {styles.text_White}
                                                                            checked             = {countryId === country.id}
                                                                        />
                                                                        <Text style={[styles.FairuzBlack , styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
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
                                <TouchableOpacity onPress={() => toggleModal('city')} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_20, styles.paddingVertical_10 , styles.rowGroup, styles.Border, styles.Radius_5 ,(cityId !== null ? styles.border_orange :  styles.border_light_gray )]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (cityId !== null) ? styles.text_orange : styles.text_bold_gray]}>
                                        { city }
                                    </Text>
                                    <Icon style={[styles.textPlatform12, (cityId !== null) ? styles.text_orange : styles.text_bold_gray]} type="AntDesign" name='down' />
                                </TouchableOpacity>
                            </View>

                            {
                                countryId !== null || allCity.length !== 0 ?
                                    <Modal isVisible={showModalCity} onBackdropPress={() => toggleModal('city')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                        <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                            <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                                <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>
                                                    {i18n.t('choosecity')}
                                                </Text>
                                            </View>

                                            <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                                <ScrollView style={{ height : 300, width : '100%' }}>
                                                    {
                                                        ( allCity.length === 0 ) ?
                                                            <View style={[ styles.Width_100, styles.height_300, styles.flexCenter ]}>
                                                                <Text style={[ styles.FairuzBold, styles.text_red, styles.textSize_18 ]}>
                                                                    {i18n.t('notcity')}
                                                                </Text>
                                                            </View>
                                                            :
                                                            allCity.map((city) => {
                                                                    return (
                                                                        <TouchableOpacity
                                                                            style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                                            onPress             = {() => selectId('city', city.id, city.name)}
                                                                        >
                                                                            <View style={[styles.overHidden, styles.rowRight]}>
                                                                                <CheckBox
                                                                                    style               = {[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                                    color               = {styles.text_White}
                                                                                    selectedColor       = {styles.text_White}
                                                                                    checked             = {cityId === city.id}
                                                                                />
                                                                                <Text style={[styles.FairuzBlack , styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
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
                                    <View/>
                            }

                            <TouchableOpacity
                                style       = {[ styles.bg_orange ,styles.marginVertical_30 , styles.width_200, styles.height_50 , styles.flexCenter, styles.Radius_10]}
                                onPress     = {() => onSubmit()}
                            >
                                <Text style={[styles.FairuzBlack, styles.textSize_15, styles.text_White]}>
                                    { i18n.t('confirm') }
                                </Text>
                            </TouchableOpacity>

                            <View style={[ styles.Width_100, styles.paddingHorizontal_5 ]}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('changePassword')}
                                    style={[ styles.Width_100, styles.flexCenter, styles.height_40 ]}
                                >
                                    <Text style={[styles.FairuzBlack, styles.textPlatform12, styles.text_default, styles.textDecoration, styles.textCenter]}>
                                        {i18n.translate('changepass')}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </Form>
                    </KeyboardAvoidingView>
                </View>

            </Content>

        </Container>
    );
}

export default EditProfile;
