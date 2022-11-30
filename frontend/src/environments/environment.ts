// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  typicodeUrl: "https://jsonplaceholder.typicode.com/",
  unicornRewardsApiUrl: "https://localhost:7284/api/",
  msalAuth:{
      clientId: "07eea724-3d99-4d9e-8cf2-c6b853c15e06",
      authority: "https://login.microsoftonline.com/eedd1340-df1a-4db2-8a03-b4cfb1fa3e9d",
      redirectUri: '/',
      postLogoutRedirectUri: '/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
