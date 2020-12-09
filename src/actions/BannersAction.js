import axios from "axios";
import CONST from "../consts";
import { Toast } from 'native-base'
import i18n from "../../locale/i18n";

export const banners = ( lang, ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}banners`, {
            lang        : lang ,
        }).then( (response)=> {

            dispatch({type: 'banners', payload: response.data});

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

export const deleteImageAdv = ( token, id, lang ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}delete-image-ad`, {
            token       : token,
            id          : id,
            lang        : lang,
        }).then( (response)=> {

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
