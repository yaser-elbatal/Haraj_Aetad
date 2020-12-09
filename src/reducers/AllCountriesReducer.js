const INITIAL_STATE = { countries : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'allCountries':
            return {
                countries               : action.payload.data,
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
