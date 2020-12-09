import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import Swiper from 'react-native-swiper'
import { useSelector, useDispatch } from 'react-redux';
import { mainCategories, banners } from "../actions";
import * as Animatable from "react-native-animatable";
import Loading from "../components/Loading";


function Category({navigation}) {

    const lang                          = useSelector(state => state.lang.lang);
    const categories                    = useSelector(state => state.mainCategories.categories);
    const allBanners                    = useSelector(state => state.banners.banners);
    const [loader, setLoader]           = useState(true);
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(mainCategories(lang));
        dispatch(banners(lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
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
                        { i18n.t('sections') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R, { paddingBottom : 40 } ]}>

                <View style={[ styles.Width_100, styles.height_230, styles.paddingHorizontal_10, styles.marginTop_20 ]}>
                    <Swiper containerStyle={[ styles.Width_100, styles.height_230, styles.Border, styles.border_light_gray, styles.overHidden, styles.Radius_10 ]} autoplay={true}>
                        {
                            allBanners.map((slider, i) => {
                                return (
                                    <View key={i}>
                                        <TouchableOpacity style={[ styles.Width_100, styles.height_230 ]}>
                                            <Image style={[ styles.Width_100, styles.height_230 ]} source={{uri: slider.icon}}/>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </Swiper>
                </View>

                <View style={[ styles.rowGroup, styles.paddingHorizontal_5, styles.paddingVertical_10 ]}>

                    {
                        categories.map((cate) => {
                                return (
                                    <View style={[ styles.overHidden, styles.flex_50, styles.paddingHorizontal_10, styles.marginVertical_10 ]}>
                                        <Animatable.View animation="zoomIn" easing="ease-out" delay={900} style={[styles.Width_100, styles.paddingVertical_10]}>
                                            <TouchableOpacity style={[ styles.boxShadow, styles.bg_White, styles.marginHorizontal_5, styles.flexCenter, styles.Width_100, styles.Radius_10 ]}>
                                                <View style={[styles.Width_100, styles.height_80, styles.flexCenter, styles.marginTop_10]}>
                                                    <Image
                                                        style={[styles.width_80, styles.height_80, styles.Radius_5]}
                                                        source={{ uri : cate.icon }}
                                                    />
                                                </View>
                                                <Text style={[ styles.FairuzNormal, styles.textSize_16, styles.text_default, styles.marginVertical_10]}>
                                                    { cate.name }
                                                </Text>
                                            </TouchableOpacity>
                                        </Animatable.View>
                                    </View>
                                )
                            }
                        )
                    }

                </View>
            </Content>
        </Container>
    );
}

export default Category;
