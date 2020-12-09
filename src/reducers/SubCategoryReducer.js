const INITIAL_STATE = { subCategories : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'subCategories':
            return {
                subCategories           : action.payload.data,
                loader                  : action.payload.success
            };
        default:
            return state;
    }
};
