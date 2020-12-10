import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Icon} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import { useSelector, useDispatch } from 'react-redux';
import { subCategories } from "../actions";
import * as Animatable from "react-native-animatable";
import Loading from "../components/Loading";


function ChooseSubCategory({navigation, route}) {

    const lang                          = useSelector(state => state.lang.lang);
    const categories                    = useSelector(state => state.subCategory.subCategories ? state.subCategory.subCategories : []);
    const [allCate, setAllCate]         = useState([route.params.data]);
    const [categoryId]                  = useState(route.params.data.id);
    const [blogId]                      = useState(route.params.blogId ? route.params.blogId : null);
    const [namePage]                    = useState(route.params.data.namePage ? route.params.data.namePage : route.params.namePage);
    const [loader, setLoader]           = useState(true);
    const [data, setData]               = useState(route.params.data);
    const dispatch                      = useDispatch();

    function fetchData(){
        dispatch(subCategories(categoryId, lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
            setAllCate([route.params.data])
        });

        return unsubscribe;
    }, []);

    function clickSubCategory(categoryId, count, data){
        setData(data);
        allCate.push(data);
        dispatch(subCategories(categoryId, lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
        if (count === 0){
            if (namePage === 'addAdv'){
                navigation.navigate('addAdv', { allCate, data });
            } else {
                navigation.push('editAdv', { allCate, data, blogId });
            }
        }
    }

    function chooseSubCategory(categoryId, i){
        allCate.splice(i + 1 , allCate.length);
        dispatch(subCategories(categoryId, lang)).then(()=> setLoader(false).catch(()=> setLoader(false)));
    }

    function chooseThis() {
        if (namePage === 'addAdv'){
            navigation.navigate('addAdv', { allCate, data });
        } else {
            navigation.push('editAdv', { allCate, data, blogId });
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
                        { i18n.t('SuchCate') }
                    </Title>
                </Body>
            </Header>

            <Content contentContainerStyle={[ styles.bgFullWidth, styles.position_R, { paddingBottom : 40 } ]}>

                <View style={[ styles.paddingHorizontal_5, styles.paddingVertical_10 ]}>

                    <View style={[ styles.rowGroup, styles.Width_100, styles.marginBottom_10, styles.paddingHorizontal_10 ]}>
                        <View style={[ styles.rowIng ]}>
                            {
                                allCate.map((item, i) => {
                                    return (
                                        <TouchableOpacity onPress={() => chooseSubCategory( item.id, i, { name : item.name, id : item.id } )} style={[ styles.overHidden, styles.paddingHorizontal_5 ]}>
                                            <Text style={[styles.FairuzNormal, styles.textPlatform12, i + 1  === Object.keys(allCate).length   ? styles.text_orange : styles.text_default]}>
                                                {i + 1  === Object.keys(allCate).length ? item.name : item.name + ' ' + ' ' + '>' }
                                            </Text>
                                        </TouchableOpacity>
                                        )
                                    }
                                )
                            }
                        </View>
                        <TouchableOpacity
                                onPress={() => chooseThis()}
                                style={[ styles.paddingVertical_5, styles.width_90 ,styles.paddingHorizontal_10 , styles.flexCenter, styles.bg_orange, styles.Radius_5]}>
                            <Text style={[styles.FairuzBold, styles.textPlatform14, styles.text_default]}>
                                { i18n.t('selection') }
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[ styles.marginVertical_20 ]}>
                        {
                            categories.map((cate) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => clickSubCategory(cate.id, cate.has_subs,{ id : cate.id, name : cate.name, count : cate.has_subs, features : cate.features }) }
                                            style={[ styles.overHidden, styles.paddingHorizontal_10 ]}>
                                            <Animatable.View animation="fadeInUp" easing="ease-out" delay={100} style={[styles.Width_100, styles.paddingVertical_10]}>
                                                <View style={[ styles.boxShadow, styles.bg_White, styles.paddingHorizontal_10, styles.flexCenter, styles.Width_100, styles.Radius_5, styles.rowGroup ]}>
                                                    <Text style={[ styles.FairuzBold, styles.textPlatform14, styles.text_default, styles.marginVertical_10]}>
                                                        { cate.name }
                                                    </Text>
                                                    {
                                                        cate.has_subs === 1 ?
                                                            <Image
                                                                style={[styles.width_15, styles.height_15]}
                                                                source={lang !== 'ar' || lang == null ? require('../../assets/image/rightR.png') : require('../../assets/image/leftL.png')}
                                                            />
                                                            :
                                                            <View/>
                                                    }
                                                </View>
                                            </Animatable.View>
                                        </TouchableOpacity>
                                    )
                                }
                            )
                        }
                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default ChooseSubCategory;
