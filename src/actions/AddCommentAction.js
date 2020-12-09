import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const addComment = ( token, comment, blogId, lang  ) => {
    return (dispatch) => {
        axios.post(`${CONST.url}add-comment`, {
            token            :  token,
            comment          :  comment,
            ad_id            :  blogId,
            lang             :  lang,
        }).then( (response)=> {

            // dispatch({type: 'addComment', payload: response.data});

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

export const removeComment = ( token, commentId, lang  ) => {
    return (dispatch) => {
        axios.post(`${CONST.url}delete-comment`, {
            token            :  token,
            comment_id       :  commentId,
            lang             :  lang,
        }).then( (response)=> {

            // dispatch({type: 'removeComment', payload: response.data});

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

export const addCommentReport = ( token, id, commentId,lang  ) => {
    return (dispatch) => {
        axios.post(`${CONST.url}add-comment-report`, {
            token               :  token,
            reason_id           :  id,
            comment_id          :  commentId,
            lang                :  lang,
        }).then( (response)=> {

            // dispatch({type: 'addCommentReport', payload: response.data});

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


