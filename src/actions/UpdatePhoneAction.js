import axios from 'axios';
import { Toast } from 'native-base'
import CONST from '../consts';
import i18n from "../../locale/i18n";

export const updateSetPhone = (token, phone, code, lang, navigation) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'update-phone-request',
            {
                token               : token,
                phone			    : phone,
                key		     	    : code,
                lang 			    : lang,
            }).then(response => {

            dispatch({type: 'updateSetPhone', payload: response.data});

            if (response.data.success){
                navigation.navigate('updateSetUser', {
                    code			: response.data.data.code,
                    type            : 'phone'
                });
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
    };
};
