import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar, I18nManager, Switch, Linking, Platform } from 'react-native';
import { Icon, Toast } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';
import styles from '../../assets/style';
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import { social, authLogout, notifyStatus, countChat, profileData } from '../actions';


import Home from "../components/Home";
import Language from "../components/Language";
import Notification from "../components/Notification";
import About from "../components/About";
import Register from "../components/Register";
import Login from "../components/Login";
import ForgetPassword from "../components/ForgetPassword";
import ActiveAccount from "../components/ActiveAccount";
import Terms from "../components/Terms";
import InitScreen from "../components/InitScreen";
import Questions from "../components/Questions";
import ChangePassword from "../components/ChangePassword";
import NewPassword from "../components/NewPassword";
import UpdateEmail from "../components/UpdateEmail";
import UpdatePhone from "../components/UpdatePhone";
import CallUs from "../components/CallUs";
import ItemsAdvUser from "../components/ItemsAdvUser";
import ProfileUserAdv from "../components/ProfileUserAdv";
import ListFilter from "../components/ListFilter";
import Commission from "../components/Commission";
import Profile from "../components/Profile";
import Loading from "../components/Loading";
import Category from "../components/Category";
import AddTransfer from "../components/AddTransfer";
import EditProfile from "../components/EditProfile";
import PhotoAdv from "../components/PhotoAdv";
import AddAdv from "../components/AddAdv";
import ChooseCategory from "../components/ChooseCategory";
import EditAdv from "../components/EditAdv";
import ChooseSubCategory from "../components/ChooseSubCategory";
import ImageBrowserScreen from "../components/ImageBrowserScreen";
import Chat from "../components/Chat";
import ChatRoom from "../components/ChatRoom";
import UpdateSetUser from "../components/UpdateSetUser";
import UploadPhotoAdv from "../components/UploadPhotoAdv";
import DetailsAdv from "../components/DetailsAdv";
import ChooseAdv from "../components/ChooseAdv";
import TermsAdv from "../components/TermsAdv";

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const CommonStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();


function CustomDrawerContent(props) {

    const lang = useSelector(state => state.lang.lang);
    const dispatch = useDispatch();
    const follower = useSelector(state => state.article.social ? state.article.social : '');
    const token = useSelector(state => state.auth.user ? state.auth.user.token : null);
    const auth = useSelector(state => state.auth.user ? state.auth.user : null);

    const [isSwitchOnValue, setIsSwitchOnValue] = useState(auth ? auth.is_notify : false);

    function logoutFunc() {
        dispatch(authLogout(lang));
        props.navigation.navigate('commonStack', { screen: 'login' });
    }

    function toggle(value) {
        if (auth) {
            dispatch(notifyStatus(lang, token)).then(() => {
                const data = { lang, token };
                dispatch(profileData(data));
            });
            setIsSwitchOnValue(value);
        } else {
            props.navigation.navigate('commonStack', { screen: 'login' });
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

    function callFun() {
        dispatch(social(lang));
    }

    useEffect(() => {
        callFun();
    }, []);

    return (
        <DrawerContentScrollView {...props} style={[styles.bg_White, styles.bgFullWidth]}>

            <View style={[styles.bg_default, styles.position_A, styles.Width_100, styles.height_70, styles.top_0, styles.right_0]} />

            <View style={[styles.bg_default, styles.paddingVertical_10]}>

                <TouchableOpacity
                    style={[styles.position_A, styles.top_0, styles.right_0, styles.width_40, styles.height_40, styles.flexCenter, styles.bg_White]}
                    onPress={() => props.navigation.closeDrawer()}
                >
                    <Icon style={[styles.text_default, styles.textSize_20]} type="AntDesign" name='close' />
                </TouchableOpacity>

                {
                    auth ?
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('commonStack', { screen: 'profile', navigation: props.navigation })}
                            style={[styles.flexCenter, styles.marginVertical_10]}
                        >
                            <Image
                                style={[styles.width_70, styles.height_70, styles.Radius_10, styles.Border, styles.border_White]}
                                source={{ uri: auth.avatar }}
                            />
                            <Text style={[styles.FairuzBold, styles.text_White, styles.textSize_15, styles.marginVertical_10]}>
                                {auth.name}
                            </Text>
                        </TouchableOpacity>
                        :
                        <View style={[styles.flexCenter]}>
                            <Text style={[styles.FairuzBold, styles.textSize_16, styles.text_White, styles.marginVertical_10]}>
                                {i18n.t('log')}
                            </Text>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('commonStack', { screen: 'login' })}
                                style={[styles.bg_White, styles.width_150, styles.flexCenter, styles.height_50, styles.marginVertical_20, styles.Radius_5]}
                            >
                                <Text style={[styles.FairuzBold, styles.textSize_15, styles.text_black]}>
                                    {i18n.t('login')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                }

            </View>

            <View style={[styles.bgFullWidth]}>

                <View>
                    <View style={[styles.bg_wight, styles.rowGroup, styles.paddingVertical_15, styles.paddingHorizontal_20, styles.borderBottom, styles.border_dash]}>

                        <View>
                            <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_15, styles.textDir]}>
                                {i18n.t('Notifications')}
                            </Text>
                        </View>

                        <View>
                            <Switch
                                onValueChange={(value) => toggle(value)}
                                style={styles.switch}
                                value={isSwitchOnValue}
                                trackColor={{ true: COLORS.default, false: '#ddd' }}
                                thumbColor={['#fff']}
                            />
                        </View>

                    </View>

                    <View style={[styles.bg_White, styles.bgFullWidth]}>
                        {/*<DrawerItemList {...props} />*/}

                        <DrawerItem
                            style={[styles.border_dash, styles.borderBottom, styles.Radius_0, styles.Width_100, { marginLeft: 0, paddingRight: 0, paddingLeft: 0, marginRight: 0 }]}
                            label={
                                ({ focused, color }) => {
                                    return (
                                        <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_15, styles.textDir]}>{i18n.t('home')}</Text>
                                    )
                                }
                            }
                            icon={({ color, size }) => (
                                <Image
                                    style={[styles.width_20, styles.height_20, styles.left_15]}
                                    source={require('../../assets/image/icon/home.png')}
                                />
                            )}
                            onPress={() => props.navigation.navigate('commonStack', {
                                screen: 'home',
                            })}
                        />
                        <DrawerItem
                            style={[styles.border_dash, styles.borderBottom, styles.Radius_0, styles.Width_100, { marginLeft: 0, paddingRight: 0, paddingLeft: 0, marginRight: 0 }]}
                            label={
                                ({ focused, color }) => {
                                    return (
                                        <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_15, styles.textDir]}>{i18n.t('about')}</Text>
                                    )
                                }
                            }
                            icon={({ color, size }) => (
                                <Image
                                    style={[styles.width_20, styles.height_20, styles.left_15]}
                                    source={require('../../assets/image/icon/info2.png')}
                                />
                            )}
                            onPress={() => props.navigation.navigate('commonStack', {
                                screen: 'about',
                            })}
                        />
                        <DrawerItem
                            style={[styles.border_dash, styles.borderBottom, styles.Radius_0, styles.Width_100, { marginLeft: 0, paddingRight: 0, paddingLeft: 0, marginRight: 0 }]}
                            label={
                                ({ focused, color }) => {
                                    return (
                                        <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_15, styles.textDir]}>{i18n.t('terms')}</Text>
                                    )
                                }
                            }
                            icon={({ color, size }) => (
                                <Image
                                    style={[styles.width_20, styles.height_20, styles.left_15]}
                                    source={require('../../assets/image/icon/terms.png')}
                                />
                            )}
                            onPress={() => props.navigation.navigate('commonStack', {
                                screen: 'terms',
                            })}
                        />
                        {
                            auth ?
                                <DrawerItem
                                    style={[styles.border_dash, styles.borderBottom, styles.Radius_0, styles.Width_100, { marginLeft: 0, paddingRight: 0, paddingLeft: 0, marginRight: 0 }]}
                                    label={
                                        ({ focused, color }) => {
                                            return (
                                                <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_15, styles.textDir]}>{i18n.t('commission')}</Text>
                                            )
                                        }
                                    }
                                    icon={({ color, size }) => (
                                        <Image
                                            style={[styles.width_20, styles.height_20, styles.left_15]}
                                            source={require('../../assets/image/icon/money.png')}
                                        />
                                    )}
                                    onPress={() => props.navigation.navigate('commonStack', {
                                        screen: 'commission',
                                    })}
                                />
                                :
                                <View />
                        }
                        <DrawerItem
                            style={[styles.border_dash, styles.borderBottom, styles.Radius_0, styles.Width_100, { marginLeft: 0, paddingRight: 0, paddingLeft: 0, marginRight: 0 }]}
                            label={
                                ({ focused, color }) => {
                                    return (
                                        <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_15, styles.textDir]}>{i18n.t('contact')}</Text>
                                    )
                                }
                            }
                            icon={({ color, size }) => (
                                <Image
                                    style={[styles.width_20, styles.height_20, styles.left_15]}
                                    source={require('../../assets/image/icon/contact.png')}
                                />
                            )}
                            onPress={() => props.navigation.navigate('commonStack', {
                                screen: 'callUs',
                            })}
                        />
                        <DrawerItem
                            style={[styles.border_dash, styles.borderBottom, styles.Radius_0, styles.Width_100, { marginLeft: 0, paddingRight: 0, paddingLeft: 0, marginRight: 0 }]}
                            label={
                                ({ focused, color }) => {
                                    return (
                                        <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_15, styles.textDir]}>{i18n.t('lang')}</Text>
                                    )
                                }
                            }
                            icon={({ color, size }) => (
                                <Image
                                    style={[styles.width_20, styles.height_20, styles.left_15]}
                                    source={require('../../assets/image/icon/global.png')}
                                />
                            )}
                            onPress={() => props.navigation.navigate('commonStack', {
                                screen: 'language',
                            })}
                        />
                        {
                            auth ?
                                <DrawerItem
                                    style={[styles.Radius_0, styles.Width_100, { marginLeft: 0, paddingRight: 0, paddingLeft: 0, marginRight: 0 }]}
                                    label={
                                        ({ focused, color }) => {
                                            return (
                                                <Text style={[styles.FairuzBold, styles.text_bold_gray, styles.textSize_15, styles.textDir]}>{i18n.t('logout')}</Text>
                                            )
                                        }
                                    }
                                    icon={({ color, size }) => (
                                        <Image
                                            style={[styles.width_20, styles.height_20, styles.left_15]}
                                            source={require('../../assets/image/icon/logout2.png')}
                                        />
                                    )}
                                    onPress={() => logoutFunc()}
                                />
                                :
                                <View />
                        }
                    </View>
                </View>

            </View>

            <View style={[styles.Width_100]}>
                <View style={[styles.bg_wight, styles.rowGroup, styles.paddingVertical_20, styles.paddingHorizontal_15, styles.marginVertical_10, styles.borderBottom, styles.borderTop, styles.border_dash, styles.Width_100]}>

                    <TouchableOpacity onPress={() => { Linking.openURL(follower.facebook) }}>
                        <View style={[styles.overHidden]}>
                            <View style={[styles.width_40, styles.height_40, styles.Radius_50, styles.flexCenter, styles.marginVertical_5, { backgroundColor: '#3b5999' }]}>
                                <Icon style={[styles.text_White, styles.textSize_20]} type="Feather" name='facebook' />
                            </View>
                            <Text style={[styles.FairuzBold, styles.textSize_13, styles.text_black]}>{i18n.t('facebook')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL(follower.youtube) }}>
                        <View style={[styles.overHidden]}>
                            <View style={[styles.width_40, styles.height_40, styles.Radius_50, styles.flexCenter, styles.marginVertical_5, { backgroundColor: '#cd201f' }]}>
                                <Icon style={[styles.text_White, styles.textSize_20]} type="Feather" name='youtube' />
                            </View>
                            <Text style={[styles.FairuzBold, styles.textSize_13, styles.text_black]}>{i18n.t('youtube')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL(follower.instagram) }}>
                        <View style={[styles.overHidden]}>
                            <View style={[styles.width_40, styles.height_40, styles.Radius_50, styles.flexCenter, styles.marginVertical_5, { backgroundColor: '#e4405f' }]}>
                                <Icon style={[styles.text_White, styles.textSize_20]} type="Feather" name='instagram' />
                            </View>
                            <Text style={[styles.FairuzBold, styles.textSize_13, styles.text_black]}>{i18n.t('instagram')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL(follower.twitter) }}>
                        <View style={[styles.overHidden]}>
                            <View style={[styles.width_40, styles.height_40, styles.Radius_50, styles.flexCenter, styles.marginVertical_5, { backgroundColor: '#55acee' }]}>
                                <Icon style={[styles.text_White, styles.textSize_20]} type="Feather" name='twitter' />
                            </View>
                            <Text style={[styles.FairuzBold, styles.textSize_13, styles.text_black]}>{i18n.t('twitter')}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </DrawerContentScrollView>
    );

}

function TabsScreen() {

    const dispatch = useDispatch();
    const lang = useSelector(state => state.lang.lang);
    const auth = useSelector(state => state.auth.user ? state.auth.user : null);
    const countCon = useSelector(state => state.count.countChat);
    const token = useSelector(state => state.auth.user ? state.auth.user.token : null);

    function fetchData() {
        if (auth) {
            dispatch(countChat(token, lang));
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (

        <Tabs.Navigator
            initialRouteName="login"
            tabBarOptions={{
                activeTintColor: COLORS.default,
                showLabel: false,
                style: styles.footerStyle,
                tabBarVisible: auth ? true : false,
            }}
        >

            <Tabs.Screen
                name="home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <View style={[color === COLORS.default ? styles.bg_orange : styles.bg_White, styles.width_70, styles.height_50, styles.flexCenter]}>
                            <Image source={color === COLORS.default ? require('../../assets/image/iconTap/home.png') : require('../../assets/image/iconTap/home_gray.png')} style={[styles.width_25, styles.height_25]} resizeMode={'contain'} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name={'Category'}
                component={Category}
                options={{
                    tabBarLabel: 'Category',
                    tabBarIcon: ({ color, size }) => (
                        <View style={[color === COLORS.default ? styles.bg_orange : styles.bg_White, styles.width_70, styles.height_50, styles.flexCenter]}>
                            <Image source={color === COLORS.default ? require('../../assets/image/iconTap/menu.png') : require('../../assets/image/iconTap/menu_gray.png')} style={[styles.width_25, styles.height_25]} resizeMode={'contain'} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name={'ChooseAdv'}
                component={auth ? ChooseAdv : Login}
                options={{
                    tabBarLabel: 'ChooseAdv',
                    tabBarVisible: auth ? true : false,
                    tabBarIcon: ({ color, size }) => (
                        <View style={[color === COLORS.default ? styles.bg_orange : styles.bg_White, styles.width_70, styles.height_50, styles.flexCenter]}>
                            <Image source={color === COLORS.default ? require('../../assets/image/iconTap/plus.png') : require('../../assets/image/iconTap/plus_gray.png')} style={[styles.width_25, styles.height_25]} resizeMode={'contain'} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name={'PhotoAdv'}
                component={PhotoAdv}
                options={{
                    tabBarLabel: 'PhotoAdv',
                    tabBarIcon: ({ color, size }) => (
                        <View style={[color === COLORS.default ? styles.bg_orange : styles.bg_White, styles.width_70, styles.height_50, styles.flexCenter]}>
                            <Image source={color === COLORS.default ? require('../../assets/image/iconTap/megaphone.png') : require('../../assets/image/iconTap/megaphone_gray.png')} style={[styles.width_25, styles.height_25]} resizeMode={'contain'} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name={'Chat'}
                component={auth ? Chat : Login}
                options={{
                    tabBarBadge: auth && countCon ? countCon : null,
                    tabBarLabel: 'Chat',
                    tabBarVisible: auth ? true : false,
                    tabBarIcon: ({ color, size }) => (
                        <View style={[color === COLORS.default ? styles.bg_orange : styles.bg_White, styles.width_70, styles.height_50, styles.flexCenter]}>
                            <Image source={color === COLORS.default ? require('../../assets/image/iconTap/chat.png') : require('../../assets/image/iconTap/chat_gray.png')} style={[styles.width_25, styles.height_25]} resizeMode={'contain'} />
                        </View>
                    ),
                }}
            />

        </Tabs.Navigator>
    );
}

export function CommonStackNavigator() {
    return (
        <CommonStack.Navigator mode={'card'} screenOptions={{ headerShown: false }} >
            <CommonStack.Screen name='initScreen' options={{ headerShown: false }} component={InitScreen} />
            <MainStack.Screen name='home' options={{ headerShown: false }} component={TabsScreen} />
            <CommonStack.Screen name='about' options={{ headerShown: false }} component={About} />
            <CommonStack.Screen name='chat' options={{ headerShown: false }} component={Chat} />
            <CommonStack.Screen name='commission' options={{ headerShown: false }} component={Commission} />
            <CommonStack.Screen name='detailsAdv' options={{ headerShown: false }} component={DetailsAdv} />
            <CommonStack.Screen name='chooseAdv' options={{ headerShown: false }} component={ChooseAdv} />
            <CommonStack.Screen name='photoAdv' options={{ headerShown: false }} component={PhotoAdv} />
            <CommonStack.Screen name='category' options={{ headerShown: false }} component={Category} />
            <CommonStack.Screen name='editProfile' options={{ headerShown: false }} component={EditProfile} />
            <CommonStack.Screen name='profileUserAdv' options={{ headerShown: false }} component={ProfileUserAdv} />
            <CommonStack.Screen name='terms' options={{ headerShown: false }} component={Terms} />
            <CommonStack.Screen name='termsAdv' options={{ headerShown: false }} component={TermsAdv} />
            <CommonStack.Screen name='imageBrowser' options={{ headerShown: false }} component={ImageBrowserScreen} />
            <CommonStack.Screen name='profile' options={{ headerShown: false }} component={Profile} />
            <CommonStack.Screen name='listFilter' options={{ headerShown: false }} component={ListFilter} />
            <CommonStack.Screen name='chatRoom' options={{ headerShown: false }} component={ChatRoom} />
            <CommonStack.Screen name='questions' options={{ headerShown: false }} component={Questions} />
            <CommonStack.Screen name='addAdv' options={{ headerShown: false }} component={AddAdv} />
            <CommonStack.Screen name='loading' options={{ headerShown: false }} component={Loading} />
            <CommonStack.Screen name='itemsAdvUser' options={{ headerShown: false }} component={ItemsAdvUser} />
            <CommonStack.Screen name='addTransfer' options={{ headerShown: false }} component={AddTransfer} />
            <CommonStack.Screen name='callUs' options={{ headerShown: false }} component={CallUs} />
            <CommonStack.Screen name='updateEmail' options={{ headerShown: false }} component={UpdateEmail} />
            <CommonStack.Screen name='updatePhone' options={{ headerShown: false }} component={UpdatePhone} />
            <CommonStack.Screen name='language' options={{ headerShown: false }} component={Language} />
            <CommonStack.Screen name='uploadPhotoAdv' options={{ headerShown: false }} component={UploadPhotoAdv} />
            <CommonStack.Screen name='chooseCategory' options={{ headerShown: false }} component={ChooseCategory} />
            <CommonStack.Screen name='chooseSubCategory' options={{ headerShown: false }} component={ChooseSubCategory} />
            <CommonStack.Screen name='updateSetUser' options={{ headerShown: false }} component={UpdateSetUser} />
            <CommonStack.Screen name='editAdv' options={{ headerShown: false }} component={EditAdv} />
            <CommonStack.Screen name='notification' options={{ headerShown: false }} component={Notification} />

            <CommonStack.Screen name='newPassword' options={{ headerShown: false }} component={NewPassword} />
            <CommonStack.Screen name='activeAccount' options={{ headerShown: false }} component={ActiveAccount} />
            <CommonStack.Screen name='changePassword' options={{ headerShown: false }} component={ChangePassword} />
            <CommonStack.Screen name='forgetPassword' options={{ headerShown: false }} component={ForgetPassword} />
            <CommonStack.Screen name='login' options={{ headerShown: false }} component={Login} />
            <CommonStack.Screen name='register' options={{ headerShown: false }} component={Register} />
        </CommonStack.Navigator>
    );
}

export function HomeStackStackNavigator() {
    return (

        <HomeStack.Navigator mode={'card'} screenOptions={{ headerShown: false }} >

            <HomeStack.Screen name='commonStack' options={{ headerShown: false }} component={CommonStackNavigator} />

        </HomeStack.Navigator>
    );
}

function MyDrawer() {

    return (


        <Drawer.Navigator
            drawerStyle={[
                styles.Width_100, styles.height_full
            ]}
            drawerContentOptions={{
                itemStyle: [],
                labelStyle: [],
            }}

            drawerContent={(props) => <CustomDrawerContent {...props} />}>

            <Drawer.Screen name="homeStack" component={HomeStackStackNavigator} options={{ headerShown: false }} initialRoute={{ statusBarHidden: true }} />
        </Drawer.Navigator>



    );
}


export function MainStackNavigator() {
    return (

        <MainStack.Navigator mode={'card'} screenOptions={{ headerShown: false }} >

            <MainStack.Screen name='myDrawer' options={{ headerShown: false }} component={MyDrawer} />
        </MainStack.Navigator>


    );
}

