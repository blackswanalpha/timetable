// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
   pdfs: [
    { filename: 'department', url: 'http://localhost:8089/timetable/department/report/pdf', selected: true },
    { filename: 'Sample PDF File', url: 'http://localhost:8080/api/pdf/sample.pdf', selected: false } ],
  production: false,
  apiBaseUrl: 'http://localhost:8089'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
