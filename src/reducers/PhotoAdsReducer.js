const INITIAL_STATE = { allPhoto : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'photoAds':
            return {
                allPhoto                : action.payload.data,
                loader                  : action.payload.success
            };
        case 'addPhotoAds':
            return {
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
