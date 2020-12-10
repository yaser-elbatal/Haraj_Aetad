import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    RefreshControl,
    Keyboard, BackHandler, FlatList, ActivityIndicator, Platform
} from "react-native";
import { Container, Content, Header, Left, Body, Right, Title, Icon, Toast, Item, Input, CheckBox } from 'native-base'
import styles from '../../assets/style';
import * as Animatable from 'react-native-animatable';
import i18n from "../../locale/i18n";
import * as Permissions from 'expo-permissions';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import Modal from "react-native-modal";
import { getBlogs, allCountries, allCities, countNotifications } from "../actions";
import Loading from "../components/Loading";
import axios from "axios";
import CONST from "../consts";
import { useFocusEffect } from '@react-navigation/native';
import colors from "../consts/colors";
const isIOS = Platform.OS === 'ios';

function Home({ navigation }) {

    const [toggle, setToggle] = useState(false);
    const lang = useSelector(state => state.lang.lang);
    const blog = useSelector(state => state.blog.blog);
    const totalPages = useSelector(state => state.blog.totalPages);
    const countNoty = useSelector(state => state.countN.countNoty);
    const allCity = useSelector(state => state.cities.allCities ? state.cities.allCities : []);
    const countries = useSelector(state => state.countries.countries);
    const [country, setCountry] = useState(i18n.t('choosecountry'));
    const [countryId, setCountryId] = useState(null);
    const [city, setCity] = useState(i18n.t('choosecity'));
    const [cityId, setCityId] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();

    const [upArray, setUpArray] = useState([]);
    const [allId, setAllId] = useState([]);

    const [showModalCountry, setShowModalCountry] = useState(false);
    const [showModalCity, setShowModalCity] = useState(false);
    const [showModalSearch, setShowModalSearch] = useState(false);

    const [textErr, setTextErr] = useState('');
    const [loader, setLoader] = useState(true);
    const [loaderBlogs, setLoaderBlogs] = useState(false);
    const [noScroll, setNoScroll] = useState(true);

    const [exitModel, setExitModel] = useState(false);

    const [nameSearch, setNameSearch] = useState('');
    const [searchStatus, setSearchStatus] = useState(0);
    const [searchValue] = useState(new Animated.Value(0));

    const [statusSearch, setStatusSearch] = useState(0);

    const auth = useSelector(state => state.auth.user ? state.auth.user : null);
    const token = useSelector(state => state.auth.user ? state.auth.user.token : null);

    const [refreshing, setRefreshing] = React.useState(false);
    const [loadMore, setLoadMore] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setPage(1);
        dispatch(getBlogs(lang, cityId, countryId, categoryId, latitude, longitude, 1, keyword)).then(() => setRefreshing(false)).catch(() => setRefreshing(false));
    }, []);

    function fetchData() {
        dispatch(allCountries(lang));
        if (auth) {
            dispatch(countNotifications(token, lang));
        }
        axios.post(`${CONST.url}sub-categories`, {
            category_id: categoryId,
            lang: lang,
        }).then((response) => {

            let data = response.data.data;
            let obj = { id: null, name: i18n.t('all') };
            data.unshift(obj);
            setPage(1);

            setUpArray([...upArray, data]);
            allId.push(categoryId);

        }).catch(err => {
            console.log('err', err);
        });
        dispatch(getBlogs(lang, cityId, countryId, categoryId, latitude, longitude, 1, keyword)).then(() => setLoader(false)).catch(() => setLoader(false));

    }

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
            return () => {
                fetchData();
            };
        }, [navigation])
    );

    useEffect(() => {
        const backAction = () => {
            setExitModel(true);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [navigation]);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        setStatusSearch(1);
    };

    const _keyboardDidHide = () => {
        setStatusSearch(0);
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

        if (type === 'search') {
            setShowModalSearch(!showModalSearch);
            setTextErr('');
            setNameSearch('');
            setSearchStatus(0);
            const toValue = 0;
            Animated.spring(
                searchValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }
    }

    function selectId(type, id, name) {

        if (type === 'country') {
            setLoaderBlogs(true);
            setPage(1);
            setCountryId(id);
            setCountry(name);
            setShowModalCountry(!showModalCountry);
            dispatch(allCities(lang, id));
            const countryId = id;
            dispatch(getBlogs(lang, cityId, countryId, categoryId, latitude, longitude, 1, keyword)).then(() => { setLoaderBlogs(false); }).catch(() => setLoaderBlogs(false));
        }

        if (type === 'city') {
            setLoaderBlogs(true);
            setPage(1);
            setCityId(id);
            setCity(name);
            setShowModalCity(!setShowModalCity);
            const cityId = id;
            dispatch(getBlogs(lang, cityId, countryId, categoryId, latitude, longitude, 1, keyword)).then(() => { setLoaderBlogs(false); }).catch(() => setLoaderBlogs(false));
        }

    }

    function clickToggle() { setToggle(!toggle); }

    function activeInput(type) {
        if (type === 'search' || nameSearch !== '') {
            setSearchStatus(1);
            const toValue = -25;
            Animated.spring(
                searchValue,
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
        if (type === 'search' && nameSearch === '') {
            setSearchStatus(0);
            const toValue = 0;
            Animated.spring(
                searchValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
        }
    }

    const getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            Toast.show({
                text: i18n.translate('locatdese'),
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBlack',
                    textAlign: 'center'
                }
            });
        } else {
            return await Location.getCurrentPositionAsync({
                enableHighAccuracy: false,
                maximumAge: 15000
            }).then((position) => {
                if (latitude === null) {
                    setLoaderBlogs(true);
                    setPage(1);
                    setLongitude(position.coords.longitude);
                    setLatitude(position.coords.latitude);
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    dispatch(getBlogs(lang, cityId, countryId, categoryId, latitude, longitude, 1, keyword)).then(() => { setLoaderBlogs(false); }).catch(() => setLoaderBlogs(false));
                } else {
                    setLoaderBlogs(true);
                    setPage(1);
                    setLongitude(null);
                    setLatitude(null);
                    const latitude = null;
                    const longitude = null;
                    dispatch(getBlogs(lang, cityId, countryId, categoryId, latitude, longitude, 1, keyword)).then(() => { setLoaderBlogs(false); }).catch(() => setLoaderBlogs(false));
                }
            });
        }
    };

    function showUser(pageName) {
        if (auth) {

            navigation.navigate(pageName);

        } else {

            navigation.navigate('login');

            Toast.show({
                text: i18n.t('chickLogin'),
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBlack',
                    textAlign: 'center'
                }
            });

        }
    }

    function onSearch() {
        if (nameSearch !== '') {
            setLoaderBlogs(true);
            setPage(1);
            setShowModalSearch(!showModalSearch);
            setTextErr('');
            setKeyword(nameSearch);
            setSearchStatus(0);
            const toValue = 0;
            Animated.spring(
                searchValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
            const keyword = nameSearch;
            dispatch(getBlogs(lang, cityId, countryId, categoryId, latitude, longitude, 1, keyword)).then(() => { setLoaderBlogs(false); }).catch(() => setLoaderBlogs(false));
        } else {
            setLoaderBlogs(true);
            setPage(1);
            setShowModalSearch(!showModalSearch);
            setKeyword(nameSearch);
            setSearchStatus(0);
            const toValue = 0;
            Animated.spring(
                searchValue,
                {
                    toValue: toValue,
                    velocity: 3,
                    tension: 2,
                    friction: 8,
                }
            ).start();
            const keyword = nameSearch;
            dispatch(getBlogs(lang, cityId, countryId, categoryId, latitude, longitude, 1, keyword)).then(() => { setLoaderBlogs(false); }).catch(() => setLoaderBlogs(false));
        }
    }

    function getCategory(id, i) {

        setCategoryId(id);

        setPage(1);

        setLoaderBlogs(true);

        dispatch(getBlogs(lang, cityId, countryId, id, latitude, longitude, 1, keyword)).then(() => { setLoaderBlogs(false); }).catch(() => setLoaderBlogs(false));

        if (id !== null) {
            axios.post(`${CONST.url}sub-categories`, {
                category_id: id,
                lang: lang,
            }).then((response) => {

                upArray.splice(i + 1, upArray.length);
                setUpArray([...upArray, response.data.data]);

            }).catch(err => {
                console.log('err', err);
            });
        } else {
            upArray.splice(i + 1, upArray.length);
        }

    }

    function noResults() {
        return (
            <View style={[styles.Width_100, styles.bgFullWidth, styles.flexCenter]}>
                <Image style={[styles.width_150, styles.height_150, styles.marginVertical_15]} source={require('../../assets/image/empty.png')} resizeMode={"contain"} />
                <Text style={[styles.text_red, styles.FairuzBold, styles.textSize_16]}>
                    {i18n.t('noAw')}
                </Text>
            </View>
        );
    }

    const renderItem = ({ item, key }) => (
        toggle === true ?
            <View style={[styles.overHidden, styles.flex_50, styles.paddingHorizontal_5]}>
                <Animatable.View animation="fadeInRight" easing="ease-out" delay={item.animation} style={[styles.Width_100]}>
                    <TouchableOpacity onPress={() => navigation.navigate('detailsAdv', { blog_id: item.id })} style={[styles.Width_100, styles.marginVertical_5]}>
                        <View style={[styles.bg_White, styles.Width_100, styles.Border, styles.border_dash, styles.overHidden]}>
                            <View style={[styles.overHidden, styles.position_R, styles.height_130, styles.Width_100]}>
                                <Image
                                    style={[styles.Width_100, styles.height_130]}
                                    source={{ uri: item.icon }}
                                    resizeMode={'stretch'}
                                />
                                <Text style={[styles.FairuzBold, styles.paddingHorizontal_10, styles.text_White, styles.textSize_13, styles.position_A, styles.Width_100, styles.right_0, styles.bottom_0, styles.overlay_black]}>
                                    {item.date}
                                </Text>
                            </View>
                            <View style={[styles.paddingHorizontal_5]}>
                                <View style={[styles.rowGroup]}>
                                    <Text style={[styles.FairuzBold, styles.text_purple, styles.textSize_14]} numberOfLines={1} ellipsizeMode='tail'>
                                        {item.title}
                                    </Text>
                                </View>
                                <View style={[styles.rowGroup, styles.marginVertical_5]}>
                                    <Text style={[styles.FairuzBold, styles.text_red, styles.textSize_13]}>
                                        {item.price}
                                    </Text>
                                </View>
                                <View style={[styles.rowIng]}>
                                    <Icon style={[styles.textSize_10, styles.text_bold_gray]} active type="FontAwesome5" name='map-marker-alt' />
                                    <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                        {item.country} - {item.city}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
            :
            <View style={[styles.overHidden]}>
                <Animatable.View animation="fadeInUp" easing="ease-out" delay={item.animation} style={[styles.Width_100]}>
                    <TouchableOpacity onPress={() => navigation.navigate('detailsAdv', { blog_id: item.id })} style={[styles.Width_100, styles.flexCenter, styles.marginVertical_5]}>
                        <View style={[styles.bg_White, styles.Width_100, styles.rowIng, styles.Border, styles.border_dash, styles.overHidden]}>
                            <View style={[styles.overHidden, styles.flex_30]}>
                                <Image
                                    style={[styles.Width_100, styles.height_100]}
                                    source={{ uri: item.icon }}
                                    resizeMode={'stretch'}
                                />
                            </View>
                            <View style={[styles.flex_70, styles.paddingHorizontal_5]}>
                                <View style={[styles.rowGroup]}>
                                    <Text style={[styles.FairuzBold, styles.text_default, styles.textSize_14, styles.width_100, styles.textDir]} numberOfLines={1} ellipsizeMode='tail'>
                                        {item.title}
                                    </Text>
                                    <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_13]}>
                                        {item.date}
                                    </Text>
                                </View>
                                <View style={[styles.rowGroup, styles.marginVertical_5]}>
                                    <Text style={[styles.FairuzBold, styles.text_red, styles.textSize_13]}>
                                        {item.price}
                                    </Text>
                                </View>
                                <View style={[styles.rowIng]}>
                                    <Icon style={[styles.textSize_10, styles.text_bold_gray]} active type="FontAwesome5" name='map-marker-alt' />
                                    <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                        {item.country} - {item.city}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
    );

    function renderLoader() {
        if (loader) {
            return (
                <Loading />
            );
        }
    }

    function onExit() {
        BackHandler.exitApp();
        setExitModel(false);
    }

    function renderLoaderBlogs() {
        if (loaderBlogs) {
            return (
                <View style={[styles.position_A, styles.bg_White, styles.right_0, styles.top_0, styles.Width_100, styles.height_full, { zIndex: 9999 }]}>
                    <View style={[styles.flexCenter, { top: 70 }]}>
                        <Animatable.Text animation="fadeIn" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center', width: 70, height: 70 }}>
                            <Image
                                style={[styles.width_50, styles.height_50]}
                                source={require('../../assets/image/loading.png')}
                                resizeMode='contain'
                            />
                        </Animatable.Text>
                        <Text style={[styles.FairuzBold, styles.text_default, styles.textSize_16, styles.marginVertical_10]}>
                            {i18n.t('loadIn')}
                        </Text>
                    </View>
                </View>
            );
        }
    }

    function fetchMoreListItems() {

        setPage(page + 1);

        if (totalPages < page){
            setLoadMore(false);
            setNoScroll(true);

            return;
        }

        setLoadMore(true);
        setNoScroll(false);
        newBlogs(page + 1);
    }

    function newBlogs(page) {
        axios.post(`${CONST.url}filter-ads`, {
            lang: lang,
            city_id: cityId,
            country_id: countryId,
            category_id: categoryId,
            latitude: latitude,
            longitude: longitude,
            page: page,
            keyword: keyword,
        }).then((response) => {

            setLoadMore(false);
            setNoScroll(true);

            if (response.data.data.length !== 0) {
                Array.prototype.push.apply(blog, response.data.data);
            } else {
                Toast.show({
                    text: i18n.t('noADV'),
                    type: "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'FairuzBlack',
                        textAlign: 'center'
                    }
                });
            }

        }).catch(err => {
            setLoadMore(false);
            setNoScroll(true);
            setPage(page);
            Toast.show({
                text: i18n.t('errT'),
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'FairuzBlack',
                    textAlign: 'center'
                }
            });
        });
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    };

    return (
        <Container>

            {renderLoader()}

            <Header style={[styles.headerView, styles.bg_default, styles.Width_100, styles.paddingHorizontal_15]}>
                <Left style={[styles.leftIcon,]}>
                    <TouchableOpacity style={[styles.Button]} transparent onPress={() => navigation.openDrawer()}>
                        <Image
                            style={[styles.width_25, styles.height_25]}
                            source={require('../../assets/image/menu.png')}
                        />
                    </TouchableOpacity>
                </Left>
                <Body style={[styles.bodyText]}>
                    <Title style={[styles.FairuzBold, styles.textSize_18, { color: colors.orange },]}>
                        {i18n.t('Sellandrent')}
                    </Title>
                </Body>
                <Right style={[styles.leftIcon,]}>
                    <TouchableOpacity style={[styles.Button, lang === 'en' ? { transform: [{ rotate: "180deg" }] } : null]} transparent onPress={() => toggleModal('search')}>
                        <Image
                            style={[styles.width_20, styles.height_20]}
                            source={require('../../assets/image/search.png')}
                        />
                    </TouchableOpacity>
                    {
                        auth ?
                            <TouchableOpacity style={[styles.Button, styles.position_R, lang === 'en' ? { transform: [{ rotate: "180deg" }] } : null]} transparent onPress={() => showUser('notification')}>
                                <Animatable.View animation={auth && countNoty !== 0 ? 'swing' : null} easing="ease-out" iterationCount="infinite">
                                    <Image
                                        style={{ width: 22, height: 22 }}
                                        source={require('../../assets/image/alarm.png')}
                                        resizeMode='contain'
                                    />
                                </Animatable.View>
                                {
                                    auth && countNoty !== 0 ?
                                        <View style={[styles.position_A, styles.bg_red, styles.Radius_5, styles.width_20, styles.height_20, styles.flexCenter, { top: -10, right: 0 }]}>
                                            <Text style={[styles.text_White, styles.textSize_12, styles.FairuzBold]}>
                                                {countNoty}
                                            </Text>
                                        </View>
                                        :
                                        <View />
                                }
                            </TouchableOpacity>
                            :
                            <View />
                    }
                    <TouchableOpacity style={[styles.Button]} transparent onPress={() => clickToggle()}>
                        <Image
                            style={[styles.width_20, styles.height_20]}
                            source={toggle === true ? require('../../assets/image/list.png') : require('../../assets/image/grid.png')}
                        />
                    </TouchableOpacity>
                </Right>
            </Header>

            <Content
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && !loadMore) {
                        fetchMoreListItems();
                    }
                }}
                scrollEnabled={noScroll}
                contentContainerStyle={[styles.scrollView, styles.bgFullWidth]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>

                {
                    upArray.length !== 0 ?
                        <View style={[styles.paddingVertical_10, styles.borderBottom, styles.border_dash]}>

                            {
                                upArray.map((array, i) => {
                                    return (
                                        array.length !== 0 ?
                                            <View style={[styles.marginVertical_5, styles.mainScroll]} key={i.toString()}>
                                                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>

                                                    {/*<TouchableOpacity*/}
                                                    {/*    onPress={() => getCategory(categoryUpId, i)}*/}
                                                    {/*    style={[ styles.paddingHorizontal_15, styles.Border, styles.paddingVertical_5, styles.marginHorizontal_10, categoryId === categoryUpId ? [ styles.border_default, styles.bg_default ] : [ styles.border_light_gray ] ]}>*/}
                                                    {/*    <Text  style={[ styles.FairuzNormal, styles.textSize_14, categoryId === categoryUpId ? styles.text_White : styles.text_bold_gray]}>*/}
                                                    {/*        { i18n.t('all') }*/}
                                                    {/*    </Text>*/}
                                                    {/*</TouchableOpacity>*/}

                                                    {
                                                        array.map((cate, index) => {
                                                            return (
                                                                <TouchableOpacity
                                                                    key={index.toString()}
                                                                    onPress={() => getCategory(cate.id, i)}
                                                                    style={[styles.paddingHorizontal_15, styles.Border, styles.paddingVertical_5, styles.marginHorizontal_10, categoryId === cate.id ? [styles.border_orange, styles.bg_orange] : [styles.border_light_gray]]}>
                                                                    <Text style={[styles.FairuzNormal, styles.textSize_14, categoryId === cate.id ? styles.text_defaultHarag : styles.text_bold_gray]}>
                                                                        {cate.name}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                        )
                                                    }
                                                </ScrollView>
                                            </View>
                                            :
                                            <View />
                                    )
                                }
                                )
                            }

                        </View>
                        :
                        <View />
                }

                <View style={[styles.rowGroup, styles.paddingHorizontal_5, styles.marginTop_5]}>

                    <View style={[styles.overHidden, styles.flex_33]}>
                        <TouchableOpacity onPress={() => toggleModal('country')} style={[styles.marginVertical_10, styles.Width_100, styles.height_40, styles.paddingHorizontal_5, styles.flexCenter, styles.Border, styles.border_light_gray, { flexDirection: 'row', justifyContent: "space-between" }]}>
                            <Text style={[styles.FairuzNormal, styles.textSize_13, styles.text_bold_gray]}>
                                {country}
                            </Text>
                            <Icon style={[styles.textSize_13, styles.text_bold_gray]} type="AntDesign" name='down' />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.overHidden, styles.flex_33]}>
                        <TouchableOpacity onPress={() => toggleModal('city')} style={[styles.marginVertical_10, styles.Width_100, styles.height_40, styles.paddingHorizontal_5, styles.flexCenter, styles.borderTop, styles.borderBottom, styles.border_light_gray, { flexDirection: 'row', justifyContent: "space-between" }]}>
                            <Text style={[styles.FairuzNormal, styles.textSize_13, styles.text_bold_gray]}>
                                {city}
                            </Text>
                            <Icon style={[styles.textSize_13, styles.text_bold_gray]} type="AntDesign" name='down' />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.overHidden, styles.flex_33]}>
                        <TouchableOpacity onPress={() => { getLocationAsync() }} style={[styles.marginVertical_10, styles.Width_100, styles.height_40, styles.paddingHorizontal_5, styles.rowSpace, styles.Border, latitude ? styles.border_default : styles.border_light_gray]}>
                            <Text style={[styles.FairuzNormal, styles.textSize_13, latitude ? styles.text_default : styles.text_bold_gray]}>
                                {i18n.t('near')}
                            </Text>
                            <Icon style={[styles.textSize_13, latitude ? styles.text_default : styles.text_bold_gray]} type="Ionicons" name='md-paper-plane' />
                        </TouchableOpacity>
                    </View>

                </View>

                <Modal avoidKeyboard={true} isVisible={showModalSearch} onBackdropPress={() => toggleModal('search')} style={[styles.flexCenter, styles.Width_100,]}>
                    <View style={[styles.overHidden, styles.bg_White, styles.Width_100, styles.position_R, styles.top_20]}>

                        <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                            <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter]}>
                                {i18n.t('search')}
                            </Text>
                        </View>

                        <View style={[styles.paddingHorizontal_10, styles.paddingVertical_10]}>

                            <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginVertical_5]}>
                                <Animated.View style={[styles.position_A, styles.left_10, { transform: [{ translateY: searchValue }] }, (searchStatus === 1 ? styles.inActB : styles.unActB)]}>
                                    <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (searchStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                        {i18n.translate('search')}
                                    </Text>
                                </Animated.View>
                                <Item style={[styles.item, styles.position_R]}>
                                    <Input
                                        style={[styles.input, styles.height_50, styles.Border, styles.text_default, (searchStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                        onChangeText={(nameSearch) => setNameSearch(nameSearch)}
                                        onBlur={() => unActiveInput('search')}
                                        onFocus={() => activeInput('search')}
                                        autoFocus={true}
                                    />
                                </Item>
                            </View>

                            <Text style={[styles.FairuzNormal, styles.textCenter, styles.textSize_14, styles.text_red]}>
                                {textErr}
                            </Text>

                            <TouchableOpacity
                                style={[styles.bg_orange, styles.marginVertical_10, styles.width_150, styles.height_45, styles.flexCenter]}
                                onPress={() => onSearch()}
                            >
                                <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                    {i18n.t('search')}
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Modal>

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
                                        <View>
                                            <TouchableOpacity
                                                style={[styles.rowGroup, styles.marginVertical_10]}
                                                onPress={() => selectId('country', null, i18n.t('allcoun'))}
                                            >
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <CheckBox
                                                        style={[styles.checkBox, styles.bg_default, styles.border_default]}
                                                        color={styles.text_White}
                                                        selectedColor={styles.text_White}
                                                        checked={countryId === null}
                                                    />
                                                    <Text style={[styles.FairuzBlack, styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                        {i18n.t('allcoun')}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            {
                                                countries.map((country, index) => {
                                                    return (
                                                        <TouchableOpacity
                                                            key={index.toString()}
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
                                        </View>
                                }
                            </ScrollView>
                        </View>

                    </View>
                </Modal>

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
                                                <View>
                                                    <TouchableOpacity
                                                        style={[styles.rowGroup, styles.marginVertical_10]}
                                                        onPress={() => selectId('city', null, i18n.t('allcit'))}
                                                    >
                                                        <View style={[styles.overHidden, styles.rowRight]}>
                                                            <CheckBox
                                                                style={[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                color={styles.text_White}
                                                                selectedColor={styles.text_White}
                                                                checked={cityId === null}
                                                            />
                                                            <Text style={[styles.FairuzBlack, styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                {i18n.t('allcit')}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    {
                                                        allCity.map((city, index) => {
                                                            return (
                                                                <TouchableOpacity

                                                                    key={index.toString()}
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
                                                </View>
                                        }
                                    </ScrollView>
                                </View>

                            </View>
                        </Modal>
                        :
                        <View />
                }

                <View style={[styles.Width_100, styles.height_full, styles.bgFullWidth, styles.position_R, { paddingBottom: loadMore ? 90 : 50 }]}>

                    {(blog.length === 0) ? noResults() : null}

                    {renderLoaderBlogs()}

                    <View style={[styles.flexCenter, { padding: 0, paddingHorizontal: 5 }]}>

                        <FlatList
                            data={blog}
                            numColumns={toggle === true ? 2 : 1}
                            key={toggle === true ? 2 : 1}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReachedThreshold={isIOS ? .01 : 1}
                            renderItem={renderItem}
                        />

                    </View>

                </View>

                <Modal isVisible={exitModel} style={[styles.bottomCenter, styles.Width_100]}>
                    <View style={[styles.overHidden, styles.bg_White, styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius: 30, borderTopRightRadius: 30 }]}>

                        <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                            <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter]}>
                                {i18n.t('exit2')}
                            </Text>
                        </View>

                        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                            <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15]}>

                                <Animatable.View
                                    animation="rubberBand"
                                    easing="ease-out"
                                    delay={500}
                                    style={[styles.Width_100]}
                                >
                                    <View style={[styles.flexCenter, styles.Width_100, styles.marginVertical_10]}>
                                        <Image
                                            style={[styles.width_100, styles.height_100]}
                                            source={require('../../assets/image/exit3.png')}
                                            resizeMode='contain'
                                        />
                                    </View>
                                </Animatable.View>

                                <Text style={[styles.FairuzBlack, styles.text_red, styles.textSize_14, styles.textCenter, styles.marginVertical_15]}>
                                    {i18n.t('exit')}
                                </Text>

                                <View style={[styles.rowGroup, styles.paddingHorizontal_10]}>
                                    <TouchableOpacity
                                        style={[styles.bg_default, styles.marginVertical_10, styles.width_150, styles.height_50, styles.flexCenter]}
                                        onPress={() => onExit()}
                                    >
                                        <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                            {i18n.t('ok')}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.bg_red, styles.marginVertical_10, styles.width_150, styles.height_50, styles.flexCenter]}
                                        onPress={() => setExitModel(false)}
                                    >
                                        <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                            {i18n.t('cancel')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>

                    </View>
                </Modal>

            </Content>

            {
                loadMore ?
                    <View style={[styles.rowCenter, styles.position_A, styles.bg_White, styles.Width_100, styles.right_0, styles.paddingVertical_10, { bottom: Platform.OS === 'ios' ? 80 : 50 }]}>
                        <ActivityIndicator size="small" color="#2E234D" />
                        <Text style={[styles.textSize_14, styles.text_default, styles.FairuzBold, styles.marginHorizontal_5]}>
                            {i18n.t('loadIn')}
                        </Text>
                    </View>
                    :
                    <View />
            }

        </Container>
    );
}

export default Home;
