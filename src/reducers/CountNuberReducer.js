const INITIAL_STATE = { countChat : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'countChat':
            return {
                countChat                   : action.payload.data,
                loader                      : action.payload.success
            };
        default:
            return state;
    }
};
