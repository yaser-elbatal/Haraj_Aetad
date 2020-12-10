import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const sendMessage = ( token, userId, advId, message, lang ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}send-message`, {
            token           : token,
            r_id            : userId,
            ad_id           : advId,
            message         : message,
            lang            : lang,
        }).then( (response)=> {

            dispatch({type: 'sendMessage', payload: response.data});

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
