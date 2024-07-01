import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamilies: any;
    colors: any;
    minDeviceWidth: any;
    maxDeviceWidth: any;
    desktopDeviceWidth: any;
    contentWidth: any;
    imageUrl: string;
  }
}
