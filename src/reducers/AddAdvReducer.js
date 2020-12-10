const INITIAL_STATE = { loader : false, };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'addAdv':
            return {
                loader      : action.payload.success
            };
        default:
            return state;
    }
};
