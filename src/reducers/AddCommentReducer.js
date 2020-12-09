const INITIAL_STATE = { dataComment : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'advDetailes':
            return {
                dataComment         : action.payload.data,
                loader              : action.payload.success
            };
        case 'removeComment':
            return {
                loader              : action.payload.success
            };
        case 'addCommentReport':
            return {
                loader              : action.payload.success
            };
        default:
            return state;
    }
};
