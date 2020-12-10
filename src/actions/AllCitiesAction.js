import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";


export const allCities = ( lang, id ) => {
    return (dispatch) => {
        axios.post(`${CONST.url}cities-by-country`, {
            lang        : lang,
            country_id  : id
        }).then( (response)=> {

            dispatch({type: 'allCities', payload: response.data});

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
