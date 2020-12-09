import axios from "axios";
import CONST from "../consts";
import { Toast } from 'native-base'
import i18n from "../../locale/i18n";

export const aboutUs = ( lang, ) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}about`, {
            lang        : lang ,
        }).then( (response)=> {

            dispatch({type: 'aboutUs', payload: response.data});

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

export const termsCondition = ( lang, ) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}terms`, {
            lang        : lang ,
        }).then( (response)=> {

            dispatch({type: 'termsCondition', payload: response.data});

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

export const addAdvTerms = ( lang, ) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}add-ad-terms`, {
            lang        : lang ,
        }).then( (response)=> {

            dispatch({type: 'addAdvTerms', payload: response.data});

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

export const social = ( lang, ) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}app-info`, {
            lang        : lang ,
        }).then( (response)=> {

            dispatch({type: 'social', payload: response.data});

            console.log('response ===+++===', response.data.data)

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

export const allQuestions = ( lang, ) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}questions`, {
            lang        : lang ,
        }).then( (response)=> {

            dispatch({type: 'allQuestions', payload: response.data});

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

export const allNotifications = ( token, lang) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}notifications`, {
            token               : token,
            lang                : lang,
        }).then( (response)=> {

            dispatch({type: 'allNotifications', payload: response.data});

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
