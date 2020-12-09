const INITIAL_STATE = { blog : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getBlogs':
            return {
                blog                : action.payload.data,
                loader              : action.payload.success
            };
        default:
            return state;
    }
};
