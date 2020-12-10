import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const photoAds = ( lang ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}photo-ads`, {
            lang             :  lang,
        }).then( (response)=> {

            dispatch({type: 'photoAds', payload: response.data});

        }).catch(err => {
            Toast.show({
                text        	: i18n.t('errT') ,
                type			: "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'FairuzBlack',
                    textAlign   	: 'center'
                }
            })
        });
    }
};

export const addPhotoAds = ( data, navigation ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}add-photo-ad`, {
            token           : data.token,
            image           : data.base64,
            url             : data.url,
            lang            : data.lang,
        }).then( (response)=> {

            dispatch({type: 'addPhotoAds', payload: response.data});

            if (response.data.success){
                navigation.navigate('home');
            }

            Toast.show({
                text        	: response.data.message,
                type			: response.data.success ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'FairuzBlack',
                    textAlign   	: 'center'
                }
            });

        }).catch(err => {
            Toast.show({
                text        	: i18n.t('errT') ,
                type			: "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'FairuzBlack',
                    textAlign   	: 'center'
                }
            })
        });
    }
};
