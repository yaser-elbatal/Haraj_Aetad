const INITIAL_STATE = { data : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'advDetailes':
            return {
                data                : action.payload.data,
                loader              : action.payload.success
            };
        default:
            return state;
    }
};
