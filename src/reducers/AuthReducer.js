const INITIAL_STATE = {user: null , loading: false, msg: '' , success : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ('login_failed') :
            return ({...state, user: null});
        case ('login_user') :
            return ({...state, user: action.payload.data, msg: action.payload.message, success: action.payload.success});
        case ('profileData'):
            return ({...state, loading: false, user: action.payload.data , msg: action.payload.message});
        case ('updateProfile'):
            return ({...state, loading: false, user: action.payload.data , msg: action.payload.message});
        case ('changePassword'):
            return ({...state, loading: false, user: action.payload.data , msg: action.payload.message});
        case ('changePhone'):
            return ({...state, loading: false, user: action.payload.data , msg: action.payload.message});
        case ('changeEmail'):
            return ({...state, loading: false, user: action.payload.data , msg: action.payload.message});
        case ('register') :
            return ({...state, msg: action.payload.message});
        case ('forgetPass') :
            return ({...state, msg: action.payload.message});
        case ('newPassword') :
            return ({...state, msg: action.payload.message});
        case 'notifyStatus':
            return {loader : action.payload.success};
        case ('authLogout') :
            return ({user: null});
        case ('user_logout') :
            return ({...state, user: null});
        case ('temp_auth') :
            return ({...state, user: null});
        default :
            return state;
    }

}
