var themes = {

  dark:{
    appBar:{
      height:50
    },
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: grey900,
      primary2Color: grey800,
      primary3Color: fullBlack,
      accent1Color: pinkA200,
      accent2Color: grey100,
      accent3Color: grey500,
      textColor: white,
      alternateTextColor: white,
      canvasColor: grey800,
      borderColor: grey300,
      disabledColor: fade(darkBlack, 0.3),
      pickerHeaderColor: cyan500,
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    }
  },
  light:{
    appBar:{
      height:50
    },
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: cyan500,
      primary2Color: cyan700,
      primary3Color: grey400,
      accent1Color: pinkA200,
      accent2Color: grey100,
      accent3Color: grey500,
      textColor: darkBlack,
      alternateTextColor: white,
      canvasColor: white,
      borderColor: grey300,
      disabledColor: fade(darkBlack, 0.3),
      pickerHeaderColor: cyan500,
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    },
  }
};

exports.default = themes;
