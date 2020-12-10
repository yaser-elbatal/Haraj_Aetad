const INITIAL_STATE = { countNoty : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'countNotifications':
            return {
                countNoty                   : action.payload.data.count,
                loader                      : action.payload.success
            };
        default:
            return state;
    }
};
