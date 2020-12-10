const INITIAL_STATE = { about : '', terms : '', addTerms: '',social : '' ,data : [] , notifications : [], loader : false, };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'aboutUs':
            return {
                about                   : action.payload.data,
                loader                  : action.payload.success
            };
        case 'social':
            return {
                social                  : action.payload.data,
                loader                  : action.payload.success
            };
        case 'termsCondition':
            return {
                terms                   : action.payload.data,
                loader                  : action.payload.success
            };
        case 'addAdvTerms':
            return {
                addTerms                : action.payload.data,
                loader                  : action.payload.success
            };
        case 'allQuestions':
            return {
                data                    : action.payload.data,
                loader                  : action.payload.success
            };
        case 'allNotifications':
            return {
                notifications           : action.payload.data,
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
