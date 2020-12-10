import axios from "axios";
import CONST from "../consts";
import { Toast } from 'native-base'
import i18n from "../../locale/i18n";

export const addTransfer = ( dataFun, navigation ) => {
    return async () => {
        await axios.post(`${CONST.url}add-transfer`, {
            bank_id             : dataFun.bankId,
            ad_id               : dataFun.advId,
            account_number      : dataFun.numAcc,
            account_name        : dataFun.userName,
            bank_name           : dataFun.bankName,
            ammount             : dataFun.countNum,
            image               : dataFun.base64,
            lang                : dataFun.lang,
        }).then( (response)=> {

            if (response.data.success){
                navigation.navigate('home');
            }

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
