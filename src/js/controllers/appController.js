(function () {

   'use strict';

   (function ( $app ) {
      return $app.controller('appController',
         ['$scope', '$controller', '$http', 'kambiAPIService', 'kambiWidgetService',
            function ( $scope, $controller, $http, kambiAPIService, kambiWidgetService ) {

               angular.extend(this, $controller('widgetCoreController', {
                  '$scope': $scope
               }));

               $scope.defaultArgs = {
                  'facebook': {
                     'status': true,
                     'xfbml': true,
                     'version': 'v2.4',
                     'fb_embed_type': 'post',
                     'href': 'https://www.facebook.com/uefachampionsleague/posts/1165909963455464',
                     'tabs': 'timeline',
                     'small_headers': true,
                     'show_facepile': false,
                     'adapt_container_width': true
                  }
               };

               /**
                * Default height
                * @type {number}
                */
               $scope.defaultHeight = 530;

               // Global Facebook init function callback
               window.fbAsyncInit = function () {
                     FB.init($scope.args.facebook);
                     // Listen to render event and adjust widget height based on facebook height
                     FB.Event.subscribe('xfbml.render', function () {
                        var el_height = $('.fb').height();
                        $scope.setWidgetHeight(el_height);
                     });
               };

               // Listen to the window resize event and re-render the FB plugin, after 500 miliseconds
               $(window).bind('resize', _.debounce(function () {

                  if ( window.FB && FB.XFBML && FB.XFBML.parse ) {
                     var fb = $('.fb');
                     var parent_width = fb.parent().width();
                     fb.attr('data-width', parent_width);
                     FB.XFBML.parse();
                  }
               }, 500));

               // Inject the Facebook SDK
               var initFbSDK = function () {
                  var js,
                     id = 'facebook-jssdk',
                     s = 'script',
                     fjs = document.getElementsByTagName(s)[0];
                  if ( document.getElementById(id) ) {
                     return;
                  }
                  js = document.createElement(s);
                  js.id = id;
                  js.src = '//connect.facebook.net/' + $scope.locale + '/all.js';
                  fjs.parentNode.insertBefore(js, fjs);
               };

               /**
                * Listener for page:info, we get here the event id from pageParam
                */
               $scope.$on('PAGE:INFO', function ( e, data ) {
               });

               /**
                * Request the page info in order to obtain the event id
                */
               kambiWidgetService.requestPageInfo();

               /**
               * Init the controller and the FB SDK
               */
               $scope.init().then(function () {
                  $scope.locale = $scope.getConfigValue('locale');

                  initFbSDK();

               });

            }]);
   })(angular.module('facebookWidget'));
})($);
