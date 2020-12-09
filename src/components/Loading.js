import React, { useState , useEffect } from "react";
import {View, Text, Image,} from "react-native";
import {Icon} from 'native-base'
import styles from '../../assets/style';
import * as Animatable from "react-native-animatable";


function Loading({navigation}) {
    return (
        <View style={[styles.position_A, styles.bg_White , styles.flexCenter, styles.right_0, styles.top_0, styles.Width_100, styles.height_full ,{ zIndex : 9999 }]}>
            {/*<Animatable.Text animation="fadeIn" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>*/}
            {/*    <Image*/}
            {/*        style={[styles.width_40, styles.height_40]}*/}
            {/*        source={require('../../assets/image/loading.png')}*/}
            {/*        resizeMode='contain'*/}
            {/*    />*/}
            {/*️</Animatable.Text>*/}
            <Image
                style={[ styles.width_130, styles.height_130 ]}
                source={require('../../assets/image/ionLoader.gif')}
                resizeMode='contain'
            />
            {/*<Text style={[styles.FairuzBold , styles.text_default, styles.textSize_18, styles.marginTop_25]}>*/}
            {/*    { i18n.t('wait') }*/}
            {/*</Text>*/}
        </View>
    );
}

export default Loading;
