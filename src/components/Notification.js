import React, { useState , useEffect } from "react";
import {View, Text, Image, AsyncStorage, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Icon} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import { useSelector, useDispatch } from 'react-redux';
import {allNotifications, removeNotifications} from '../actions';
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";
import Loading from "../components/Loading";

function Notification({navigation}) {

    const lang                          = useSelector(state => state.lang.lang);
    const notifications                 = useSelector(state => state.article.notifications ? state.article.notifications : []);
    const token                         = useSelector(state => state.auth.user ? state.auth.user.token : null);
    const [loader, setLoader]           = useState(true);
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(allNotifications(token, lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
    }

    function removeNoty (id){
        setLoader(true)
        dispatch(removeNotifications(token, id, lang)).then(()=> {
            setLoader(false);
            fetchData();
        }).catch(()=> setLoader(false));
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                        { i18n.t('Notifications') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R ]}>

                <View style={[ styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_15 ]}>

                    {
                        notifications.length !== 0 ?
                            notifications.map((noty) => {
                                    return (
                                        <View style={[ styles.Width_100, styles.overHidden, styles.paddingHorizontal_5 ]}>
                                            <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.Width_100, styles.position_R]}>
                                                <View style={[ styles.paddingVertical_15 ,styles.bg_White, styles.Radius_10, styles.paddingHorizontal_10, styles.marginVertical_10, styles.Border ,styles.border_dash, styles.position_R,{ borderLeftWidth : 7, borderLeftColor : '#332658' } ]}>
                                                    <TouchableOpacity
                                                        onPress     = {() => removeNoty(noty.id)}
                                                        style       = {[ styles.position_A, styles.bg_red, styles.Radius_50, styles.width_25, styles.height_25, styles.flexCenter ,{ top : -10, right : -6 } ]}>
                                                        <Icon
                                                            style={[styles.textSize_13, styles.text_White]}
                                                            type="AntDesign"
                                                            name='close'
                                                        />
                                                    </TouchableOpacity>
                                                    <View style={[ styles.rowGroup ]}>
                                                        <Text style={[ styles.textSize_16, styles.FairuzBold, styles.text_default, styles.textDir ]}>
                                                            { noty.sender_name }
                                                        </Text>
                                                        <Text style={[ styles.textSize_16, styles.FairuzNormal, styles.text_orange, styles.textDir ]}>
                                                            { noty.date }
                                                        </Text>
                                                    </View>
                                                    <Text style={[ styles.textSize_16, styles.FairuzNormal, styles.text_bold_gray, styles.textDir ]}>
                                                        { noty.message }
                                                    </Text>
                                                </View>
                                            </Animatable.View>
                                        </View>
                                    )
                                }
                            )
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
        </Container>

    );
}

export default Notification;
