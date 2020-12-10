const INITIAL_STATE = { code : null, loader : false, };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'resentCode':
            return {
                code                    : action.payload.data.code,
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
