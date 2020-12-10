import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const advDetailes = ( token, blogId, lang  ) => {
    return async(dispatch) => {
    await axios.post(`${CONST.url}ad-detailes`, {
            token            :  token,
            ad_id            :  blogId,
            lang             :  lang,
        }).then( (response)=> {

            dispatch({type: 'advDetailes', payload: response.data});

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
            });
        });
    }
};

export const removeAdv = ( token, blogId, lang, navigation  ) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}delete-ad`, {
            token            :  token,
            ad_id            :  blogId,
            lang             :  lang,
        }).then( (response)=> {

            navigation.navigate('home');
            
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
            });
        });
    }
};


