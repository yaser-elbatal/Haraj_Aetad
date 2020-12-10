import React, { useState , useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { chooseLang } from '../actions';
import {AsyncStorage, View} from "react-native";


function InitScreen({navigation}) {

    const lang                              = useSelector(state => state.lang.lang);
    const dispatch                          = useDispatch();

    function fetchData(){

        console.log('lang =====++++====', lang);

        if(lang === null || lang === undefined) {
            navigation.navigate('language');
        } else {
            navigation.navigate('home');
        }

        // AsyncStorage.getItem('init').then(init => {
        //     if (init !== 'true'){
        //         AsyncStorage.setItem('init', 'true');
        //         // dispatch(chooseLang('ar'));
        //     }
        // });
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <View/>
    );

}

export default InitScreen;
