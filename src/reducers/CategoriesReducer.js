const INITIAL_STATE = { blog : [], loader : false, totalPages : 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getBlogs':
            return {
                blog                : action.payload.data,
                totalPages          : action.payload.pages.total_pages,
                loader              : action.payload.success
            };
        default:
            return state;
    }
};
