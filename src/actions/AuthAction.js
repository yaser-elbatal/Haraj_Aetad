import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base'
import CONST from '../consts';
import i18n from "../../locale/i18n";

export const userLogin = ( phone, pass, codeId, expoPushToken, lang ,navigation ) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'sign-in',
            {
                phone           : phone,
                password        : pass,
                key             : codeId,
                device_id       : expoPushToken,
                lang            : lang,
            }).then(response => {

            if (response.data.success === true && response.data.data.id){
                navigation.push('home');
                dispatch({type: 'login_user', payload: response.data});
                AsyncStorage.setItem('userId', JSON.stringify(response.data.data.token))
            } else {
                dispatch({type: 'login_failed'});
            }

            if (response.data.data) {
                if (response.data.data.value === 1){
                    navigation.navigate('activeAccount', {
                        token			: response.data.data.token,
                        code			: response.data.data.code,
                    });
                }
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
            })
        });
    };
};

export const register = (data, navigation) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'sign-up',
            {
                name			    : data.name,
                avatar			    : data.base64,
                phone			    : data.phone,
                key		     	    : data.codeId,
                email			    : data.email,
                country_id		    : data.countryId,
                city_id			    : data.cityId,
                password		    : data.pass,
                device_id		    : data.expoPushToken,
                lang 			    : data.lang,
            }).then(response => {

            dispatch({type: 'register', payload: response.data});

            if (response.data.success){
                navigation.navigate('activeAccount', {
                    code			: response.data.data.code,
                    token			: response.data.data.token,
                });
            }

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
    };
};

export const activate = (token , code ,lang , navigation) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'activate',
            {
                token			    : token,
                code			    : code,
                lang 			    : lang,
            }).then(response => {

            if (response.data.success === true && response.data.data.id){
                navigation.navigate('home');
                dispatch({type: 'login_user', payload: response.data});
                AsyncStorage.setItem('userId', JSON.stringify(response.data.data.token))
            } else {
                dispatch({type: 'login_failed'});
            }

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
    };
};

export const forgetPass = (phone , codeId ,lang , navigation) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'forget-password',
            {
                phone			    : phone,
                key			        : codeId,
                lang 			    : lang,
            }).then(response => {

            dispatch({type: 'forgetPass', payload: response.data});

            if (response.data.success){
                navigation.navigate('newPassword', {
                    code			: response.data.data.code,
                    token			: response.data.data.token,
                });
            }

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
    };
};

export const newPassword = (token , newPass ,lang , navigation) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'reset-password',
            {
                token			    : token,
                password	        : newPass,
                lang 			    : lang,
            }).then(response => {

            dispatch({type: 'newPassword', payload: response.data});

            if (response.data.success){
                navigation.navigate('login');
            }

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
    };
};

export const changePassword = (token , oldPass, newPass , lang, navigation) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'update-password',
            {
                token			    : token,
                old_password        : oldPass,
                current_password    : newPass,
                lang 			    : lang,
            }).then(response => {

            if (response.data.success){
                dispatch({type: 'changePassword', payload: response.data});
                navigation.navigate('profile');
            }

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
    };
};

export const changePhone = (token, lang, navigation) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'update-phone',
            {
                token			    : token,
                lang 			    : lang,
            }).then(response => {

            dispatch({type: 'changePhone', payload: response.data});

            if (response.data.success){
                navigation.navigate('profile');
            }

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
    };
};

export const changeEmail = (token, lang, navigation) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'update-email',
            {
                token			    : token,
                lang 			    : lang,
            }).then(response => {

            dispatch({type: 'changeEmail', payload: response.data});

            if (response.data.success){
                navigation.navigate('profile');
            }

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
    };
};

export const profileData = ( data ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}profile`, {
            token           : data.token,
            lang            : data.lang,
        }).then( (response)=> {

            dispatch({type: 'profileData', payload: response.data});

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

export const updateProfile = (data, navigation) => {
    return async(dispatch) => {
        await axios.post(
            CONST.url + 'update-profile',
            {
                avatar			    : data.base64,
                name			    : data.name,
                phone			    : data.phone,
                country_id		    : data.countryId,
                city_id			    : data.cityId,
                token			    : data.token,
                lang 			    : data.lang,
            }).then(response => {

            dispatch({type: 'updateProfile', payload: response.data});

            if (response.data.success){
                navigation.navigate('profile');
            }

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
    };
};

export const logOut = ( data ) => {
    return async (dispatch) => {
        await axios.post(`${CONST.url}logout`, {
            token           : data.token,
            lang            : data.lang,
        }).then( (response)=> {

            dispatch({type: 'logOut', payload: response.data});

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

export const notifyStatus = ( lang, token) => {
    return async(dispatch) => {
        await axios.post(`${CONST.url}change-notify-statue`, {
            lang                : lang,
            token               : token ,
        }).then( (response)=> {

            // dispatch({type: 'notifyStatus', payload: response.data});

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
            })
        });
    }
};

export const authLogout = () => {
    return (dispatch) => {
        dispatch({type: 'authLogout'});
    };
};
