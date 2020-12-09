import React, { useState , useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    KeyboardAvoidingView,
    ScrollView,Platform
} from "react-native";
import {Container, Content, Header, Left, Body, Title, Toast, Form, Item, Input, Icon, CheckBox, Textarea} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as FileSystem from 'expo-file-system';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-native-modal";
import {CameraBrowser} from 'expo-multiple-imagepicker';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';
import * as ImagePicker from 'expo-image-picker';
import {allCities, allCountries, advDetailes, deleteImageAdv, advUpdate, addAdv} from '../actions';
import * as Permissions from "expo-permissions";
import * as Animatable from "react-native-animatable";
import MapView from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import Loading from "./Loading";
import { useFocusEffect } from '@react-navigation/native';

let    data = new FormData();

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;
const isIOS = Platform.OS === 'ios';

function EditAdv({navigation, route}) {

    const lang                                          = useSelector(state => state.lang.lang);
    const [loaded, setLoaded]                           = useState(false);
    const dataInfo                                      = useSelector(state => state.adsDetailes.data ? state.adsDetailes.data : null);
    const codeCountry                                   = useSelector(state => state.countries.countries);
    const token                                         = useSelector(state => state.auth.user ? state.auth.user.token : null);
    const [lastData]                                    = useState(route.params.data ? route.params.data : null);
    const [allCate]                                     = useState(route.params.allCate ? route.params.allCate : dataInfo.ad.categories);
    const dispatch                                      = useDispatch();

    const [nameAR, setNameAR]                           = useState(dataInfo.ad.title_ar);
    const [nameARStatus, setNameARStatus]               = useState(1);
    const [nameARValue]                                 = useState(new Animated.Value(-25));
    const [nameEN, setNameEN]                           = useState(dataInfo.ad.title_en);
    const [nameENStatus, setNameENStatus]               = useState(1);
    const [nameENValue]                                 = useState(new Animated.Value(-25));
    const [price, setPrice]                             = useState(dataInfo.ad.price);
    const [priceStatus, setPriceStatus]                 = useState(1);
    const [priceValue]                                  = useState(new Animated.Value(-25));
    const [detailsAR, setDetailsAR]                     = useState(dataInfo.ad.description_ar);
    const [detailsARStatus, setDetailsARStatus]         = useState(1);
    const [detailsARValue]                              = useState(new Animated.Value(-45));
    const [detailsEN, setDetailsEN]                     = useState(dataInfo.ad.description_en);
    const [detailsENStatus, setDetailsENStatus]         = useState(1);
    const [detailsENValue]                              = useState(new Animated.Value(-45));
    const [phone, setPhone]                             = useState(dataInfo.ad.phone);
    const [phoneStatus, setPhoneStatus]                 = useState(1);
    const [phoneValue]                                  = useState(new Animated.Value(-25));

    const [showModalUpload, setShowModalUpload]         = useState(false);

    const [imageBrowserOpen, setImageBrowserOpen]       = useState(false);
    const [cameraBrowserOpen, setCameraBrowserOpen]     = useState(false);
    const [showModalCountry, setShowModalCountry]       = useState(false);
    const [showModalCity, setShowModalCity]             = useState(false);
    const [showModalMap, setShowModalMap]               = useState(false);


    const [isChat, setIsChat]                           = useState(dataInfo.ad.is_chat);
    const [isPhone, setIsPhone]                         = useState(dataInfo.ad.is_phone);
    const [isRefresh, setIsRefresh]                     = useState(dataInfo.ad.is_refresh);
    const [loaderView, setLoaderView]                   = useState(true);

    const [showModalCode, setShowModalCode]             = useState(false);
    const [code, setCode]                               = useState(i18n.t('codeCon'));
    const [codeId, setCodeId]                           = useState(null);
    const [allImages, setAllImages]                     = useState(dataInfo.ad.images);
    const [lastId, setLastId]                           = useState(dataInfo.ad.category_id);
    const [allFeatures, setAllFeatures]                 = useState(route.params.data ? route.params.data.features : dataInfo.ad.features);
    const [inputVals, setInputVals]                     = useState(allFeatures);
    const [features, setFeatures]                       = useState([]);
    const [nameFeat, setNameFeat]                       = useState('');

    const allCity                                       = useSelector(state => state.cities.allCities ? state.cities.allCities : []);
    const countries                                     = useSelector(state => state.countries.countries);
    const [country, setCountry]                         = useState(dataInfo.ad.country ? dataInfo.ad.country : i18n.t('choosecountry'));
    const [countryId, setCountryId]                     = useState(dataInfo.ad.country_id);
    const [city, setCity]                               = useState(dataInfo.ad.city ? dataInfo.ad.city : i18n.t('choosecity'));
    const [cityId, setCityId]                           = useState(dataInfo.ad.city_id);

    const [nameInput, setNameInput]                     = useState('');
    const [blogId]                                      = useState(route.params.blogId);

    let mapRef                                          = useRef(null);
    const [initMap, setInitMap]                         = useState(true);
    const [mapErr, setMapErr]                           = useState(false);
    const [mapCity, setMapCity]                         = useState(dataInfo.ad.address);
    const [nameMap, setNameMap]                         = useState(i18n.t('Location'));
    const [mapRegion, setMapRegion]                     = useState({
        latitude: dataInfo.ad.latitude ,
        longitude: dataInfo.ad.longitude,
        latitudeDelta ,
        longitudeDelta
    });

    const [base64, setBase64]                            = useState([]);
    const [images, setImages]                            = useState([]);

    const fetchData = async () => {

        dispatch(advDetailes( token, blogId, lang )).then(()=> setLoaderView(false).catch(()=> setLoaderView(false)));

        dispatch(allCountries(lang));

        getPermissionAsync();

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            if (route.params && route.params.latitude){
                userLocation = { latitude: route.params.latitude, longitude:route.params.longitude , latitudeDelta , longitudeDelta};
            } else {
                userLocation = { latitude, longitude , latitudeDelta , longitudeDelta};
            }
            setInitMap(false);
            setMapRegion(userLocation);
            isIOS ? mapRef.current.animateToRegion(userLocation, 1000) : false;
        }
        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity    += userLocation.latitude + ',' + userLocation.longitude;
        getCity    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        try {
            const { data } = await axios.get(getCity);
            setMapCity(data.results[0].formatted_address)
        } catch (e) {
            console.log(e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
            return () => {
                fetchData();
            };
        }, [navigation, route.params.photos])
    );

    useEffect(() => {

        const callBackImages = route.params.photos ?? [];
        for (let i = 0; i < callBackImages.length; i++){
            let imageUrl = callBackImages[i].uri;
            images.push(imageUrl);
            FileSystem.readAsStringAsync(imageUrl, { encoding: 'base64' }).then((base) => {
                base64.push(base);
            }).catch((e) =>{
                console.log(e);
            });
        }
        setImages([...images]);

    }, [navigation, route.params.photos]);

    function toggle(type) {
        if (type === 'chat'){
            setIsChat(!isChat)
        } else if (type === 'phone'){
            setIsPhone(!isPhone)
        } else if (type === 'refresh'){
            setIsRefresh(!isRefresh)
        }
    };

    function toggleModal (type) {

        if (type === 'upload'){
            setShowModalUpload(!showModalUpload);
        }

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

        if (type === 'map'){
            setShowModalMap(!showModalMap);
        }

    }

    function selectId(type, id, name) {

        if (type === 'country'){
            setCountryId(id);
            setCountry(name);
            setShowModalCountry(!showModalCountry);
            dispatch(allCities(lang, id));
        }

        if (type === 'city'){
            setCityId(id);
            setCity(name);
            setShowModalCity(!setShowModalCity);
        }

        if (type === 'code'){
            setCodeId(id);
            setCode(name);
            setShowModalCode(!setShowModalCode);
        }

    }

    function getSubCategory( count, data ){
        if (count === 0){
            Toast.show({
                text        : i18n.t('noC'),
                type        : "danger",
                duration    : 3000,
                textStyle       : {
                    color       : "white",
                    fontFamily  : 'FairuzBlack',
                    textAlign   : 'center',
                }
            });
        } else {
            navigation.navigate('chooseSubCategory', { data, blogId });
        }
    }

    function activeInput(type) {

        if (type === 'nameAR' || nameAR !== ''){
            setNameARStatus(1);
            const toValue = -25;
            Animated.spring(
                nameARValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'nameEN' || nameEN !== ''){
            setNameENStatus(1);
            const toValue = -25;
            Animated.spring(
                nameENValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'price' || price !== ''){
            setPriceStatus(1);
            const toValue = -25;
            Animated.spring(
                priceValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'detailsAR' || detailsAR !== ''){
            setDetailsARStatus(1);
            const toValue = -45;
            Animated.spring(
                detailsARValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'detailsEN' || detailsEN !== ''){
            setDetailsENStatus(1);
            const toValue = -45;
            Animated.spring(
                detailsENValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

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

        if (type === 'nameAR' && nameAR === ''){
            setNameARStatus(0);
            const toValue   = 0;
            Animated.spring(
                nameARValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'nameEN' && nameEN === ''){
            setNameENStatus(0);
            const toValue   = 0;
            Animated.spring(
                nameENValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'price' && price === ''){
            setPriceStatus(0);
            const toValue   = 0;
            Animated.spring(
                priceValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'detailsAR' && detailsAR === ''){
            setDetailsARStatus(0);
            const toValue   = -23;
            Animated.spring(
                detailsARValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'detailsEN' && detailsEN === ''){
            setDetailsENStatus(0);
            const toValue   = -23;
            Animated.spring(
                detailsENValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

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

    function handleChange (id) {
        const obj       = { id : id, value : nameFeat };
        let arr         = features.find(o => o.id == id);
        let index       = features.indexOf(arr);
        if (index > -1) {
            features.splice(index, 1);
            const objNew = { id : id, value : nameFeat };
            features.push(objNew);
        } else {
            features.push(obj);
        }

    }

    const validate = () => {

        let isError     = false;
        let msg         = '';

        if ( images.length <= 0 && allImages.length <= 0 ){
            isError     = true;
            msg         = i18n.t('chphAdv');
        } else if (countryId === null){
            isError     = true;
            msg         = i18n.t('choosecountry');
        } else if (cityId === null){
            isError     = true;
            msg         = i18n.t('choosecity');
        } else if (nameAR.length <= 0){
            isError     = true;
            msg         = i18n.t('setN');
        } else if (nameEN.length <= 0){
            isError     = true;
            msg         = i18n.t('setN');
        } else if (price.length <= 0){
            isError     = true;
            msg         = i18n.t('setS');
        } else if (detailsAR.length <= 0){
            isError     = true;
            msg         = i18n.t('setD');
        } else if (detailsEN.length <= 0){
            isError     = true;
            msg         = i18n.t('setD');
        } else if (phone.length <= 0){
            isError     = true;
            msg         = i18n.t('setP');
        }
        // else if (codeId === null){
        //     isError     = true;
        //     msg         = i18n.t('codeCo');
        // }
        else if (mapCity === ''){
            isError     = true;
            msg         = i18n.t('Location');
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

    const getPermissionAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    const uploadImages = async (i) => {

        if(images.length >= 5){

            setShowModalUpload(!showModalUpload);

            Toast.show({
                text        	: i18n.t('photo'),
                type			: "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'FairuzBlack',
                    textAlign   	: 'center'
                }
            });

        }else if (i === 0) {

            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect      : [4, 3],
                quality     : .5,
                base64      : true
            });

            if (!result.cancelled) {
                setShowModalUpload(!showModalUpload);
                setImages(images.concat(result.uri));
                setBase64(base64.concat(result.base64));
                data.append("images[]",{
                    uri : result.uri,
                    type : 'image/jpeg',
                    name : result.filename || `temp_image_${result.height}.jpg`
                });
            }

        }else if (i === 1) {

            setShowModalUpload(!showModalUpload);
            navigation.navigate('imageBrowser', { routeName: 'editAdv' })

        }
    };

    function deleteImg(i) {
        base64.splice(i, 1);
        images.splice(i, 1);
        setBase64([...base64]);
        setImages([...images]);
    }

    function deleteOldImage(i , id) {
        setLoaderView(true);
        dispatch(deleteImageAdv( token, id, lang )).then(()=> {
            setLoaderView(false);
            allImages.splice(i, 1);
        }).catch(()=> setLoaderView(false));
    }

    const _handleMapRegionChange  = async (mapCoordinate) =>  {

        setMapRegion({ latitude: mapCoordinate.latitude, longitude: mapCoordinate.longitude, latitudeDelta, longitudeDelta});

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapCoordinate.latitude + ',' + mapCoordinate.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        try {
            const { data } = await axios.get(getCity);
            setMapCity(data.results[0].formatted_address)

        } catch (e) {
            console.log(e);
        }
    };

    function getLocation(){

        if (mapCity === ''){
            setNameMap(i18n.t('chickmap'));
            setMapErr(true);
        } else {
            setShowModalMap(!showModalMap);
            setNameMap(i18n.t('Location'));
            setMapErr(false);
        }

    }

    function onSubmit(){
        const err = validate();
        if (!err){
            setLoaded(true);
            const data = { lang, token, lastData, lastId, blogId, base64, countryId, cityId, inputVals, nameAR, nameEN, price, detailsAR, detailsEN, phone, isRefresh, isPhone, isChat, mapRegion, mapCity, };
            dispatch(advUpdate(data, navigation)).then(()=> setLoaded(false).catch(()=> setLoaded(false)));
        }

    }

    function LoaderView(){
        if (loaderView){
            return(
                <Loading/>
            );
        }
    }

    function renderLoader(){
        if (loaded){
            return(
                <View style={[styles.position_A, styles.bg_White , styles.flexCenter, styles.right_0, styles.top_0, styles.Width_100, styles.height_full ,{ zIndex : 9999 }]}>
                    <Animatable.Text animation="fadeIn" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center', width : 100, height : 100 }}>
                        <Image
                            style={[styles.width_50, styles.height_50]}
                            source={require('../../assets/image/loading.png')}
                            resizeMode='stretch'
                        />
                    </Animatable.Text>
                    <Text style={[styles.FairuzBold , styles.text_default, styles.textSize_18, styles.marginTop_25]}>
                        { i18n.t('load') }
                    </Text>
                </View>
            );
        }
    }

    function changeVal(value, i) {
        let newArr = inputVals;
        newArr[i] = {...newArr[i], value};
        setInputVals([...newArr]);
    }

    return (

        <Container>

            { renderLoader() }
            { LoaderView() }

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
                        { i18n.t('edi') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R ]}>

                {
                    dataInfo ?
                        <View>
                            <View style={[ styles.flexCenter, styles.Width_100, styles.marginTop_25, styles.paddingHorizontal_10 ]}>

                                <View style={[ styles.rowIng ]}>
                                    <Text style={[styles.FairuzBold, styles.textPlatform12, styles.text_default]}>
                                        { i18n.t('anCate') } :
                                    </Text>
                                    <View style={[ styles.rowIng ]}>
                                        {
                                            allCate.map((item, i) => {
                                                    return (
                                                        <TouchableOpacity onPress={() => getSubCategory( item.count, { id : item.id , name : item.name, count : item.has_subs, features : item.features, namePage : 'editAdv' } )} style={[ styles.overHidden, styles.paddingHorizontal_5 ]}>
                                                            <Text style={[styles.FairuzNormal, styles.textPlatform12, i + 1  === Object.keys(allCate).length ? styles.text_black : styles.text_orange]}>
                                                                { i + 1  === Object.keys(allCate).length ? item.name : item.name + ' ' + ' ' + '>' }
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            )
                                        }
                                        {
                                            !lastData ?
                                                <TouchableOpacity onPress={() => getSubCategory( dataInfo.ad.category_has_subs, { id : dataInfo.ad.category_id , name : dataInfo.ad.category, count : dataInfo.ad.category_has_subs, features : dataInfo.ad.category_features, namePage : 'editAdv' } )} style={[ styles.overHidden, styles.paddingHorizontal_5 ]}>
                                                    <Text style={[styles.FairuzNormal, styles.textPlatform12, allCate.length !== 0 ? styles.text_orange : styles.text_black]}>
                                                        { allCate.length !== 0 ? dataInfo.ad.category : dataInfo.ad.category + ' ' + ' ' + '>' }
                                                    </Text>
                                                </TouchableOpacity>
                                                :
                                                <View/>
                                        }
                                    </View>
                                </View>

                                <View style={[ styles.rowCenter, styles.marginVertical_15 ]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform12, styles.text_black]}>
                                        { i18n.t('ifcV') }
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('chooseCategory', { namePage : 'editAdv', blogId : blogId })}
                                        style={[ styles.overHidden, styles.paddingHorizontal_5 ]}>
                                        <Text style={[styles.FairuzNormal, styles.textPlatform12, styles.text_orange]}>
                                            { i18n.t('allC') }
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={[styles.position_R, styles.flexCenter, styles.Width_100, styles.zIndex]}>
                                {/*<KeyboardAvoidingView behavior={'padding'} style={[styles.Width_95]}>*/}
                                    <Form style={[styles.flexCenter, styles.Width_95, styles.marginVertical_20]}>

                                        <View style={[styles.overHidden, styles.rowGroup, styles.marginTop_5]}>
                                            <TouchableOpacity onPress={() => toggleModal('upload')} style={[ styles.Radius_5, styles.flexCenter, styles.width_200, styles.height_130 ,styles.Border ,(base64.length !== 0 ? styles.border_default :  styles.border_light_gray )]}>
                                                <Icon style={[styles.textSize_30, styles.marginVertical_15 ,(base64.length !== 0 ? styles.text_default : styles.text_light_gray)]} type="Fontisto" name='camera' />
                                                <Text style={[styles.FairuzBlack, styles.textSize_14, ( base64.length !== 0 ? styles.text_default : styles.text_light_gray )]}>
                                                    {
                                                        ( base64.length !== 0 ) ?
                                                            i18n.t('dophoto')
                                                            :
                                                            i18n.t('addphots')
                                                    }
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <Modal isVisible={showModalUpload} onBackdropPress={() => toggleModal('upload')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                                <View style={[ styles.bg_default, styles.flexCenter, styles.paddingVertical_15, styles.Width_100 ]}>
                                                    <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_White]}>
                                                        {i18n.t('choose')}
                                                    </Text>
                                                </View>

                                                <TouchableOpacity onPress={() => uploadImages(0)} style={[ styles.Width_100, styles.rowIng , styles.paddingHorizontal_20, styles.paddingVertical_20 ,styles.borderBottom , styles.border_light_gray]}>
                                                    <Icon style={[styles.textSize_20, styles.text_black]} type="Entypo" name='camera' />
                                                    <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_black, styles.textDir, styles.marginHorizontal_10]}>
                                                        {i18n.t('cam')}
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => uploadImages(1)} style={[ styles.Width_100, styles.rowIng, styles.paddingVertical_20 , styles.paddingHorizontal_20]}>
                                                    <Icon style={[styles.textSize_20, styles.text_black]} type="Entypo" name='images' />
                                                    <Text style={[styles.FairuzBlack, styles.textSize_14, styles.text_black, styles.textDir, styles.marginHorizontal_10]}>
                                                        {i18n.t('gall')}
                                                    </Text>
                                                </TouchableOpacity>


                                            </View>
                                        </Modal>

                                        <View style={[ styles.marginTop_10, styles.rowIng ]}>
                                            <Text style={[styles.FairuzNormal, styles.textPlatform12, styles.text_orange, styles.textCenter]}>
                                                { i18n.t('olIm') } :
                                            </Text>
                                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginHorizontal: 10, marginTop : 5 }}>
                                                {
                                                    dataInfo.ad.images.map((item,i) => {
                                                        return(
                                                            <View key={i} style={[ styles.width_70, styles.height_70, styles.marginVertical_10, styles.marginHorizontal_10, styles.Radius_10, styles.overHidden ]}>
                                                                <Image
                                                                    style={[ styles.Width_100, styles.height_full ]}
                                                                    source={{uri: item.image}}
                                                                    key={i}
                                                                />
                                                                <TouchableOpacity onPress={() => {deleteOldImage(i , item.id)}} style={[ styles.position_A, styles.Width_100, styles.height_full, styles.flexCenter, styles.overlay_black, styles.top_0, styles.right_0 ]}>
                                                                    <Icon name="close" style={[ styles.textSize_14, styles.text_White ]}/>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                        </View>

                                        {
                                            ( images.length !== 0 ) ?
                                                <View style={[ styles.marginTop_10, styles.rowIng ]}>
                                                    <Text style={[styles.FairuzNormal, styles.textPlatform12, styles.text_orange, styles.textCenter]}>
                                                        { i18n.t('newIm') } :
                                                    </Text>
                                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginHorizontal: 10, marginTop : 5 }}>
                                                        {
                                                            images.map((item,i) => {
                                                                return(
                                                                    <View key={i} style={[ styles.width_70, styles.height_70, styles.marginVertical_10, styles.marginHorizontal_10, styles.Radius_10, styles.overHidden ]}>
                                                                        <Image
                                                                            style={[ styles.Width_100, styles.height_full ]}
                                                                            source={{uri: item}}
                                                                            key={i}
                                                                        />
                                                                        <TouchableOpacity onPress={() => {deleteImg(i)}} style={[ styles.position_A, styles.Width_100, styles.height_full, styles.flexCenter, styles.overlay_black, styles.top_0, styles.right_0 ]}>
                                                                            <Icon name="close" style={[ styles.textSize_14, styles.text_White ]}/>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </ScrollView>
                                                </View>
                                                :
                                                <View/>
                                        }

                                        <View style={[ styles.rowGroup ]}>

                                            <View style={[styles.overHidden, styles.flex_50]}>
                                                <TouchableOpacity onPress={() => toggleModal('country')} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_5, styles.flexCenter, styles.Border , countryId !== null ? styles.border_orange : styles.border_light_gray,{ flexDirection : 'row',justifyContent: "space-between" }]}>
                                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, countryId !== null ? styles.text_orange : styles.text_bold_gray]}>
                                                        { country }
                                                    </Text>
                                                    <Icon style={[styles.textPlatform14, countryId !== null ? styles.text_orange : styles.text_bold_gray]} type="AntDesign" name='down' />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={[styles.overHidden, styles.flex_50]}>
                                                <TouchableOpacity onPress={() => toggleModal('city')} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_5, styles.flexCenter, styles.Border , cityId !== null ? styles.border_orange : styles.border_light_gray,{ flexDirection : 'row',justifyContent: "space-between" }]}>
                                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, cityId !== null ? styles.text_orange : styles.text_bold_gray]}>
                                                        { city }
                                                    </Text>
                                                    <Icon style={[styles.textPlatform14, cityId !== null ? styles.text_orange : styles.text_bold_gray]} type="AntDesign" name='down' />
                                                </TouchableOpacity>
                                            </View>

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
                                                                <View>
                                                                    <TouchableOpacity
                                                                        style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                                        onPress             = {() => selectId('country', null, i18n.t('allcoun'))}
                                                                    >
                                                                        <View style={[styles.overHidden, styles.rowRight]}>
                                                                            <CheckBox
                                                                                style               = {[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                                color               = {styles.text_White}
                                                                                selectedColor       = {styles.text_White}
                                                                                checked             = {countryId === null}
                                                                            />
                                                                            <Text style={[styles.FairuzBlack , styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                                {i18n.t('allcoun')}
                                                                            </Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                    {
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
                                                                </View>
                                                        }
                                                    </ScrollView>
                                                </View>

                                            </View>
                                        </Modal>

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
                                                                        <View>
                                                                            <TouchableOpacity
                                                                                style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                                                onPress             = {() => selectId('city', null, i18n.t('allcit'))}
                                                                            >
                                                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                                                    <CheckBox
                                                                                        style               = {[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                                        color               = {styles.text_White}
                                                                                        selectedColor       = {styles.text_White}
                                                                                        checked             = {cityId === null}
                                                                                    />
                                                                                    <Text style={[styles.FairuzBlack , styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                                        {i18n.t('allcit')}
                                                                                    </Text>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                            {
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
                                                                        </View>
                                                                }
                                                            </ScrollView>
                                                        </View>

                                                    </View>
                                                </Modal>
                                                :
                                                <View/>
                                        }

                                        <View style={[ styles.rowGroup ]}>
                                            {
                                                allFeatures.map((features, i) => {
                                                        return (
                                                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.flex_100]}>
                                                                <Item style={[styles.item, styles.position_R]}>
                                                                    <Input
                                                                        style={[styles.input, styles.height_50, styles.text_default, styles.Border ,(nameInput === features.name ? styles.border_orange : styles.border_light_gray)]}
                                                                        placeholder             = { features.name }
                                                                        onChangeText            = {(keyword)=> changeVal(keyword, i)}
                                                                        placeholderTextColor    = "#2E234D"
                                                                        onBlur                  = {()=> handleChange(features.id)}
                                                                        value={inputVals[i].value}
                                                                    />
                                                                </Item>
                                                            </View>
                                                        )
                                                    }
                                                )
                                            }
                                        </View>

                                        <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                            <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: nameARValue}]}, (nameARStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                                <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (nameARStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                                    {i18n.translate('nAr')}
                                                </Text>
                                            </Animated.View>
                                            <Item style={[styles.item, styles.position_R]}>
                                                <Input
                                                    style={[styles.input, styles.height_50, styles.text_default, styles.Border ,(nameARStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                                    onChangeText={(nameAR) => setNameAR(nameAR)}
                                                    onBlur={() => unActiveInput('nameAR')}
                                                    onFocus={() => activeInput('nameAR')}
                                                    value={nameAR}
                                                />
                                            </Item>
                                        </View>

                                        <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                            <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: nameENValue}]}, (nameENStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                                <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (nameENStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                                    {i18n.translate('nEn')}
                                                </Text>
                                            </Animated.View>
                                            <Item style={[styles.item, styles.position_R]}>
                                                <Input
                                                    style={[styles.input, styles.height_50, styles.text_default, styles.Border ,(nameENStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                                    onChangeText={(nameEN) => setNameEN(nameEN)}
                                                    onBlur={() => unActiveInput('nameEN')}
                                                    onFocus={() => activeInput('nameEN')}
                                                    value={nameEN}
                                                />
                                            </Item>
                                        </View>

                                        <View style={[styles.position_R, styles.height_70, styles.flexCenter]}>
                                            <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: priceValue}]}, (priceStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                                <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (priceStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                                    {i18n.translate('saA')}
                                                </Text>
                                            </Animated.View>
                                            <Item style={[styles.item, styles.position_R]}>
                                                <Input
                                                    style={[styles.input, styles.height_50, styles.text_default, styles.Border ,(priceStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                                    onChangeText={(price) => setPrice(price)}
                                                    onBlur={() => unActiveInput('price')}
                                                    onFocus={() => activeInput('price')}
                                                    value={price}
                                                />
                                            </Item>
                                        </View>

                                        <View style={[styles.position_R, styles.height_90, styles.flexCenter, styles.marginTop_10]}>
                                            <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: detailsARValue}]}, (detailsARStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                                <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (detailsARStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                                    {i18n.translate('dAr')}
                                                </Text>
                                            </Animated.View>
                                            <Item style={[styles.item, styles.position_R]}>
                                                <Textarea
                                                    style={[styles.textArea, styles.height_90, styles.textDir,styles.text_default, styles.Border, styles.paddingTop_15 ,(detailsARStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                                    onChangeText={(detailsAR) => setDetailsAR(detailsAR)}
                                                    onBlur={() => unActiveInput('detailsAR')}
                                                    onFocus={() => activeInput('detailsAR')}
                                                    value={detailsAR}
                                                />
                                            </Item>
                                        </View>

                                        <View style={[styles.position_R, styles.height_90, styles.flexCenter, styles.marginTop_20]}>
                                            <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: detailsENValue}]}, (detailsENStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                                <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (detailsENStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                                    {i18n.translate('dEn')}
                                                </Text>
                                            </Animated.View>
                                            <Item style={[styles.item, styles.position_R]}>
                                                <Textarea
                                                    style={[styles.textArea, styles.height_90, styles.textDir,styles.text_default, styles.Border, styles.paddingTop_15 ,(detailsENStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                                    onChangeText={(detailsEN) => setDetailsEN(detailsEN)}
                                                    onBlur={() => unActiveInput('detailsEN')}
                                                    onFocus={() => activeInput('detailsEN')}
                                                    value={detailsEN}
                                                />
                                            </Item>
                                        </View>

                                        <View style={[styles.overHidden, styles.rowGroup, styles.Width_100]}>

                                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_5, styles.flex_100]}>
                                                <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: phoneValue}]}, (phoneStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (phoneStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                                        {i18n.translate('phone')}
                                                    </Text>
                                                </Animated.View>
                                                <Item style={[styles.item, styles.position_R]}>
                                                    <Input
                                                        style={[styles.input, styles.height_50, styles.text_default, styles.Border ,(phoneStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                                        onChangeText={(phone) => setPhone(phone)}
                                                        onBlur={() => unActiveInput('phone')}
                                                        onFocus={() => activeInput('phone')}
                                                        value={phone}
                                                        keyboardType={'number-pad'}
                                                    />
                                                </Item>
                                            </View>

                                            {/*<View style={[styles.overHidden, styles.rowGroup, styles.flex_30]}>*/}
                                            {/*    <TouchableOpacity onPress={() => toggleModal('code')} style={[ styles.marginVertical_10 , styles.Width_100, styles.height_50 , styles.paddingHorizontal_10 , styles.flexCenter, styles.Border , styles.border_White, styles.Width_100, (codeId !== null) ? styles.border_orange : styles.border_light_gray ,{ flexDirection : 'row',justifyContent: "space-between" }]}>*/}
                                            {/*        <Text style={[styles.FairuzNormal, styles.textPlatform12, (codeId !== null) ? styles.text_orange : styles.text_default]}>*/}
                                            {/*            { code }*/}
                                            {/*        </Text>*/}
                                            {/*        <Icon style={[styles.textPlatform12, (codeId !== null) ? styles.text_orange : styles.text_default]} type="AntDesign" name='down' />*/}
                                            {/*    </TouchableOpacity>*/}
                                            {/*</View>*/}

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
                                                                                checked             = {codeId === code.id}
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
                                            onPress     = {() => toggle('chat')}
                                            style       = {[styles.rowRight, styles.marginVertical_10]}>
                                            <TouchableOpacity style = {[ styles.marginHorizontal_10, lang !== 'ar' || lang == null ? { marginRight : 0 } : { marginLeft : 0 }  ]}>
                                                <CheckBox
                                                    style           = {[styles.checkBox, styles.Border, styles.bg_default, styles.border_default]}
                                                    color           = {styles.text_gray}
                                                    selectedColor   = {styles.text_orange}
                                                    checked         = {isChat}
                                                    onPress         = {() => toggle('chat')}
                                                />
                                            </TouchableOpacity>
                                            <View style = {[ styles.marginHorizontal_10 , styles.width_40, styles.height_40, styles.bg_dash, styles.Radius_5, styles.flexCenter ]}>
                                                <Image resizeMode={'contain'} source={require('../../assets/image/Ochat.png')} style={[ styles.width_20, styles.height_20, ]} />
                                            </View>
                                            <View style={[]}>
                                                <Text style={[styles.FairuzBold, styles.text_default, styles.textSize_14, styles.marginHorizontal_5]}>
                                                    {i18n.t('sM')}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress     = {() => toggle('phone')}
                                            style       = {[styles.rowRight, styles.marginVertical_10]}>
                                            <TouchableOpacity style = {[ styles.marginHorizontal_10, lang !== 'ar' || lang == null ? { marginRight : 0 } : { marginLeft : 0 }  ]}>
                                                <CheckBox
                                                    style           = {[styles.checkBox, styles.Border, styles.bg_default, styles.border_default]}
                                                    color           = {styles.text_gray}
                                                    selectedColor   = {styles.text_orange}
                                                    checked         = {isPhone}
                                                    onPress         = {() => toggle('phone')}
                                                />
                                            </TouchableOpacity>
                                            <View style = {[ styles.marginHorizontal_10 , styles.width_40, styles.height_40, styles.bg_dash, styles.Radius_5, styles.flexCenter ]}>
                                                <Image resizeMode={'contain'} source={require('../../assets/image/Ophone.png')} style={[ styles.width_20, styles.height_20, ]} />
                                            </View>
                                            <View style={[]}>
                                                <Text style={[styles.FairuzBold, styles.text_default, styles.textSize_14, styles.marginHorizontal_5]}>
                                                    {i18n.t('sP')}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress     = {() => toggle('refresh')}
                                            style       = {[styles.rowRight, styles.marginVertical_10]}>
                                            <TouchableOpacity style = {[ styles.marginHorizontal_10, lang !== 'ar' || lang == null ? { marginRight : 0 } : { marginLeft : 0 }  ]}>
                                                <CheckBox
                                                    style           = {[styles.checkBox, styles.Border, styles.bg_default, styles.border_default]}
                                                    color           = {styles.text_gray}
                                                    selectedColor   = {styles.text_orange}
                                                    checked         = {isRefresh}
                                                    onPress         = {() => toggle('refresh')}
                                                />
                                            </TouchableOpacity>
                                            <View style = {[ styles.marginHorizontal_10 , styles.width_40, styles.height_40, styles.bg_dash, styles.Radius_5, styles.flexCenter ]}>
                                                <Image resizeMode={'contain'} source={require('../../assets/image/Orefresh.png')} style={[ styles.width_20, styles.height_20, ]} />
                                            </View>
                                            <View style={[]}>
                                                <Text style={[styles.FairuzBold, styles.text_default, styles.textSize_14, styles.marginHorizontal_5]}>
                                                    {i18n.t('sR')}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[ styles.rowCenter, styles.marginVertical_15]}
                                            onPress={() => toggleModal('map')}>
                                            <Icon
                                                style={[styles.textSize_16 , styles.text_default, styles.marginHorizontal_5]}
                                                type="Fontisto"
                                                name='map-marker-alt'
                                            />
                                            <Text style={[styles.FairuzBold , styles.textSize_16, styles.text_default, styles.textDecoration]}>
                                                {i18n.t('Location')}
                                            </Text>
                                        </TouchableOpacity>

                                        <Modal isVisible={showModalMap} onBackdropPress={() => toggleModal('map')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                                <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                                    <Text style={[styles.FairuzBlack, styles.textSize_14, styles.textCenter, mapErr ? styles.text_red : styles.text_White ]}>
                                                        { nameMap }
                                                    </Text>
                                                </View>

                                                <View style={[ styles.height_400 ]}>

                                                    {
                                                        !initMap && mapRegion.latitude != null ? (
                                                            <MapView
                                                                ref={mapRef}
                                                                style={{width: '100%', height: '100%', flex: 1}}
                                                                initialRegion={mapRegion}>
                                                                <MapView.Marker
                                                                    draggable
                                                                    coordinate={mapRegion}
                                                                    onDragEnd={(e) => _handleMapRegionChange(e.nativeEvent.coordinate)}
                                                                >
                                                                    <Image source={require('../../assets/image/pin.png')}
                                                                           resizeMode={'contain'} style={{width: 35, height: 35}}/>
                                                                </MapView.Marker>
                                                            </MapView>
                                                        ) : (<View/>)
                                                    }

                                                    <TouchableOpacity
                                                        style={[styles.bg_default, styles.width_150, styles.flexCenter, styles.marginVertical_15, styles.height_40, styles.position_A, styles.bottom_10]}
                                                        onPress={() => getLocation()}>
                                                        <Text style={[styles.FairuzNormal , styles.textSize_14, styles.text_White]}>
                                                            {i18n.t('confirm')}
                                                        </Text>
                                                    </TouchableOpacity>

                                                </View>

                                            </View>
                                        </Modal>

                                        <TouchableOpacity
                                            style={[styles.bg_orange, styles.width_200, styles.flexCenter, styles.marginVertical_15, styles.height_50, styles.Radius_5, styles.marginTop_25]}
                                            onPress={() => onSubmit()}>
                                            <Text style={[styles.FairuzNormal , styles.textSize_16, styles.text_White]}>
                                                {i18n.t('sent')}
                                            </Text>
                                        </TouchableOpacity>

                                    </Form>
                                {/*</KeyboardAvoidingView>*/}
                            </View>
                        </View>
                        :
                        <View/>
                }

            </Content>

        </Container>
    );
}

export default EditAdv;
