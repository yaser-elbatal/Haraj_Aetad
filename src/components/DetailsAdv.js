import React, { useState , useEffect, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Linking,
    Dimensions,
    I18nManager,
    Animated, ActivityIndicator, Share, KeyboardAvoidingView, keyboard
} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Body,
    Right,
    Title,
    Icon,
    CheckBox,
    Toast,
    Item,
    Input, Textarea,
    Form
} from 'native-base'
import styles from '../../assets/style';
import * as Animatable from 'react-native-animatable';
import i18n from "../../locale/i18n";
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSelector, useDispatch } from 'react-redux';
import {
    advDetailes,
    addComment,
    favouriteBlog,
    reportReasons,
    removeComment,
    addAdReport,
    addCommentReport,
    removeAdv,
    refreshAdv,
    inboxChat
} from '../actions';
import Swiper from 'react-native-swiper';

import Modal from "react-native-modal";
import HTML from "react-native-render-html";
import Loading from "../components/Loading";

const allImages = [{
    url: 'https://hrajelshabaka.aait-sa.com/public/storage/images/products/1606997139_1448jpg',
}];

function DetailsAdv({navigation, route}) {

    const scrollViewRef                     = useRef();
    const auth                              = useSelector(state => state.auth.user ? state.auth.user : null);
    const lang                              = useSelector(state => state.lang.lang);
    const dispatch                          = useDispatch();
    const [loader, setLoader]               = useState(true);
    const dataInfo                          = useSelector(state => state.adsDetailes.data);
    const advReasons                        = useSelector(state => state.reasons.advReasons ? state.reasons.advReasons : []);
    const commentReasons                    = useSelector(state => state.reasons.commentReasons ? state.reasons.commentReasons : []);
    const [blogId]                          = useState(route.params.blog_id);

    const [showModalComment, setShowModalComment]                   = useState(false);
    const [moreVal, setmoreVal]                                     = useState(false);
    const [textErr, setTextErr]                                     = useState('');

    const [comment, setComment]                                     = useState('');
    const [commentStatus, setCommentStatus]                         = useState(0);
    const [commentValue]                                            = useState(new Animated.Value(0));

    const [commentId, setCommentId]                                 = useState('');

    const [modelAdvReport, setModelAdvReport]                       = useState(false);
    const [modelAdvComment, setModelAdvComment]                     = useState(false);
    const [modelRemoveComment, setModelRemoveComment]               = useState(false);
    const [modelRemoveAdv, setModelRemoveAdv]                       = useState(false);

    const [index, setIndex]                                         = useState(0);
    const [resetImageByIndex, setResetImageByIndex]                 = useState(0);
    const [isImageViewVisible, setIsImageViewVisible]               = useState(false);

    const [commentReasonId, setCommentReasonId]                     = useState(null);
    const [advReasonId, setAdvReasonId]                             = useState(null);

    const token                               = useSelector(state => state.auth.user ? state.auth.user.token : null);
    const authID                              = useSelector(state => state.auth.user ? state.auth.user.id : null);
    const [favValue, setFavValue]             = useState(false);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(reportReasons( token, lang ));
            dispatch(advDetailes( token, blogId, lang )).then(()=> {setLoader(false);}).catch(()=> setLoader(false));
        });

        return unsubscribe;

    }, [navigation, route]);

    function toggleModal (type, id) {
        if (type === 'comment'){
            setShowModalComment(!showModalComment);
            setTextErr('');
            const toValue   = 0;
            Animated.spring(
                commentValue,
                {
                    toValue         : toValue,
                    velocity        : 3,
                    tension         : 2,
                    friction        : 8,
                }
            ).start();
        }

        if (type === 'advReport'){
            setModelAdvReport(!modelAdvReport);
            setmoreVal(!moreVal);
        }

        if (type === 'advComment'){
            setCommentId(id);
            if (showModalComment === true) {
                setShowModalComment(false);
            }
            setTimeout(() => {
                setModelAdvComment(!modelAdvComment);
            }, 500);
        }

        if (type === 'removeComment'){
            setCommentId(id);
            if (showModalComment) {
                setShowModalComment(false);
            }
            setTimeout(() => {
                setModelRemoveComment(!modelRemoveComment);
                dispatch(advDetailes( token, blogId, lang ));
            }, 500);
        }

        if (type === 'removeAdv'){
            setModelRemoveAdv(!modelRemoveAdv);
            setmoreVal(!moreVal);
        }

    }

    function selectId(type, id) {

        if (type === 'advReport'){
            setAdvReasonId(id);
            setModelAdvReport(!modelAdvReport);
            dispatch(addAdReport( token, id, blogId, lang ));
        }

        if (type === 'advComment'){
            setCommentReasonId(id);
            setModelAdvComment(!modelAdvComment);
            dispatch(addCommentReport( token, id, commentId, lang ));
        }

    }

    function activeInput(type) {
        if (type === 'comment' || comment !== ''){
            setCommentStatus(1);
            const toValue = -45;
            Animated.spring(
                commentValue,
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
        if (type === 'comment' && comment === ''){
            setCommentStatus(0);
            const toValue   = 0;
            Animated.spring(
                commentValue,
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

        if (comment.length <= 0) {
            isError = true;
            msg     = i18n.t('context');
        }
        if (msg !== '') {
            setTextErr(msg)
        }
        return isError;
    };

    function onComment() {
        const err = validate();
        if (!err){
            dispatch(addComment( token, comment, blogId, lang ));
            setTimeout(() => {
                dispatch(advDetailes( token, blogId, lang ));
                setShowModalComment(!showModalComment);
                setTextErr('');
                setComment('');
                setCommentStatus(0);
                const toValue   = 0;
                Animated.spring(
                    commentValue,
                    {
                        toValue         : toValue,
                        velocity        : 3,
                        tension         : 2,
                        friction        : 8,
                    }
                ).start();
            }, 500);
        }
    }

    function onRemoveComment() {
        dispatch(removeComment( token, commentId, lang ));
        setTimeout(() => {
            setModelRemoveComment(!modelRemoveComment);
            dispatch(advDetailes( token, blogId, lang ));
        }, 500);
    }

    function onRemoveAdv() {
        setLoader(true);
        setModelRemoveAdv(!modelRemoveAdv);
        dispatch(removeAdv( token, blogId, lang, navigation )).then(()=> setLoader(false).catch(()=> setLoader(false)));
    }

    const clickToggle = async (type, name , url) => {
        if (type === 'Fav'){
            setLoader(true);
            setFavValue(!favValue);
            setmoreVal(!moreVal);
            dispatch(favouriteBlog(token, blogId, lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
        } else if  (type === 'share') {
            try {
                const result = await Share.share({
                    title: name,
                    message: url,
                });

                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (error) {

            }
        } else if  (type === 'refresh') {
            setLoader(true);
            dispatch(refreshAdv(token, blogId, lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
        } else if (type === 'edit'){
            navigation.navigate('editAdv', { blogId : blogId });
        }
    }

    function openMap(lat,lng){
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios   : `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    }

    function renderLoader(){
        if (loader){
            return(
                <Loading/>
            );
        }
    }

    function more() {
        setmoreVal(!moreVal);
    }

    function zoomImage(i) {
        setIsImageViewVisible(true);
        setResetImageByIndex(i);
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
                        { dataInfo ? dataInfo.ad.title : i18n.t('deadv')}
                    </Title>
                </Body>
                <Right style={[styles.leftIcon]}>
                    {
                        dataInfo ?
                            <TouchableOpacity style={[styles.Button ]} transparent onPress={() => clickToggle('share', dataInfo.ad.title, dataInfo.ad.urlAdv )}>
                                <Image
                                    style={[styles.width_25, styles.width_25]}
                                    source={require('../../assets/image/iconHead/share.png')}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>
                            :
                            <View/>
                    }
                </Right>
            </Header>

            <Content contentContainerStyle={styles.bgFullWidth}>

                <View>
                    {
                        dataInfo ?
                            <View>
                                <View style={[ styles.Width_100, styles.height_230, styles.border_dash, styles.Border, styles.flexCenter, styles.position_R  ]}>

                                    <Swiper
                                        containerStyle      = {[ styles.Width_100, styles.height_230]}
                                        autoplayDelay       = {1.5}
                                        key                 = {dataInfo.ad.images}
                                        autoplayTimeout     = {2}
                                        autoplay            = {true}
                                        autoplayLoop
                                        paginationStyle     = {[styles.paginationStyle]}
                                        dotStyle            = {[styles.bg_dash]}
                                        activeDotStyle      = {[ styles.bg_orange, styles.width_30 ]}
                                    >
                                        {
                                            dataInfo.ad.images.map((slider, i) => {
                                                return (
                                                    <View key={i} style={[ styles.Width_100, styles.height_230 ]}>
                                                        <TouchableOpacity onPress={() => zoomImage(i)}>
                                                            <Image style={[ styles.Width_100, styles.height_230 ]} source={{uri: slider.url}} resizeMode={'stretch'}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
                                    </Swiper>

                                    <Modal
                                        style={[ styles.bg_black ]}
                                        onBackdropPress={() => setIsImageViewVisible(false)}
                                        visible={isImageViewVisible}
                                        transparent={true}
                                        enableImageZoom={true}
                                        enableSwipeDown={true}
                                    >
                                        <ImageViewer
                                            imageUrls={dataInfo.ad.images}
                                            index={resetImageByIndex}
                                        />
                                        <TouchableOpacity
                                            style= {[ styles.bg_red ,styles.marginVertical_10 , styles.width_200, styles.height_50 , styles.flexCenter]}
                                            onPress={() => setIsImageViewVisible(false)}>
                                            <Icon name="close" style={{fontSize:30,color : 'white' }}
                                            />
                                        </TouchableOpacity>
                                    </Modal>


                                    {/*<Modal*/}
                                    {/*    isVisible={isImageViewVisible}*/}
                                    {/*    transparent={true}*/}
                                    {/*    enableImageZoom={true}*/}
                                    {/*    enableSwipeDown={true}*/}
                                    {/*    onBackdropPress={() => setIsImageViewVisible(false)}*/}
                                    {/*    style={[ styles.bottomCenter, styles.Width_100 ]}*/}
                                    {/*>*/}
                                    {/*    <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>*/}

                                    {/*        <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>*/}
                                    {/*            <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>*/}
                                    {/*                {i18n.t('resons')}*/}
                                    {/*            </Text>*/}
                                    {/*        </View>*/}

                                    {/*        <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>*/}

                                    {/*            <ImageViewer*/}
                                    {/*                imageUrls={dataInfo.ad.images}*/}
                                    {/*                index={resetImageByIndex}*/}
                                    {/*                style={[ styles.bg_trans, styles.height_250 ]}*/}
                                    {/*            />*/}
                                    {/*            <TouchableOpacity*/}
                                    {/*                style       = {[ styles.bg_red ,styles.marginVertical_10 , styles.width_200, styles.height_50 , styles.flexCenter]}*/}
                                    {/*                onPress={() => setIsImageViewVisible(false)}*/}
                                    {/*            >*/}
                                    {/*                <Icon name="close" style={[ styles.text_White, styles.textSize_14 ]}/>*/}
                                    {/*            </TouchableOpacity>*/}

                                    {/*        </View>*/}

                                    {/*    </View>*/}
                                    {/*</Modal>*/}

                                    {/*{*/}
                                    {/*    auth !== null ?*/}
                                    {/*        <TouchableOpacity*/}
                                    {/*            style={[styles.Button, styles.position_A, styles.overlay_black, styles.width_40, styles.height_40, styles.flexCenter, styles.right_0, styles.top_0, styles.Radius_0 ]}*/}
                                    {/*            transparent*/}
                                    {/*            onPress={() => clickToggle('Fav')}*/}
                                    {/*        >*/}
                                    {/*            <Image*/}
                                    {/*                style={[styles.width_20, styles.width_20]}*/}
                                    {/*                source={favValue ? require('../../assets/image/icon/heart_red.png') : require('../../assets/image/icon/heart_white.png')}*/}
                                    {/*                resizeMode={'contain'}*/}
                                    {/*            />*/}
                                    {/*        </TouchableOpacity>*/}
                                    {/*        :*/}
                                    {/*        <View/>*/}
                                    {/*}*/}

                                    {/*{*/}
                                    {/*    auth !== null ?*/}
                                    {/*        <TouchableOpacity*/}
                                    {/*            style={[styles.Button, styles.position_A, styles.overlay_black, styles.width_40, styles.height_40, styles.flexCenter, styles.left_0, styles.top_0, styles.Radius_0 ]}*/}
                                    {/*            transparent*/}
                                    {/*            onPress={() => toggleModal('advReport')}*/}
                                    {/*        >*/}
                                    {/*            <Image*/}
                                    {/*                style={[styles.width_20, styles.width_20]}*/}
                                    {/*                source={require('../../assets/image/finish.png')}*/}
                                    {/*                resizeMode={'contain'}*/}
                                    {/*            />*/}
                                    {/*        </TouchableOpacity>*/}
                                    {/*        :*/}
                                    {/*        <View/>*/}
                                    {/*}*/}

                                    <View style={[ styles.rowGroup, styles.Width_100, styles.bottom_0, styles.right_0, styles.position_A, styles.overlay_black, styles.paddingVertical_5, styles.paddingHorizontal_5 ]}>
                                        {
                                            authID !== dataInfo.ad.user.id ?
                                                <TouchableOpacity onPress={() => navigation.navigate('profileUserAdv', { provider_id : dataInfo.ad.user.id, blogId : blogId, id : dataInfo.ad.user.id, rate : dataInfo.ad.user.rate })}>
                                                    <View style={[ styles.rowIng ]}>
                                                        <Image
                                                            style={[styles.width_30, styles.height_30, styles.Radius_30, styles.Border_2, styles.border_White]}
                                                            source={{uri : dataInfo.ad.user.avatar}}
                                                            resizeMode={'contain'}
                                                        />
                                                        <View style={[ styles.SelfCenter ]}>
                                                            <Text style={[ styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.marginHorizontal_5, styles.textLeft ]}>{ dataInfo.ad.user.name }</Text>
                                                            <Text style={[ styles.FairuzBlack, styles.text_orange, styles.textSize_14, styles.marginHorizontal_5, styles.textLeft ]}>
                                                                { dataInfo.ad.price } { i18n.t('ria') }
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <View/>
                                        }
                                        {/*<View style={[ styles.rowIng ]}>*/}
                                        {/*    <Text style={[ styles.FairuzBlack, styles.text_White, styles.textSize_14 ]}>*/}
                                        {/*        { i18n.t('pric') } :*/}
                                        {/*    </Text>*/}
                                        {/*    <Text style={[ styles.FairuzBlack, styles.text_orange, styles.textSize_14, styles.marginHorizontal_5 ]}>*/}
                                        {/*        { dataInfo.ad.price } { i18n.t('ria') }*/}
                                        {/*    </Text>*/}
                                        {/*</View>*/}
                                    </View>

                                </View>

                                <View style={[ styles.paddingHorizontal_10, styles.paddingVertical_20, styles.bg_dash ]}>

                                    <View style={[ styles.paddingVertical_10, styles.bg_White, styles.Radius_10 ]}>
                                        <Modal isVisible={modelAdvReport} onBackdropPress={() => toggleModal('advReport')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                                <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                                    <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>
                                                        {i18n.t('resons')}
                                                    </Text>
                                                </View>

                                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                                    <ScrollView style={{ height : 300, width : '100%' }}>
                                                        {
                                                            advReasons.map((country) => {
                                                                    return (
                                                                        <TouchableOpacity
                                                                            style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                                            onPress             = {() => selectId('advReport', country.id)}
                                                                        >
                                                                            <View style={[styles.overHidden, styles.rowRight]}>
                                                                                <CheckBox
                                                                                    style               = {[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                                    color               = {styles.text_White}
                                                                                    selectedColor       = {styles.text_White}
                                                                                    checked             = {advReasonId === country.id}
                                                                                />
                                                                                <Text style={[styles.FairuzBlack , styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                                    {country.title}
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

                                        {
                                            authID !== dataInfo.ad.user.id ?
                                                <View style={[ styles.rowCenter, styles.Width_100, styles.marginVertical_10 ,styles.paddingHorizontal_10 ]}>

                                                    {
                                                        dataInfo.ad.is_phone === true ?
                                                            <TouchableOpacity
                                                                style       = {[ styles.width_50, styles.height_50, styles.flexCenter, styles.paddingHorizontal_5, styles.Radius_10, styles.marginHorizontal_5,{ backgroundColor : '#00AFF0'} ]}
                                                                onPress     = {() => {Linking.openURL('tel://' + dataInfo.ad.is_phone )}}
                                                            >
                                                                <Image
                                                                    style={[styles.width_20, styles.width_20]}
                                                                    source={require('../../assets/image/icon/phone.png')}
                                                                    resizeMode={'contain'}
                                                                />
                                                            </TouchableOpacity>
                                                            :
                                                            <View/>
                                                    }

                                                    {
                                                        dataInfo.ad.is_phone === true ?
                                                            <TouchableOpacity
                                                                style       = {[ styles.width_50, styles.height_50, styles.flexCenter, styles.paddingHorizontal_5, styles.marginHorizontal_5, styles.Radius_10, { backgroundColor : '#25D366'} ]}
                                                                onPress    = {() => {Linking.openURL('http://api.whatsapp.com/send?phone=' + dataInfo.ad.is_phone)}}
                                                            >
                                                                <Image
                                                                    style={[styles.width_20, styles.width_20]}
                                                                    source={require('../../assets/image/icon/whatsapp.png')}
                                                                    resizeMode={'contain'}
                                                                />
                                                            </TouchableOpacity>
                                                            :
                                                            <View/>
                                                    }

                                                    {
                                                        dataInfo.ad.is_chat === true && auth !== null ?
                                                            <TouchableOpacity
                                                                style       = {[ styles.width_50, styles.height_50, styles.flexCenter, styles.paddingHorizontal_5, styles.marginHorizontal_5, styles.Radius_10, { backgroundColor : '#dd4b39'} ]}
                                                                onPress     = {() => navigation.navigate('chatRoom', { userId : dataInfo.ad.user.id, advId : blogId, image : dataInfo.ad.user.avatar, name : dataInfo.ad.user.name })}
                                                            >
                                                                <Image
                                                                    style={[styles.width_20, styles.width_20]}
                                                                    source={require('../../assets/image/icon/comment.png')}
                                                                    resizeMode={'contain'}
                                                                />
                                                            </TouchableOpacity>
                                                            :
                                                            <View/>
                                                    }

                                                    {
                                                        dataInfo.ad.is_phone !== true && dataInfo.ad.is_chat !== true ?
                                                            <View style={[ styles.bg_red, styles.Width_80, styles.height_50, styles.flexCenter, styles.Radius_5 ]}>
                                                                <Text style={[ styles.text_White, styles.FairuzBold, styles.textSize_16 ]}>{ i18n.t('dont') }</Text>
                                                            </View>
                                                            :
                                                            <View/>
                                                    }

                                                </View>
                                                :
                                                <View/>
                                        }

                                        <View style={[ styles.marginVertical_10, styles.bg_wight, styles.paddingHorizontal_20, styles.paddingVertical_10, styles.Width_100, styles.SelfCenter ]}>

                                            <Text style={[ styles.FairuzBlack, styles.text_black, styles.textSize_14, styles.textDir, styles.marginVertical_5 ]}>
                                                { dataInfo.ad.title }
                                            </Text>

                                            <View style={[ styles.rowIng, styles.Width_100, styles.marginVertical_5 ]}>

                                                <Text style={[ styles.FairuzBlack, styles.text_default, styles.textSize_14, styles.textDir ]}>
                                                    { i18n.t('time') } :
                                                </Text>

                                                <Text style={[ styles.FairuzBlack, styles.text_bold_gray, styles.textSize_14, styles.textDir, styles.marginHorizontal_5 ]}>
                                                    { dataInfo.ad.date }
                                                </Text>

                                            </View>

                                            <View style={[ styles.rowIng, styles.Width_100, styles.marginVertical_5 ]}>

                                                <Text style={[ styles.FairuzBlack, styles.text_black, styles.textSize_14, styles.textDir ]}>
                                                    { i18n.t('numord') } :
                                                </Text>

                                                <Text style={[ styles.FairuzBlack, styles.text_bold_gray, styles.textSize_14, styles.textDir, styles.marginHorizontal_5 ]}>
                                                    { dataInfo.ad.id }
                                                </Text>

                                            </View>

                                            <View style={[ styles.rowIng, styles.Width_100, styles.marginVertical_5 ]}>
                                                <View style={[ styles.rowIng ]}>
                                                    <Icon style={[ styles.textSize_14, styles.text_black, styles.marginHorizontal_5 ]} type="FontAwesome5" name='map-marker-alt'/>
                                                    <Text style={[ styles.FairuzBlack, styles.text_bold_gray, styles.textSize_14, styles.textDir ]}>
                                                        { dataInfo.ad.country }
                                                    </Text>
                                                </View>
                                                <View style={[ styles.rowIng, styles.marginHorizontal_5 ]}>
                                                    <Icon style={[ styles.textSize_14, styles.text_black, styles.marginHorizontal_5 ]} type="FontAwesome5" name='map-marker-alt'/>
                                                    <Text style={[ styles.FairuzBlack, styles.text_bold_gray, styles.textSize_14, styles.textDir ]}>
                                                        { dataInfo.ad.city }
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={[ styles.marginVertical_5 ]}>
                                                <Text style={[ styles.FairuzBlack, styles.text_black, styles.textSize_14, styles.textDir ]}>
                                                    { i18n.t('desc') } : -
                                                </Text>
                                                <View style={[ styles.paddingHorizontal_5 ]}>
                                                    <HTML
                                                        html                  = {dataInfo.ad.description}
                                                        imagesMaxWidth        = {Dimensions.get('window').width}
                                                        baseFontStyle         = {{
                                                            fontSize            : 14,
                                                            fontFamily          : 'FairuzBlack',
                                                            color               : '#959595',
                                                            writingDirection    : I18nManager.isRTL ? 'rtl' : 'ltr'
                                                        }}
                                                    />
                                                </View>
                                            </View>

                                            {
                                                dataInfo.ad.features.length !== 0 ?
                                                    <View style={[ styles.marginVertical_5 ]}>
                                                        <Text style={[ styles.FairuzBlack, styles.text_black, styles.textSize_14, styles.textDir ]}>
                                                            { i18n.t('features') } : -
                                                        </Text>
                                                        <View style={[ styles.paddingHorizontal_5 ]}>
                                                            {
                                                                dataInfo.ad.features.map((feat, i) => {
                                                                    return (
                                                                        <View style={[ styles.rowIng, styles.Width_100 ]}>
                                                                            <Text style={[ styles.FairuzBlack, styles.text_bold_gray, styles.textSize_14, styles.textDir ]}>
                                                                                - {feat.name}
                                                                            </Text>
                                                                            <Text style={[ styles.FairuzBlack, styles.text_black, styles.textSize_14, styles.textDir, styles.marginHorizontal_5 ]}>
                                                                                : {feat.value}
                                                                            </Text>
                                                                        </View>
                                                                    )
                                                                })
                                                            }
                                                        </View>
                                                    </View>
                                                    :
                                                    <View/>
                                            }

                                            <TouchableOpacity
                                                style       = {[ styles.rowCenter, styles.marginVertical_10 ]}
                                                onPress     = {()=> {openMap(dataInfo.ad.latitude , dataInfo.ad.longitude)}}
                                            >
                                                <Icon style={[ styles.textSize_14, styles.text_black, styles.marginHorizontal_5 ]} type="FontAwesome5" name='map-marker-alt'/>
                                                <Text style={[ styles.FairuzBlack, styles.text_red, styles.textSize_14, styles.textDecoration ]}>
                                                    { i18n.t('showmap') }
                                                </Text>
                                            </TouchableOpacity>

                                        </View>

                                        <View style={[ styles.paddingHorizontal_15, styles.paddingVertical_10 ]}>

                                            <Text style={[ styles.FairuzBlack, styles.text_black, styles.textSize_14, styles.textDir ]}>
                                                { i18n.t('comm') } : -
                                            </Text>

                                            {
                                                dataInfo.ad.comments.length !== 0 ?
                                                    dataInfo.ad.comments.slice(Math.max(dataInfo.ad.comments.length - 2 )).map((comment, i) => {
                                                        return (
                                                            <View style={[ styles.bg_wight, styles.Border, styles.boxShadow,styles.paddingVertical_10 ,styles.paddingHorizontal_10, styles.border_dash, styles.marginVertical_15, styles.position_R, styles.marginTop_5 ]}>
                                                                <View style={[ styles.rowGroup, styles.Width_100, styles.marginBottom_5 ]}>
                                                                    <View style={[ styles.rowIng ]}>
                                                                        <Image
                                                                            style={[styles.width_30, styles.height_30, styles.Border, styles.border_orange, styles.Radius_30]}
                                                                            source={{ uri : comment.avatar }}
                                                                        />
                                                                        <Text style={[ styles.FairuzBlack, styles.text_black, styles.textSize_14, styles.textDir, styles.marginHorizontal_5 ]}>
                                                                            {comment.user_name}
                                                                        </Text>
                                                                    </View>
                                                                    <Text style={[ styles.FairuzBlack, styles.text_default_2, styles.textSize_12, styles.textDir, styles.marginHorizontal_5 ]}>
                                                                        {comment.date}
                                                                    </Text>
                                                                </View>
                                                                <View style={[ styles.marginVertical_5 ]}>
                                                                    <Text style={[ styles.FairuzBlack, styles.text_bold_gray, styles.textSize_14, styles.textDir, styles.marginHorizontal_5, styles.marginBottom_10 ]}>
                                                                        {comment.comment}
                                                                    </Text>
                                                                </View>
                                                                <View style={[ styles.position_A, styles.rowIng ,{ bottom : -10, right : 5 } ]}>
                                                                    {
                                                                        auth !== null ?
                                                                            <TouchableOpacity
                                                                                style={[styles.bg_pray, styles.width_35, styles.height_25, styles.flexCenter, styles.marginHorizontal_5]}
                                                                                transparent
                                                                                onPress={() => toggleModal('advComment', comment.id)}
                                                                            >
                                                                                <Image
                                                                                    style={[styles.width_15, styles.height_15]}
                                                                                    source={require('../../assets/image/finish.png')}
                                                                                    resizeMode={'contain'}
                                                                                />
                                                                            </TouchableOpacity>
                                                                            :
                                                                            <View/>
                                                                    }
                                                                    {
                                                                        auth !== null && authID === comment.user_id ?
                                                                            <TouchableOpacity
                                                                                style={[styles.bg_red, styles.width_35, styles.height_25, styles.flexCenter, styles.marginHorizontal_5 ]}
                                                                                transparent
                                                                                onPress={() => toggleModal('removeComment', comment.id)}
                                                                            >
                                                                                <Image
                                                                                    style={[styles.width_15, styles.height_15]}
                                                                                    source={require('../../assets/image/delete.png')}
                                                                                    resizeMode={'contain'}
                                                                                />
                                                                            </TouchableOpacity>
                                                                            :
                                                                            <View/>
                                                                    }

                                                                </View>
                                                            </View>
                                                        )
                                                    })
                                                    :
                                                    <View style={[ styles.marginVertical_40 ]}>
                                                        <Text style={[ styles.FairuzBlack, styles.text_red, styles.textSize_18, styles.textCenter, styles.marginHorizontal_5 ]}>
                                                            { i18n.t('nocomm') }
                                                        </Text>
                                                    </View>
                                            }

                                            {
                                                auth !== null ?
                                                    <View style = {[ styles.flexCenter, styles.marginVertical_10 ]}>
                                                        <Text style={[ styles.FairuzBlack, styles.text_orange, styles.textSize_14 ]}>
                                                            { i18n.t('youCa') }
                                                        </Text>
                                                        <TouchableOpacity onPress={() => toggleModal('comment')}>
                                                            <Text style={[ styles.FairuzBlack, styles.text_default, styles.textSize_14, styles.textDecoration ]}>
                                                                { i18n.t('click') }
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    <View/>
                                            }

                                        </View>

                                        <Modal isVisible={modelAdvComment} onBackdropPress={() => toggleModal('advComment')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                                <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                                    <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>
                                                        {i18n.t('resons')}
                                                    </Text>
                                                </View>

                                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>
                                                    <ScrollView style={{ height : 300, width : '100%' }}>
                                                        {
                                                            commentReasons.map((country) => {
                                                                    return (
                                                                        <TouchableOpacity
                                                                            style               = {[styles.rowGroup, styles.marginVertical_10]}
                                                                            onPress             = {() => selectId('advComment', country.id)}
                                                                        >
                                                                            <View style={[styles.overHidden, styles.rowRight]}>
                                                                                <CheckBox
                                                                                    style               = {[styles.checkBox, styles.bg_default, styles.border_default]}
                                                                                    color               = {styles.text_White}
                                                                                    selectedColor       = {styles.text_White}
                                                                                    checked             = {commentReasonId === country.id}
                                                                                />
                                                                                <Text style={[styles.FairuzBlack , styles.text_default, styles.textSize_16, styles.paddingHorizontal_20]}>
                                                                                    {country.title}
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

                                        <Modal avoidKeyboard={true} isVisible={showModalComment} onBackdropPress={() => toggleModal('comment')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                                <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                                    <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>
                                                        {i18n.t('allcomm')}
                                                    </Text>
                                                </View>

                                                <View style={[ styles.paddingHorizontal_5 ]}>
                                                    <ScrollView style={[ styles.height_300, styles.Width_100 ]} ref={scrollViewRef} onContentSizeChange={(contentWidth, contentHeight)=> {scrollViewRef.current.scrollToEnd({animated: true})}}>

                                                        {
                                                            dataInfo.ad.comments.length !== 0 ?
                                                                dataInfo.ad.comments.map((comment, i) => {
                                                                    return (
                                                                        <View style={[ styles.bg_wight, styles.Border, styles.paddingVertical_10 ,styles.paddingHorizontal_10, styles.border_dash, styles.marginVertical_15, styles.position_R, styles.marginTop_5 ]}>
                                                                            <View style={[ styles.rowGroup, styles.Width_100, styles.marginBottom_5 ]}>
                                                                                <View style={[ styles.rowIng ]}>
                                                                                    <Image
                                                                                        style={[styles.width_30, styles.height_30, styles.Border, styles.border_orange, styles.Radius_30]}
                                                                                        source={{ uri : comment.avatar }}
                                                                                    />
                                                                                    <Text style={[ styles.FairuzBlack, styles.text_black, styles.textSize_14, styles.textDir, styles.marginHorizontal_5 ]}>
                                                                                        {comment.user_name}
                                                                                    </Text>
                                                                                </View>
                                                                                <Text style={[ styles.FairuzBlack, styles.text_red, styles.textSize_12, styles.textDir, styles.marginHorizontal_5 ]}>
                                                                                    {comment.date}
                                                                                </Text>
                                                                            </View>
                                                                            <View style={[ styles.marginVertical_5 ]}>
                                                                                <Text style={[ styles.FairuzBlack, styles.text_bold_gray, styles.textSize_14, styles.textDir, styles.marginHorizontal_5, styles.marginBottom_10 ]}>
                                                                                    {comment.comment}
                                                                                </Text>
                                                                            </View>
                                                                            <View style={[ styles.position_A, styles.rowIng ,{ bottom : -10, right : 5 } ]}>

                                                                                {
                                                                                    auth !== null ?
                                                                                        <TouchableOpacity
                                                                                            style={[styles.bg_pray, styles.width_35, styles.height_25, styles.flexCenter, styles.marginHorizontal_5]}
                                                                                            transparent
                                                                                            onPress={() => toggleModal('advComment', comment.id)}
                                                                                        >
                                                                                            <Image
                                                                                                style={[styles.width_15, styles.height_15]}
                                                                                                source={require('../../assets/image/finish.png')}
                                                                                                resizeMode={'contain'}
                                                                                            />
                                                                                        </TouchableOpacity>
                                                                                        :
                                                                                        <View/>
                                                                                }

                                                                                {
                                                                                    auth !== null && authID === comment.user_id ?
                                                                                        <TouchableOpacity
                                                                                            style={[styles.bg_red, styles.width_35, styles.height_25, styles.flexCenter, styles.marginHorizontal_5 ]}
                                                                                            transparent
                                                                                            onPress={() => toggleModal('removeComment', comment.id)}
                                                                                        >
                                                                                            <Image
                                                                                                style={[styles.width_15, styles.height_15]}
                                                                                                source={require('../../assets/image/delete.png')}
                                                                                                resizeMode={'contain'}
                                                                                            />
                                                                                        </TouchableOpacity>
                                                                                        :
                                                                                        <View/>
                                                                                }
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                })
                                                                :
                                                                <View style={[ styles.marginVertical_40 ]}>
                                                                    <Text style={[ styles.FairuzBlack, styles.text_red, styles.textSize_18, styles.textCenter, styles.marginHorizontal_5 ]}>
                                                                        { i18n.t('nocomm') }
                                                                    </Text>
                                                                </View>
                                                        }
                                                    </ScrollView>
                                                </View>

                                                <View style={[styles.paddingHorizontal_10, styles.paddingVertical_10]}>
                                                    <View style={[styles.position_R, styles.height_90, styles.flexCenter]}>
                                                        <Animated.View style={[styles.position_A, styles.left_10 , {transform: [{translateY: commentValue}]}, (commentStatus === 1 ? styles.inActB : styles.unActB) ]}>
                                                            <Text style={[styles.FairuzNormal, styles.textPlatform14, styles.textDir, (commentStatus === 1 ? styles.text_orange : styles.text_default)]}>
                                                                {i18n.translate('addcomm')}
                                                            </Text>
                                                        </Animated.View>
                                                        <Item style={[styles.item, styles.position_R]}>
                                                            <Textarea
                                                                style={[styles.textArea, styles.height_90, styles.text_default, styles.Radius_5, styles.Border, styles.paddingTop_15 ,(commentStatus === 1 ? styles.border_orange : styles.border_light_gray)]}
                                                                onChangeText={(comment) => setComment(comment)}
                                                                onBlur={() => unActiveInput('comment')}
                                                                onFocus={() => activeInput('comment')}
                                                            />
                                                        </Item>
                                                    </View>


                                                    <Text style={[ styles.FairuzNormal, styles.textCenter, styles.textSize_14, styles.text_red ]}>
                                                        { textErr }
                                                    </Text>

                                                    <TouchableOpacity
                                                        style       = {[ styles.bg_orange ,styles.marginVertical_10 , styles.width_150, styles.height_45 , styles.flexCenter]}
                                                        onPress     = {() => onComment()}
                                                    >
                                                        <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                                            { i18n.t('addcomm') }
                                                        </Text>
                                                    </TouchableOpacity>

                                                </View>

                                            </View>
                                        </Modal>

                                        <Modal isVisible={modelRemoveComment} onBackdropPress={() => toggleModal('removeComment')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                                <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                                    <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>
                                                        {i18n.t('remoComm')}
                                                    </Text>
                                                </View>

                                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                                                    <Text style={[styles.FairuzBlack, styles.text_default, styles.textSize_16, styles.textCenter, styles.marginVertical_10 ]}>
                                                        {i18n.t('reComm')}
                                                    </Text>

                                                    <View style={[ styles.rowGroup, styles.Width_100, styles.paddingHorizontal_30, styles.marginVertical_10, styles.overHidden ]}>

                                                        <TouchableOpacity
                                                            style       = {[ styles.bg_default ,styles.marginVertical_10 , styles.width_120, styles.height_40 , styles.flexCenter]}
                                                            onPress     = {() => onRemoveComment()}
                                                        >
                                                            <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                                                { i18n.t('ok') }
                                                            </Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity
                                                            style       = {[ styles.bg_red ,styles.marginVertical_10 , styles.width_120, styles.height_40 , styles.flexCenter]}
                                                            onPress     = {() => toggleModal('removeComment')}
                                                        >
                                                            <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                                                { i18n.t('cancel') }
                                                            </Text>
                                                        </TouchableOpacity>

                                                    </View>

                                                </View>

                                            </View>
                                        </Modal>

                                        <Modal isVisible={modelRemoveAdv} onBackdropPress={() => toggleModal('removeAdv')} style={[ styles.bottomCenter, styles.Width_100 ]}>
                                            <View style={[styles.overHidden, styles.bg_White , styles.Width_100, styles.position_R, styles.top_20, { borderTopLeftRadius : 30, borderTopRightRadius : 30 }]}>

                                                <View style={[styles.borderBottom, styles.border_light_gray, styles.paddingVertical_15, styles.bg_default]}>
                                                    <Text style={[styles.FairuzBlack, styles.text_White, styles.textSize_14, styles.textCenter ]}>
                                                        {i18n.t('remoAdv')}
                                                    </Text>
                                                </View>

                                                <View style={[styles.paddingHorizontal_10, styles.marginVertical_10]}>

                                                    <Text style={[styles.FairuzBlack, styles.text_default, styles.textSize_16, styles.textCenter, styles.marginVertical_10 ]}>
                                                        {i18n.t('reAdv')}
                                                    </Text>

                                                    <View style={[ styles.rowGroup, styles.Width_100, styles.paddingHorizontal_30, styles.marginVertical_10, styles.overHidden ]}>

                                                        <TouchableOpacity
                                                            style       = {[ styles.bg_default ,styles.marginVertical_10 , styles.width_120, styles.height_40 , styles.flexCenter]}
                                                            onPress     = {() => onRemoveAdv()}
                                                        >
                                                            <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                                                { i18n.t('ok') }
                                                            </Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity
                                                            style       = {[ styles.bg_red ,styles.marginVertical_10 , styles.width_120, styles.height_40 , styles.flexCenter]}
                                                            onPress     = {() => toggleModal('removeAdv')}
                                                        >
                                                            <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_White]}>
                                                                { i18n.t('cancel') }
                                                            </Text>
                                                        </TouchableOpacity>

                                                    </View>

                                                </View>

                                            </View>
                                        </Modal>

                                        <View style={[ styles.paddingHorizontal_10, styles.marginVertical_10 ]}>

                                            <Text style={[ styles.FairuzBlack, styles.text_default, styles.textSize_14, styles.textDir, styles.marginBottom_15, styles.paddingHorizontal_5 ]}>
                                                - { i18n.t('similarads') }
                                            </Text>

                                            {
                                                dataInfo.similerAds.length ?
                                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                                        {
                                                            dataInfo.similerAds.map((blog) => {
                                                                return (
                                                                    <View style={[ styles.overHidden, styles.width_200, styles.paddingHorizontal_5 ]}>
                                                                        <TouchableOpacity onPress={() => navigation.navigate('detailsAdv', { blog_id : blog.id })} style={[ styles.Width_100, styles.marginVertical_5 ]}>
                                                                            <View style={[styles.bg_White, styles.Width_100, styles.Border, styles.border_dash, styles.overHidden ]}>
                                                                                <View style={[ styles.overHidden , styles.position_R, styles.height_130, styles.Width_100]}>
                                                                                    <Image
                                                                                        style={[styles.Width_100, styles.height_130]}
                                                                                        source={{ uri : blog.icon }}
                                                                                    />
                                                                                    <Text style={[styles.FairuzBold , styles.paddingHorizontal_10 ,styles.text_White, styles.textSize_13, styles.position_A, styles.Width_100, styles.right_0, styles.bottom_0, styles.overlay_black]}>
                                                                                        { blog.date }
                                                                                    </Text>
                                                                                </View>
                                                                                <View style={[ styles.paddingHorizontal_5 ]}>
                                                                                    <View style={[ styles.rowGroup ]}>
                                                                                        <Text style={[styles.FairuzBold , styles.text_purple, styles.textSize_14]} numberOfLines={1} ellipsizeMode='tail'>
                                                                                            { blog.title }
                                                                                        </Text>
                                                                                    </View>
                                                                                    <View style={[ styles.rowGroup, styles.marginVertical_5 ]}>
                                                                                        <Text style={[styles.FairuzBold , styles.text_orange, styles.textSize_13]}>
                                                                                            { blog.price }
                                                                                        </Text>
                                                                                    </View>
                                                                                    <View style={[ styles.rowIng ]}>
                                                                                        <Icon style={[styles.textSize_10, styles.text_bold_gray ]} active type="FontAwesome5" name='map-marker-alt'/>
                                                                                        <Text style={[styles.FairuzBold , styles.text_bold_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                                                            { blog.country } - { blog.city }
                                                                                        </Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )}
                                                            )
                                                        }
                                                    </ScrollView>
                                                    :
                                                    <View style={[ styles.height_100, styles.flexCenter, styles.Width_100 ]}>
                                                        <Text style={[ styles.FairuzBlack, styles.text_red, styles.textSize_16 ]}>
                                                            { i18n.t('noAdv') }
                                                        </Text>
                                                    </View>
                                            }

                                        </View>
                                    </View>

                                </View>
                            </View>
                            :
                            <Animatable.View animation="zoomIn" easing="ease-out" delay={500} style={[styles.Width_100]}>
                                <View style={[ styles.flexCenter, styles.height_full ]}>
                                    <Image
                                        style={[styles.width_150, styles.height_150 ]}
                                        source={require('../../assets/image/empty.png')}
                                        resizeMode='contain'
                                    />
                                </View>
                            </Animatable.View>
                    }
                </View>

            </Content>

            {
                dataInfo ?
                    <View>
                        {
                            moreVal ?
                                <View style={[ styles.bg_dash, styles.paddingVertical_10, styles.paddingHorizontal_10, styles.position_A, styles.Radius_5 ,{ right : 20, bottom : 110 } ]}>
                                    {
                                        authID === dataInfo.ad.user.id ?
                                            <View style={[ styles.Width_100, styles.marginVertical_5 ]}>
                                                <TouchableOpacity
                                                    onPress={() => clickToggle('edit')}
                                                    style={[ styles.flexCenter, styles.bg_pray, styles.width_40, styles.height_40, styles.Radius_5 ]}>
                                                    <Icon style={[ styles.textSize_20, styles.text_White]} type="MaterialIcons" name='edit' />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View/>
                                    }
                                    {
                                        authID === dataInfo.ad.user.id ?
                                            <View style={[ styles.Width_100, styles.marginVertical_5 ]}>
                                                <TouchableOpacity
                                                    onPress={() => clickToggle('refresh')}
                                                    style={[ styles.flexCenter, styles.bg_green, styles.width_40, styles.height_40, styles.Radius_5 ]}>
                                                    <Icon style={[ styles.textSize_20, styles.text_White ]} type="SimpleLineIcons" name='refresh' />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View/>
                                    }
                                    <View style={[ styles.Width_100, styles.marginVertical_5 ]}>
                                        <TouchableOpacity
                                            onPress={() => clickToggle('Fav')}
                                            style={[ styles.flexCenter, styles.bg_White, styles.width_40, styles.height_40, styles.Radius_5 ]}>
                                            <Icon style={[ styles.textSize_20, favValue || dataInfo.ad.isFav ? styles.text_red : styles.text_black ]} type="FontAwesome" name={favValue || dataInfo.ad.isFav ? 'heart' : 'heart-o'}/>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        authID !== dataInfo.ad.user.id ?
                                            <View style={[ styles.Width_100, styles.marginVertical_5 ]}>
                                                <TouchableOpacity
                                                    onPress={() => toggleModal('advReport')}
                                                    style={[ styles.flexCenter, styles.bg_turquoise, styles.width_40, styles.height_40, styles.Radius_5 ]}>
                                                    <Icon style={[ styles.textSize_20, styles.text_White ]} type="FontAwesome" name='flag' />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View/>
                                    }
                                    {
                                        authID === dataInfo.ad.user.id ?
                                            <View style={[ styles.Width_100, styles.marginVertical_5 ]}>
                                                <TouchableOpacity
                                                    onPress={() => toggleModal('removeAdv')}
                                                    style={[ styles.flexCenter, styles.bg_red, styles.width_40, styles.height_40, styles.Radius_5 ]}>
                                                    <Icon style={[ styles.textSize_20, styles.text_White ]} type="FontAwesome" name='trash' />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View/>
                                    }
                                </View>
                                :
                                <View/>
                        }
                        {
                            auth !== null ?
                                <TouchableOpacity
                                    onPress={() => more()}
                                    style={[ styles.flexCenter, styles.bg_red, styles.width_60, styles.height_60, styles.Radius_50, styles.position_A, styles.bottom_35, styles.right_20 ]}>
                                    <Icon style={[ styles.textSize_30, styles.text_White ]} type="Feather" name='more-horizontal' />
                                </TouchableOpacity>
                                :
                                <View/>
                        }
                    </View>
                    :
                    <View/>
            }

        </Container>
    );
}

export default DetailsAdv;
