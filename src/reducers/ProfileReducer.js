const INITIAL_STATE = { proData : null  ,loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'providerData':
            return {
                proData                 : action.payload.data,
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
