import { combineReducers }  from 'redux';
import lang                 from './LangReducer';
import blog                 from './CategoriesReducer';
import article              from './ArticlesReducer';
import addAdv               from './AddAdvReducer';
import auth                 from './AuthReducer';
import mainCategories       from './MainCategoriesReducer';
import cities               from './AllCitiesReducer';
import countries            from './AllCountriesReducer';
import commission           from './CommissionReducer';
import transferAdv          from './TransferAdvReducer';
import banners              from './BannersReducer';
import dataUser             from './ProfileReducer';
import allPhotoAdv          from './PhotoAdsReducer';
import dataChat             from './ChatReducer';
import adsDetailes          from './AdsDetailesReducer';
import dataComment          from './AddCommentReducer';
import favBlog              from './FavouriteBlogReducer';
import reasons              from './ReportReasonsReducer';
import userAds              from './UserAdsReducer';
import resentCode           from './ResentCodeReducer';
import subCategory          from './SubCategoryReducer';
import count                from './CountNuberReducer';
import countN               from './CountNotificationReducer';
import cateAll              from './CategoriesHomeReducer';
import sentMass             from './SentMessageReducer';

export default combineReducers({
    lang,
    blog,
    article,
    addAdv,
    auth,
    mainCategories,
    cities,
    countries,
    commission,
    transferAdv,
    banners,
    dataUser,
    allPhotoAdv,
    dataChat,
    adsDetailes,
    dataComment,
    favBlog,
    reasons,
    userAds,
    resentCode,
    subCategory,
    count,
    countN,
    cateAll,
    sentMass
});
