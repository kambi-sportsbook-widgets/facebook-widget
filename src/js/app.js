(function () {

   var arrDependencies;

   // widgetCore provides common functions like setting up the widget with the api configuration
   arrDependencies = [
      'widgetCore',
      'widgetCore.translate',
      'ngAnimate'
   ];

   (function ( $app ) {
      'use strict';

      return $app;
   })(angular.module('facebookWidget', arrDependencies));
})();
