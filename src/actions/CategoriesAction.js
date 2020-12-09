import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import i18n from "../../locale/i18n";

export const getBlogs = ( lang, cityId, countryId, categoryId, latitude, longitude, page, keyword ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}filter-ads`, {
            lang             :  lang,
            city_id          :  cityId,
            country_id       :  countryId,
            category_id      :  categoryId,
            latitude         :  latitude,
            longitude        :  longitude,
            page             :  page,
            keyword          :  keyword,
        }).then( (response)=> {

            dispatch({type: 'getBlogs', payload: response.data});

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


