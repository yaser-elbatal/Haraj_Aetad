import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const favouriteBlog = ( token, blogId, lang  ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}fav-unfav-Ad`, {
            token            :  token,
            ad_id            :  blogId,
            lang             :  lang,
        }).then( (response)=> {

            // dispatch({type: 'favouriteBlog', payload: response.data});

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

export const refreshAdv = ( token, blogId, lang  ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}refresh-ad`, {
            token            :  token,
            ad_id            :  blogId,
            lang             :  lang,
        }).then( (response)=> {

            // dispatch({type: 'refreshAdv', payload: response.data});

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


