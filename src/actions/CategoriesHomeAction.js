import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const categoriesHome = ( categoryId, lang ) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}sub-categories`, {
            category_id      : categoryId,
            lang             : lang,
        }).then( (response)=> {

            dispatch({type: 'categoriesHome', payload: response.data});

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
