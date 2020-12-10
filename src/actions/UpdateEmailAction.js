import axios from 'axios';
import { Toast } from 'native-base'
import CONST from '../consts';
import i18n from "../../locale/i18n";

export const updateSetEmail = (token, email, lang, navigation) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'update-email-request',
            {
                token               : token,
                email			    : email,
                lang 			    : lang,
            }).then(response => {

            dispatch({type: 'updateSetEmail', payload: response.data});

            if (response.data.success){
                navigation.navigate('updateSetUser', {
                    code			: response.data.data.code,
                    type            : 'email'
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
