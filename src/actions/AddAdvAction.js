import axios from "axios";
import CONST from "../consts";
import { Toast } from 'native-base';
import i18n from "../../locale/i18n";

export const addAdv = (data, navigation) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}add-ad`, {
            lang                : data.lang,
            token               : data.token,
            country_id          : data.countryId,
            city_id             : data.cityId,
            category_id         : data.lastData.id,
            description_ar      : data.detailsAR,
            description_en      : data.detailsEN,
            title_ar            : data.nameAR,
            title_en            : data.nameEN,
            price               : data.price,
            address             : data.mapCity,
            latitude            : data.mapRegion.latitude,
            longitude           : data.mapRegion.longitude,
            phone               : data.phone,
            key                 : data.codeId,
            is_chat             : data.isChat,
            is_phone            : data.isPhone,
            is_refresh          : data.isRefresh,
            features            : data.features,
            images              : data.base64,
        }).then( (response)=> {

            navigation.navigate('home');

            Toast.show({
                text        	: response.data.message,
                type			: response.data.success === true ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'FairuzBlack',
                    textAlign   	: 'center'
                }
            });

            // dispatch({type: 'addAdv', payload: response.data});

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

export const advUpdate = (data, navigation) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}update-ad`, {
            lang                : data.lang,
            token               : data.token,
            ad_id               : data.blogId,
            country_id          : data.countryId,
            city_id             : data.cityId,
            category_id         : data.lastData != null ? data.lastData.id : data.lastId,
            description_ar      : data.detailsAR,
            description_en      : data.detailsEN,
            title_ar            : data.nameAR,
            title_en            : data.nameEN,
            price               : data.price,
            address             : data.mapCity,
            latitude            : data.mapRegion.latitude,
            longitude           : data.mapRegion.longitude,
            phone               : data.phone,
            is_chat             : data.isChat,
            is_phone            : data.isPhone,
            is_refresh          : data.isRefresh,
            features            : data.inputVals,
            images              : data.base64,
        }).then( (response)=> {

            navigation.navigate('home');

            Toast.show({
                text        	: response.data.message,
                type			: response.data.success === true ? "success" : "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'FairuzBlack',
                    textAlign   	: 'center'
                }
            });

            // dispatch({type: 'editAdv', payload: response.data});

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
