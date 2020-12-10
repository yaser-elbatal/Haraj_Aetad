import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";


export const reportReasons = ( token, lang ) => {
    return async(dispatch) => {
      await axios.post(`${CONST.url}report-reasons`, {
            token       : token,
            lang        : lang,
        }).then( (response)=> {

            dispatch({type: 'reportReasons', payload: response.data});

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

export const addAdReport = ( token, id, blogId,lang  ) => {
    return (dispatch) => {
        axios.post(`${CONST.url}add-ad-report`, {
            token               :  token,
            reason_id           :  id,
            ad_id               :  blogId,
            lang                :  lang,
        }).then( (response)=> {

            dispatch({type: 'addAdReport', payload: response.data});

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
