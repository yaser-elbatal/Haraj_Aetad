const INITIAL_STATE = { data : null, success : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'sendMessage':
            return {
                data                    : action.payload.data,
                success                 : action.payload.success
            };
        default:
            return state;
    }
};
