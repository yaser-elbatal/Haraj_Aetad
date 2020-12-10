const INITIAL_STATE = { advData : [], advPhotoData : [], advSeenData : [], advFavData : [] ,loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'advUser':
            return {
                advData             : action.payload.data.ads,
                advPhotoData        : action.payload.data.photoAds,
                loader              : action.payload.success
            };
        case 'advLastSeen':
            return {
                advSeenData         : action.payload.data,
                loader              : action.payload.success
            };
        case 'advFavorites':
            return {
                advFavData          : action.payload.data,
                loader              : action.payload.success
            };
        default:
            return state;
    }
};
