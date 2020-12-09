const INITIAL_STATE = { dataChat: [], inChat: [], loader: false, };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'allChat':
            return {

                dataChat: action.payload.data,
                loader: action.payload.success
            };
        case 'inboxChat':
            return {
                ...state,
                inChat: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
