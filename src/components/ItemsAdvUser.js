import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, Linking} from "react-native";
import {Icon} from 'native-base'
import styles from '../../assets/style';
import * as Animatable from "react-native-animatable";


function ItemsAdvUser({navigation, item, value}) {

    console.log('value', value);

    function noResults() {
        return (
            <View style={[ styles.Width_100 ,styles.bgFullWidth, styles.flexCenter, styles.marginVertical_50 ]}>
                <Image style={[ styles.width_150 , styles.height_150 ]} source={require('../../assets/image/empty.png')} resizeMode={"contain"}/>
            </View>
        );
    }

    return (
        <View style={[ styles.Width_100 ]}>
            {
                ( item.length === 0 ) ?
                    noResults()
                    :
                    value === 'advPhotoData' ?
                    <View style={[ styles.rowGroup, styles.paddingHorizontal_5, styles.paddingVertical_10 ]}>
                        {
                            item.map((blog) => {
                                    return (
                                        <View style={[ styles.overHidden, styles.flex_50, styles.paddingHorizontal_5 ]}>
                                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={blog.animation} style={[styles.Width_100]}>
                                                <TouchableOpacity
                                                    onPress={() => { Linking.openURL( blog.url )}}
                                                    style={[ styles.Width_100, styles.marginVertical_5 ]}
                                                >
                                                    <View style={[styles.bg_White, styles.Width_100, styles.Border, styles.border_dash, styles.overHidden ]}>
                                                        <View style={[ styles.overHidden , styles.position_R, styles.height_200, styles.Width_100]}>
                                                            <Image
                                                                style={[styles.Width_100, styles.height_200]}
                                                                source={{ uri : blog.icon }}
                                                                resizeMode='stretch'
                                                            />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </Animatable.View>
                                        </View>
                                    )
                                }
                            )
                        }
                    </View>
                    :
                    <View style={[ styles.rowGroup, styles.paddingHorizontal_5, styles.paddingVertical_10 ]}>
                        {
                            item.map((blog) => {
                                    return (
                                        <View style={[ styles.overHidden, styles.flex_50, styles.paddingHorizontal_5 ]}>
                                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={blog.animation} style={[styles.Width_100]}>
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
                                                                <Text style={[styles.FairuzBold , styles.text_red, styles.textSize_13]}>
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
                                            </Animatable.View>
                                        </View>
                                    )
                                }
                            )
                        }
                    </View>
            }
        </View>
    );
}

export default ItemsAdvUser;
