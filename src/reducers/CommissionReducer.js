const INITIAL_STATE = { data : '', loader : false, };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'allCommission':
            return {
                data                    : action.payload.data,
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
