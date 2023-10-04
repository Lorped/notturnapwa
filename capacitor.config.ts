import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
<<<<<<< HEAD
  appId: 'io.ionic.starter',
  appName: 'notturnapwa',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
=======
  appId: 'notturna.gdr.larp',
  appName: 'Notturna',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },  
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      // backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      // androidScaleType: "CENTER_CROP",
      showSpinner: false,
      // androidSpinnerStyle: "large",
      // iosSpinnerStyle: "small",
      // spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
>>>>>>> ca450520b995e6564f2160982fbe451b5a270bba
};

export default config;
