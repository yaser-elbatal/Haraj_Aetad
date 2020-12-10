import { I18nManager, Platform } from "react-native";
import COLORS from '../../src/consts/colors'

const styles = ({

    // Style Color ConText

    text_light_gray: {
        color: COLORS.light_gray
    },
    text_bold_gray: {
        color: COLORS.bold_gray
    },
    text_red: {
        color: COLORS.red
    },
    text_orange: {
        color: COLORS.orange
    },
    text_default: {
        color: COLORS.default
    },
    text_default_2: {
        color: COLORS.default_2
    },
    text_black: {
        color: COLORS.black
    },
    text_green: {
        color: COLORS.green
    },
    text_pray: {
        color: COLORS.pray
    },
    text_White: {
        color: '#FFF'
    },
    text_defaultHarag: {
        color: '#4A4A4A'
    },

    // Style Font

    FairuzBlack: {
        fontFamily: 'FairuzBlack',
    },
    FairuzBold: {
        fontFamily: 'FairuzBold'
    },
    FairuzNormal: {
        fontFamily: 'FairuzNormal',
    },
    FairuzLight: {
        fontFamily: 'FairuzLight'
    },
    textDecoration: {
        textDecorationLine: "underline"
    },
    textLine: {
        textDecorationLine: 'line-through'
    },
    textDir: {
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
    },
    textSize_5: {
        fontSize: 5,
    },
    textSize_10: {
        fontSize: 10,
    },
    textSize_12: {
        fontSize: 12,
    },
    textSize_13: {
        fontSize: 13,
    },
    textSize_14: {
        fontSize: 14,
    },
    textSize_15: {
        fontSize: 15,
    },
    textSize_16: {
        fontSize: 16,
    },
    textSize_18: {
        fontSize: 18,
    },
    textSize_20: {
        fontSize: 20,
    },
    textSize_22: {
        fontSize: 22,
    },
    textSize_24: {
        fontSize: 24,
    },
    textSize_26: {
        fontSize: 26,
    },
    textSize_28: {
        fontSize: 28,
    },
    textSize_30: {
        fontSize: 30,
    },
    textPlatform14: {
        fontSize: Platform.OS === 'ios' ? 16 : 14
    },
    textPlatform12: {
        fontSize: Platform.OS === 'ios' ? 14 : 12
    },

    // Style Direction Text

    textCenter: {
        textAlign: "center"
    },
    textRight: {
        textAlign: "right"
    },
    textLeft: {
        textAlign: "left"
    },

    // Margin Space Vertical

    no_marginVertical: {
        marginVertical: 0
    },
    marginVertical_5: {
        marginVertical: 5
    },
    marginVertical_10: {
        marginVertical: 10
    },
    marginVertical_15: {
        marginVertical: 15
    },
    marginVertical_20: {
        marginVertical: 20
    },
    marginVertical_25: {
        marginVertical: 25
    },
    marginVertical_30: {
        marginVertical: 30
    },
    marginVertical_40: {
        marginVertical: 40
    },
    marginVertical_50: {
        marginVertical: 50
    },

    // Margin Right

    no_margin_right: {
        marginRight: 0
    },
    marginRight_5: {
        marginRight: 5
    },

    // Margin Left

    no_margin_left: {
        marginLeft: 0
    },
    marginLeft_5: {
        marginLeft: 5
    },

    // Margin Top

    no_margin_top: {
        marginTop: 0
    },
    marginTop_5: {
        marginTop: 5
    },
    marginTop_10: {
        marginTop: 10
    },
    marginTop_15: {
        marginTop: 15
    },
    marginTop_20: {
        marginTop: 20
    },
    marginTop_25: {
        marginTop: 25
    },
    marginTop_30: {
        marginTop: 30
    },
    marginTop_40: {
        marginTop: 40
    },
    marginTop_50: {
        marginTop: 50
    },

    // Margin Bottom

    no_margin_bottom: {
        marginBottom: 0
    },
    marginBottom_5: {
        marginBottom: 5
    },
    marginBottom_10: {
        marginBottom: 10
    },
    marginBottom_15: {
        marginBottom: 15
    },
    marginBottom_20: {
        marginBottom: 20
    },
    marginBottom_25: {
        marginBottom: 25
    },
    marginBottom_30: {
        marginBottom: 30
    },
    marginBottom_40: {
        marginBottom: 40
    },
    marginBottom_50: {
        marginBottom: 50
    },


    // Margin Space Horizontal

    no_marginHorizontal: {
        marginHorizontal: 0
    },
    marginHorizontal_5: {
        marginHorizontal: 5
    },
    marginHorizontal_10: {
        marginHorizontal: 10
    },
    marginHorizontal_15: {
        marginHorizontal: 15
    },
    marginHorizontal_20: {
        marginHorizontal: 20
    },
    marginHorizontal_25: {
        marginHorizontal: 25
    },
    marginHorizontal_30: {
        marginHorizontal: 30
    },
    marginHorizontal_40: {
        marginHorizontal: 40
    },
    marginHorizontal_50: {
        marginHorizontal: 50
    },

    // Padding Space Vertical

    no_paddingVertical: {
        paddingVertical: 0
    },
    paddingVertical_5: {
        paddingVertical: 5
    },
    paddingVertical_10: {
        paddingVertical: 10
    },
    paddingVertical_15: {
        paddingVertical: 15
    },
    paddingVertical_20: {
        paddingVertical: 20
    },
    paddingVertical_25: {
        paddingVertical: 25
    },
    paddingVertical_30: {
        paddingVertical: 30
    },
    paddingVertical_40: {
        paddingVertical: 40
    },
    paddingVertical_50: {
        paddingVertical: 50
    },

    // Padding Right

    no_padding_right: {
        paddingRight: 0
    },
    paddingRight_5: {
        paddingRight: 5
    },
    paddingRight_10: {
        paddingRight: 10
    },

    // Padding Left

    no_padding_left: {
        paddingLeft: 0
    },
    paddingLeft_5: {
        paddingLeft: 5
    },
    paddingLeft_10: {
        paddingLeft: 10
    },

    // Padding Top

    no_padding_top: {
        paddingTop: 0
    },
    paddingTop_5: {
        paddingTop: 5
    },
    paddingTop_10: {
        paddingTop: 10
    },
    paddingTop_15: {
        paddingTop: 15
    },
    paddingTop_20: {
        paddingTop: 20
    },

    // Padding Bottom

    no_padding_bottom: {
        paddingBottom: 0
    },
    paddingBottom_5: {
        paddingBottom: 5
    },
    paddingBottom_10: {
        paddingBottom: 10
    },
    paddingBottom_15: {
        paddingBottom: 15
    },
    paddingBottom_20: {
        paddingBottom: 20
    },
    paddingBottom_60: {
        paddingBottom: 60
    },

    // Padding Space Horizontal

    no_paddingHorizontal: {
        paddingHorizontal: 0
    },
    paddingHorizontal_5: {
        paddingHorizontal: 5
    },
    paddingHorizontal_10: {
        paddingHorizontal: 10
    },
    paddingHorizontal_15: {
        paddingHorizontal: 15
    },
    paddingHorizontal_20: {
        paddingHorizontal: 20
    },
    paddingHorizontal_25: {
        paddingHorizontal: 25
    },
    paddingHorizontal_30: {
        paddingHorizontal: 30
    },
    paddingHorizontal_40: {
        paddingHorizontal: 40
    },
    paddingHorizontal_50: {
        paddingHorizontal: 50
    },

    // Style Border Radius

    Radius_0: {
        borderRadius: 0
    },
    Radius_5: {
        borderRadius: 5
    },
    Radius_10: {
        borderRadius: 10
    },
    Radius_15: {
        borderRadius: 15
    },
    Radius_20: {
        borderRadius: 20
    },
    Radius_30: {
        borderRadius: 30
    },
    Radius_40: {
        borderRadius: 40
    },
    Radius_50: {
        borderRadius: 50
    },
    Radius_60: {
        borderRadius: 60
    },
    Radius_70: {
        borderRadius: 70
    },
    Radius_80: {
        borderRadius: 80
    },
    Radius_90: {
        borderRadius: 90
    },
    Radius_100: {
        borderRadius: 100
    },

    // Background Color

    bg_light_gray: {
        backgroundColor: COLORS.light_gray
    },
    bg_bold_gray: {
        backgroundColor: COLORS.bold_gray
    },
    bg_black: {
        backgroundColor: COLORS.black
    },
    bg_red: {
        backgroundColor: COLORS.red
    },
    bg_default: {
        backgroundColor: COLORS.default
    },
    bg_default_2: {
        backgroundColor: COLORS.default_2
    },
    bg_turquoise: {
        backgroundColor: COLORS.turquoise
    },
    bg_pray: {
        backgroundColor: COLORS.pray
    },
    bg_orange: {
        backgroundColor: COLORS.orange
    },
    bg_green: {
        backgroundColor: COLORS.green
    },
    bg_light_green: {
        backgroundColor: COLORS.light_green
    },
    bg_wight: {
        backgroundColor: COLORS.wight
    },
    bg_dash: {
        backgroundColor: COLORS.dash
    },
    bg_off: {
        backgroundColor: '#e5efea'
    },
    bg_White: {
        backgroundColor: '#FFF'
    },
    overlay_white: {
        backgroundColor: "rgba(255, 255, 255, 0.5)"
    },
    overlay_white_up: {
        backgroundColor: "rgba(255, 255, 255, 0.9)"
    },
    overlay_black: {
        backgroundColor: "rgba(0, 0, 0, 0.3)"
    },
    overlay_black_up: {
        backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    bg_trans: {
        backgroundColor: "transparent"
    },

    // Style Border

    Border: {
        borderWidth: 1,
    },
    Border_2: {
        borderWidth: 2,
    },
    Border_3: {
        borderWidth: 3,
    },
    Border_4: {
        borderWidth: 4,
    },
    BorderNone: {
        borderWidth: 0,
    },
    border_black: {
        borderColor: COLORS.black
    },
    border_orange: {
        borderColor: COLORS.orange
    },
    border_dash: {
        borderColor: COLORS.dash
    },
    border_light_gray: {
        borderColor: COLORS.light_gray
    },
    border_wight: {
        borderColor: COLORS.wight
    },
    border_default: {
        borderColor: COLORS.default
    },
    border_green: {
        borderColor: COLORS.green
    },
    border_red: {
        borderColor: COLORS.red
    },
    border_White: {
        borderColor: '#FFF'
    },
    borderTop: {
        borderTopWidth: 1,
    },
    borderBottom: {
        borderBottomWidth: 1,
    },
    borderRight: {
        borderRightWidth: 1,
    },
    borderLeft: {
        borderLeftWidth: 1,
    },

    // Style Shadow

    boxShadow: {
        shadowColor: "#959595",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.40,
        shadowRadius: 2.2,
        elevation: 0.3,
    },

    // Styles Flex Box

    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    bottomCenter: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },
    topCenter: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'center',
    },
    SelfCenter: {
        alignSelf: 'center'
    },
    SelfRight: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        flexDirection: "row",
    },
    SelfLeft: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        flexDirection: "row",
    },
    flexRight: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    flexLeft: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    rowGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: 'wrap',
    },
    rowSpace: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rowCenter: {
        flexDirection: "row",
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        flexWrap: 'wrap'
    },
    rowRight: {
        flexDirection: "row",
        alignSelf: 'flex-start',
        alignItems: "center",
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    rowLeft: {
        flexDirection: "row",
        alignSelf: 'flex-end',
        alignItems: "center",
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    rowIng: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: 'wrap'
    },
    bgFullWidth: {
        flexGrow: 1,
    },
    flex_1: {
        flex: 1
    },
    flex_2: {
        flex: 2
    },
    flex_10: {
        flexBasis: '10%'
    },
    flex_15: {
        flexBasis: '15%'
    },
    flex_20: {
        flexBasis: '20%'
    },
    flex_25: {
        flexBasis: '25%'
    },
    flex_30: {
        flexBasis: '30%'
    },
    flex_33: {
        flexBasis: '33.3%'
    },
    flex_40: {
        flexBasis: '40%'
    },
    flex_45: {
        flexBasis: '45%'
    },
    flex_50: {
        flexBasis: '50%'
    },
    flex_60: {
        flexBasis: '60%'
    },
    flex_70: {
        flexBasis: '70%'
    },
    flex_75: {
        flexBasis: '75%'
    },
    flex_80: {
        flexBasis: '80%'
    },
    flex_85: {
        flexBasis: '85%'
    },
    flex_90: {
        flexBasis: '90%'
    },
    flex_100: {
        flexBasis: '100%'
    },

    // Width

    Width_33: {
        width: '33.3%'
    },
    Width_45: {
        width: '45%'
    },
    Width_50: {
        width: '50%'
    },
    Width_70: {
        width: '70%'
    },
    Width_80: {
        width: '80%'
    },
    Width_90: {
        width: '90%'
    },
    Width_95: {
        width: '95%'
    },
    Width_100: {
        width: '100%'
    },
    width_15: {
        width: 15
    },
    width_20: {
        width: 20
    },
    width_25: {
        width: 25
    },
    width_30: {
        width: 30
    },
    width_35: {
        width: 35
    },
    width_40: {
        width: 40
    },
    width_45: {
        width: 45
    },
    width_50: {
        width: 50
    },
    width_60: {
        width: 60
    },
    width_70: {
        width: 70
    },
    width_80: {
        width: 80
    },
    width_90: {
        width: 90
    },
    width_100: {
        width: 100
    },
    width_110: {
        width: 110
    },
    width_120: {
        width: 120
    },
    width_130: {
        width: 130
    },
    width_150: {
        width: 150
    },
    width_170: {
        width: 170
    },
    width_200: {
        width: 200
    },
    width_250: {
        width: 250
    },

    // Style position

    position_R: {
        position: 'relative',
    },
    position_A: {
        position: 'absolute',
    },
    zIndex: {
        zIndex: 999,
    },
    zIndexUnder: {
        zIndex: 9,
    },
    zIndexDown: {
        zIndex: -1,
    },
    // Top
    inUp: {
        top: -5
    },
    top_0: {
        top: 0
    },
    top_5: {
        top: 5
    },
    top_10: {
        top: 10
    },
    top_15: {
        top: 15
    },
    top_20: {
        top: 20
    },
    top_25: {
        top: 25
    },
    // Bottom
    bottom_0: {
        bottom: 0
    },
    bottom_5: {
        bottom: 5
    },
    bottom_10: {
        bottom: 10
    },
    bottom_15: {
        bottom: 15
    },
    bottom_20: {
        bottom: 20
    },
    bottom_25: {
        bottom: 25
    },
    bottom_30: {
        bottom: 30
    },
    bottom_35: {
        bottom: 35
    },
    // Right
    right_0: {
        right: 0
    },
    right_5: {
        right: 5
    },
    right_10: {
        right: 10
    },
    right_15: {
        right: 15
    },
    right_20: {
        right: 20
    },
    right_25: {
        right: 25
    },
    // Left
    left_0: {
        left: 0
    },
    left_5: {
        left: 5
    },
    left_10: {
        left: 10
    },
    left_15: {
        left: 15
    },
    left_20: {
        left: 20
    },
    left_25: {
        left: 25
    },

    // Height

    height_15: {
        height: 15
    },
    height_20: {
        height: 20
    },
    height_25: {
        height: 25
    },
    height_30: {
        height: 30
    },
    height_35: {
        height: 35
    },
    height_40: {
        height: 40
    },
    height_45: {
        height: 45
    },
    height_50: {
        height: 50
    },
    height_55: {
        height: 55
    },
    height_60: {
        height: 60
    },
    height_70: {
        height: 70
    },
    height_80: {
        height: 80
    },
    height_85: {
        height: 85
    },
    height_90: {
        height: 90
    },
    height_100: {
        height: 100
    },
    height_110: {
        height: 110
    },
    height_120: {
        height: 120
    },
    height_130: {
        height: 130
    },
    height_140: {
        height: 140
    },
    height_150: {
        height: 150
    },
    height_160: {
        height: 160
    },
    height_170: {
        height: 170
    },
    height_200: {
        height: 200
    },
    height_230: {
        height: 230
    },
    height_250: {
        height: 250
    },
    height_300: {
        height: 300
    },
    height_400: {
        height: 400
    },
    height_full: {
        height: '100%'
    },
    minHeight: {
        minHeight: 150
    },


    //  Style For App

    bgContent: {
        width: null,
        height: null,
        flex: 1,
    },
    overHidden: {
        overflow: 'hidden'
    },

    //  Style Input

    item: {
        width: "100%",
        marginLeft: 0,
        marginRight: 0,
        marginVertical: 10,
        padding: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderBottomWidth: 0,
    },
    label: {
        borderWidth: 0,
        padding: 0,
        top: 0,
        zIndex: 99,
        backgroundColor: '#ffffff',
        opacity: 1,
        paddingTop: 0,
        paddingBottom: 0,
        position: 'relative'
    },
    input: {
        borderColor: '#D1D1D1',
        borderWidth: 1,
        borderRadius: 2,
        width: "100%",
        color: '#fff',
        paddingRight: 20,
        paddingLeft: 20,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        fontFamily: 'FairuzNormal',
        fontSize: 15,
        top: 0,
        height: 45,
    },
    textArea: {
        borderColor: '#D1D1D1',
        borderWidth: 0,
        borderRadius: 2,
        width: "100%",
        color: '#636363',
        paddingRight: 20,
        paddingLeft: 20,
        fontFamily: 'FairuzNormal',
        fontSize: 15,
        top: 0,
    },
    Active: {
        borderWidth: 1,
        borderColor: COLORS.orange,
    },
    noActive: {
        borderWidth: 1,
        borderColor: COLORS.wight,
    },

    // Style Img Logo

    imgContain: {
        resizeMode: "contain"
    },
    imgCover: {
        resizeMode: "cover"
    },
    Image_15: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    Image_20: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    Image_22: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
    Image_25: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    Image_35: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },

    //  Style Header

    headerView: {
        backgroundColor: 'transparent',
        zIndex: 99,
        elevation: 0,
        borderBottomWidth: 0,
        position: 'relative',
        height: 80,
    },
    bodyText: {
        position: 'relative',
        alignItems: 'center',
        flex: 1
    },
    leftIcon: {
        flex: 0,
        transform: I18nManager.isRTL ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }],
    },
    rightIcon: {
        flex: 0
    },
    Button: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 0,
        paddingTop: 0
    },

    // Style CheckBox

    checkBox: {
        paddingLeft: 0,
        paddingBottom: 0,
        borderRadius: 3,
        paddingRight: 3
    },

    // For App

    inAct: {
        backgroundColor: COLORS.default,
        paddingVertical: 5,
        paddingHorizontal: 10,
        zIndex: 999
    },
    unAct: {
        backgroundColor: null,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    inActB: {
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 10,
        zIndex: 999
    },
    unActB: {
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    block_Call: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flexWrap: 'wrap',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#0473c2",
        padding: 5,
        flexBasis: '33.3%',
        position: 'relative',
        marginHorizontal: 4,
        paddingHorizontal: 5
    },
    footerStyle: {
        backgroundColor: '#fff',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    mainScroll: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        height: 40,
        marginTop: 10
    },
    paginationStyle : {
        // alignSelf               : "flex-end",
        paddingHorizontal       : 30,
        position: 'absolute',
        zIndex                  : 999,
        left : '70%'
    },


});

export default styles;
