import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const countNotifications = ( token, lang ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}count-notifications`, {
            token       : token,
            lang        : lang,
        }).then( (response)=> {

            dispatch({type: 'countNotifications', payload: response.data});

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

export const removeNotifications = ( token, id, lang ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}delete-notifications`, {
            token       : token,
            id          : id,
            lang        : lang,
        }).then( (response)=> {

            // dispatch({type: 'removeNotifications', payload: response.data});

            Toast.show({
                text        	: response.data.message,
                type			: response.data.success === true ? "success" : "danger",
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
