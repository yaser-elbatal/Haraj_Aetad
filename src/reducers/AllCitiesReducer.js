const INITIAL_STATE = { allCities : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'allCities':
            return {
                allCities               : action.payload.data,
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
