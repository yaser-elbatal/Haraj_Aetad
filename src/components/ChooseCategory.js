import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import { useSelector, useDispatch } from 'react-redux';
import { mainCategories, banners } from "../actions";
import * as Animatable from "react-native-animatable";
import Loading from "../components/Loading";


function ChooseCategory({route, navigation}) {

    const lang                          = useSelector(state => state.lang.lang);
    const categories                    = useSelector(state => state.mainCategories.categories ? state.mainCategories.categories : []);
    const [loader, setLoader]           = useState(true);
    const [blogId]                      = useState(route.params.blogId);
    const [namePage]                    = useState(route.params.namePage);
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(mainCategories(lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
    }

    useEffect(() => {
        fetchData();
    }, []);

    function clickCategory(count, data) {
        if (count === 1){
            navigation.navigate('chooseSubCategory', { data, namePage, blogId });
        } else {
            let allCate = [];
            allCate.push(data);
            if (namePage === 'addAdv'){
                navigation.navigate('addAdv', { allCate, data });
            } else {
                navigation.push('editAdv', { allCate, data, blogId });
            }
        }
    }

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
                        { i18n.t('chCate') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R, { paddingBottom : 40 } ]}>

                <View style={[ styles.rowGroup, styles.paddingHorizontal_5, styles.paddingVertical_10 ]}>

                    {
                        categories.map((cate) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => clickCategory( cate.has_subs, { name : cate.name, id : cate.id, count : cate.has_subs, features : cate.features } )}
                                        style={[ styles.overHidden, styles.flex_50, styles.paddingHorizontal_10, styles.marginVertical_5 ]}>
                                        <Animatable.View animation="zoomIn" easing="ease-out" delay={900} style={[styles.Width_100, styles.paddingVertical_10]}>
                                            <View style={[ styles.boxShadow, styles.bg_White, styles.marginHorizontal_5, styles.flexCenter, styles.Width_100, styles.Radius_10, styles.Border, styles.border_dash ]}>
                                                <View style={[styles.Width_100, styles.height_80, styles.flexCenter, styles.marginTop_10]}>
                                                    <Image
                                                        style={[styles.width_60, styles.height_60, styles.Radius_5]}
                                                        source={{ uri : cate.icon }}
                                                    />
                                                </View>
                                                <Text style={[ styles.FairuzNormal, styles.textSize_16, styles.text_default, styles.marginVertical_10]}>
                                                    { cate.name }
                                                </Text>
                                            </View>
                                        </Animatable.View>
                                    </TouchableOpacity>
                                )
                            }
                        )
                    }

                </View>
            </Content>
        </Container>
    );
}

export default ChooseCategory;
