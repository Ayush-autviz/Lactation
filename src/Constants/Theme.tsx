import { Dimensions } from "react-native";
const {width,height} = Dimensions.get('screen');

export const COLORS = {
	primary : "#2CBDCB",
	secondary : "#CB2C6E",
	success : "#43CD8B",
	danger  : "#E12344",
	warning : "#ffb02c",
	info : "#2B39B9",
	white   : "#fff",
	primaryText : "#5DB521",
	dark : "#2f2f2f",
	light : "#E6E6E6",
	
	//light theme
	card : "#fff",
	background : "#F5F5F5",
	text : "rgba(0,0,0,.6)",
	title : "#000",
	borderColor : "#B5B5B5",
	input : "rgba(0,0,0,.03)",
	
	//dark theme
	darkCard : "rgba(255,255,255,.05)",
	darkBackground : "#000303",
	darkText : "rgba(255,255,255,.6)",
	darkTitle : "#fff",
	darkBorder : "rgba(255,255,255,.1)",
	darkInput : "rgba(255,255,255,.05)",
}

export const SIZES = {
	fontLg:18,
    font:14,
	fontMd:16,
	fontSm:13,
	fontXs:12,
	fontXl:25,
	font2Xl:32,

	//radius
    radius:15,
    radius_sm:8,
	radius_lg:18,

	//space
	padding:15,
	margin:15,

    //Font Sizes
    h1:30,
    h2:28,
    h3:24,
    h4:20,
    h5:18,
	h6:16,

    //App dimensions
    width,
    height,
	
};

export const FONTS = {
    font   : {fontSize:SIZES.font,color: COLORS.text, lineHeight:20, fontFamily:'Lato-Regular'},
	fontSm : {fontSize:SIZES.fontSm,color: COLORS.text, lineHeight:20, fontFamily:'Lato-Regular'},
	fontXs : {fontSize:SIZES.fontXs,color: COLORS.text, lineHeight:14, fontFamily:'Lato-Regular'},
	fontLg : {fontSize:SIZES.fontLg,color: COLORS.text, lineHeight:24, fontFamily:'Lato-Regular'},
	fontMd : {fontSize:SIZES.fontMd,color: COLORS.text, lineHeight:20, fontFamily:'Lato-Regular'},
	fontXl : {fontSize:SIZES.fontXl,color: COLORS.text, lineHeight:24, fontFamily:'Lato-Regular'},
	font2Xl : {fontSize:SIZES.font2Xl,color: COLORS.text, lineHeight:30, fontFamily:'Lato-Regular'},

    h1     : {fontSize:SIZES.h1, color:COLORS.title, fontFamily:'JosefinSans-Medium'},
    h2     : {fontSize:SIZES.h2, color:COLORS.title, fontFamily:'JosefinSans-Medium'},
    h3     : {fontSize:SIZES.h3, color:COLORS.title, fontFamily:'JosefinSans-Medium'},
    h4     : {fontSize:SIZES.h4, color:COLORS.title, fontFamily:'JosefinSans-Medium'},
    h5     : {fontSize:SIZES.h5, color:COLORS.title, fontFamily:'JosefinSans-Medium'},
    h6     : {fontSize:SIZES.h6, color:COLORS.title, fontFamily:'JosefinSans-Medium'},

	fontMedium : {fontFamily : 'Raleway-Medium'},
	fontSemiBold : {fontFamily : 'Raleway-SemiBold'},
	fontBaseMedium : {fontFamily : 'Poppins-Medium'},
	fontBaseSemiBold : {fontFamily : 'Poppins-SemiBold'},
}

