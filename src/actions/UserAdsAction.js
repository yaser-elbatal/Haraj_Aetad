import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const advUser = ( lang, token ) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}user-ads`, {
            lang             : lang,
            token            : token
        }).then( (response)=> {

            dispatch({type: 'advUser', payload: response.data});

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

export const advLastSeen = ( lang, token ) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}last-seen`, {
            lang             : lang,
            token            : token
        }).then( (response)=> {

            dispatch({type: 'advLastSeen', payload: response.data});

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

export const advFavorites = ( lang, token ) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}Favorites`, {
            lang             : lang,
            token            : token
        }).then( (response)=> {

            dispatch({type: 'advFavorites', payload: response.data});

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


