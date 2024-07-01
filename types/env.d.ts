export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_URL: string;
      APP_API_URL: string;
      APP_ENV: string;
      APP_IMAGE_URL: string;
      KAKAO_JAVASCRIPT_KEY: string;
      NICEPAY_MID: string;
      NICEPAY_RETURN_URL: string;
      GOOGLE_GTM_ID: string;
      GOOGLE_AD_ID: string;
      GOOGLE_GTM_ID_FLES: string;
    }
  }
}
