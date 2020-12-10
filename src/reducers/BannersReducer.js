const INITIAL_STATE = { banners : [], loader : false, };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'banners':
            return {
                banners                 : action.payload.data,
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
