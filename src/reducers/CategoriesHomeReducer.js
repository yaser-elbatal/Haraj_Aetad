const INITIAL_STATE = { categoriesAll : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'categoriesHome':
            return {
                categoriesAll           : action.payload.data,
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
