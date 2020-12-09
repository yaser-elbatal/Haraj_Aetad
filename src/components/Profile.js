import React, { useState , useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Right,
    Body,
    Title,
    CheckBox,
    Form,
    Item,
    Input,
    Icon, Toast, Textarea
} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import { useSelector, useDispatch } from 'react-redux';
import {advUser, advFavorites, advLastSeen, allChat,} from '../actions';
import StarRating from 'react-native-star-rating';

import ItemsAdv from '../components/ItemsAdvUser'

function Profile({navigation}) {

    const lang                                  = useSelector(state => state.lang.lang);
    const userDate                              = useSelector(state => state.auth.user ? state.auth.user : null);
    const advData                               = useSelector(state => state.userAds.advData ? state.userAds.advData : []);
    const advPhotoData                          = useSelector(state => state.userAds.advPhotoData ? state.userAds.advPhotoData : []);
    const advSeenData                           = useSelector(state => state.userAds.advSeenData ? state.userAds.advSeenData : []);
    const advFavData                            = useSelector(state => state.userAds.advFavData ? state.userAds.advFavData : []);
    const token                                 = useSelector(state => state.auth.user ? state.auth.user.token : null);
    const [active, setActive]                   = useState(1);
    const [loaderBlogs, setLoaderBlogs]         = useState(true);
    const dispatch                              = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(advUser(lang, token)).then(()=> {setLoaderBlogs(false);}).catch(()=> setLoaderBlogs(false));
        });

        return unsubscribe;
    }, [navigation]);

    function setAct(num) {
        setActive(num);
        setLoaderBlogs(true);
        if (num === 1){
            dispatch(advUser(lang, token)).then(()=> {setLoaderBlogs(false)}).catch(()=> setLoaderBlogs(false));
        } else if (num === 2) {
            dispatch(advUser(lang, token)).then(()=> {setLoaderBlogs(false)}).catch(()=> setLoaderBlogs(false));
        } else if (num === 3){
            dispatch(advFavorites(lang, token)).then(()=> {setLoaderBlogs(false)}).catch(()=> setLoaderBlogs(false));
        } else if (num === 4){
            dispatch(advLastSeen(lang, token)).then(()=> {setLoaderBlogs(false)}).catch(()=> setLoaderBlogs(false));
        }
    }

    function renderLoaderBlogs() {
        if (loaderBlogs) {
            return (
                <View style={[styles.position_A, styles.bg_White, styles.flexCenter, styles.right_0, styles.top_0, styles.Width_100, styles.height_full, styles.bgFullWidth,{ zIndex: 9999 }]}>
                    <View style={[ styles.flexCenter ]}>
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
                        { i18n.t('profile') }
                    </Title>
                </Body>
                <Right style={[styles.leftIcon]}>
                    <TouchableOpacity style={[styles.Button ]} transparent onPress={() => navigation.navigate('editProfile')}>
                        <Image
                            style={[styles.width_25, styles.width_25]}
                            source={require('../../assets/image/edit.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </Right>
            </Header>

            <Content contentContainerStyle={styles.bgFullWidth}>

                <View style={[ styles.marginVertical_10 ]}>

                    <View style={[ styles.rowGroup, styles.paddingHorizontal_5, styles.paddingVertical_10 ]}>
                        <View style={[ styles.overHidden ]}>
                            <View style={[ styles.Width_100, styles.flexCenter, styles.marginVertical_5 ]}>
                                <View style={[styles.bg_White, styles.Width_100, styles.rowIng, styles.Border, styles.border_dash, styles.overHidden ]}>
                                    <View style={[ styles.overHidden, styles.flex_30 ]}>
                                        <Image
                                            style={[styles.Width_100, styles.height_100]}
                                            source={{ uri : userDate.avatar }}
                                        />
                                    </View>
                                    <View style={[ styles.flex_70, styles.paddingHorizontal_5 ]}>
                                        <View style={[ styles.rowGroup ]}>
                                            <Text style={[styles.FairuzBold , styles.text_default, styles.textSize_14, styles.textDir]} numberOfLines={1} ellipsizeMode='tail'>
                                                { userDate.name }
                                            </Text>
                                            <View style={[styles.flexCenter]}>
                                                <StarRating
                                                    emptyStar       = {'ios-star-outline'}
                                                    fullStar        = {'ios-star'}
                                                    halfStar        = {'ios-star-half'}
                                                    iconSet         = {'Ionicons'}
                                                    maxStars        = {5}
                                                    starSize        = {15}
                                                    rating          = {userDate.rate}
                                                    fullStarColor   = {'#DAA520'}
                                                    starStyle       = {styles.starStyle}
                                                />
                                            </View>
                                        </View>
                                        <View style={[ styles.rowIng ]}>
                                            <Icon style={[styles.textSize_10, styles.text_bold_gray ]} active type="FontAwesome5" name='phone'/>
                                            <Text style={[styles.FairuzBold , styles.text_bold_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                { userDate.phone }
                                            </Text>
                                        </View>
                                        <View style={[ styles.rowIng ]}>
                                            <Icon style={[styles.textSize_10, styles.text_bold_gray ]} active type="MaterialCommunityIcons" name='email'/>
                                            <Text style={[styles.FairuzBold , styles.text_bold_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                { userDate.email }
                                            </Text>
                                        </View>
                                        <View style={[ styles.rowIng ]}>
                                            <Icon style={[styles.textSize_10, styles.text_bold_gray ]} active type="FontAwesome5" name='map-marker-alt'/>
                                            <Text style={[styles.FairuzBold , styles.text_bold_gray, styles.textSize_13, styles.marginHorizontal_5]}>
                                                { userDate.country } - { userDate.city }
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[ styles.rowGroup, styles.Width_100, styles.paddingHorizontal_5 ]}>
                        <View style={[ styles.flex_50, styles.paddingHorizontal_5 ]}>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('updatePhone')}
                                style={[ styles.Radius_5, styles.Width_100, styles.flexCenter, styles.height_40 ,styles.bg_orange ]}
                            >
                                <Text style={[styles.FairuzBlack, styles.textPlatform12, styles.text_White, styles.textCenter]}>
                                    {i18n.translate('changephon')}
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={[ styles.flex_50, styles.paddingHorizontal_5 ]}>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('updateEmail')}
                                style={[ styles.Radius_5, styles.Width_100, styles.flexCenter, styles.height_40 ,styles.bg_orange ]}
                            >
                                <Text style={[styles.FairuzBlack, styles.textPlatform12, styles.text_White, styles.textCenter]}>
                                    {i18n.translate('chnemail')}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={[ styles.rowGroup, styles.bg_dash, styles.paddingVertical_15, styles.marginVertical_20 ]}>
                        <TouchableOpacity
                            onPress = {() => setAct(1)}
                            style={[ styles.flex_25, styles.flexCenter ]}
                        >
                            <Image
                                source={active === 1 ?
                                    require('../../assets/image/iconTap/marketing_yellow.png')
                                    :
                                    require('../../assets/image/iconTap/marketing_yellow_brbul.png')}
                                style={[styles.width_30, styles.height_30]}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => setAct(2)}
                            style={[ styles.flex_25, styles.flexCenter ]}
                        >
                            <Image
                                source={active === 2 ?
                                    require('../../assets/image/iconTap/Advertising.png')
                                    :
                                    require('../../assets/image/iconTap/Advertising_brbul.png')}
                                style={[styles.width_30, styles.height_30]}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => setAct(3)}
                            style={[ styles.flex_25, styles.flexCenter ]}
                        >
                            <Image
                                source={active === 3 ?
                                    require('../../assets/image/iconTap/heart_gray.png')
                                    :
                                    require('../../assets/image/iconTap/heart_gray_bruble.png')}
                                style={[styles.width_30, styles.height_30]}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => setAct(4)}
                            style={[ styles.flex_25, styles.flexCenter ]}
                        >
                            <Image
                                source={active === 4 ?
                                    require('../../assets/image/iconTap/last_seen.png')
                                    :
                                    require('../../assets/image/iconTap/last_seen_burbel.png')}
                                style={[styles.width_30, styles.height_30]}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={[ styles.flexCenter, styles.position_R, styles.Width_100, styles.bgFullWidth ]}>

                        { renderLoaderBlogs() }

                        {
                            active === 1 ?
                            <ItemsAdv item={advData} navigation={navigation} value={'advData'} />
                            : active === 2 ?
                            <ItemsAdv item={advPhotoData} navigation={navigation} value={'advPhotoData'} />
                            : active === 3 ?
                            <ItemsAdv item={advFavData} navigation={navigation} value={'advFavData'} />
                            : active === 4 ?
                            <ItemsAdv item={advSeenData} navigation={navigation} value={'advSeenData'} />
                            :
                            <View/>
                        }

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Profile;
