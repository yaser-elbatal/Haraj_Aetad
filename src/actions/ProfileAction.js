import axios from 'axios';
import { AsyncStorage } from 'react-native';
import CONST from '../consts';
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const providerData = ( provider_id, lang ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}provider-data`, {
            user_id         : provider_id,
            lang            : lang,
        }).then( (response)=> {

            dispatch({type: 'providerData', payload: response.data});

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

export const rateUser = ( token, ratedId, num, lang ) => {
    return async () => {
        await axios.post(`${CONST.url}rate-user`, {
            token           : token,
            rated_id        : ratedId,
            rate            : num,
            lang            : lang,
        }).then( (response)=> {

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
            console.log('err', err);
        });
    }
};
