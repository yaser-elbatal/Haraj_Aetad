const INITIAL_STATE = { advReasons : [], commentReasons : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'reportReasons':
            return {
                advReasons              : action.payload.data.adReasons,
                commentReasons          : action.payload.data.commentReasons,
                loader                  : action.payload.success
            };
        case 'addAdReport':
            return {
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
